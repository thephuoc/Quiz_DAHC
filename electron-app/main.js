const { app, BrowserWindow, ipcMain, dialog, Menu, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

const userDataPath = app.getPath('userData');
const appPath = app.getAppPath(); // Đường dẫn app để lưu backup

const backupDir = path.join(userDataPath, 'backup');
const runtimeStateFile = path.join(userDataPath, 'runtime-state.json');

// Thư mục chính: C:\Documents\Quiz_DAHC (đường dẫn cố định)
const storageRootDir = path.join('C:', 'Documents', 'Quiz_DAHC');
const resultsDir = path.join(storageRootDir, 'results');
// pdf_primary removed — chỉ dùng pdf_backup
const reportsDir = path.join(storageRootDir, 'reports');

// Đường dẫn dự phòng: 
// Khi đóng gói (Packaged), lưu cạnh file .exe để dễ dàng copy (Portable logic)
// Khi chạy dev, lưu trong thư mục dự án
let backupRootDir;
if (app.isPackaged) {
    backupRootDir = path.join(path.dirname(app.getPath('exe')), 'backup_data');
} else {
    backupRootDir = path.join(__dirname, 'backup_data');
}

const pdfBackupDir = path.join(backupRootDir, 'pdf_backup');
const resultsBackupDir = path.join(backupRootDir, 'results_backup');

// Logging helper for debugging startup crashes
const logFile = path.join(userDataPath, 'app_debug.log');
function logError(msg) {
    try { fs.appendFileSync(logFile, `[${new Date().toISOString()}] ERROR: ${msg}\n`); } catch (e) { }
}

process.on('uncaughtException', (error) => {
    logError(error.stack);
    dialog.showErrorBox('Application Error', `A critical error occurred:\n${error.message}\n\nPlease check log at: ${logFile}`);
    process.exit(1);
});

const resultsIndexFile = path.join(resultsDir, 'results-index.json');
const reportJsonFile = path.join(reportsDir, 'exam-report.json');
const reportCsvFile = path.join(reportsDir, 'exam-report.csv');

let mainWindow;
let forceQuit = false;
let runtimeState = {
    inProgress: false,
    candidateName: null,
    startedAt: null,
    lastSavedAt: null,
};

function ensureDirectories() {
    [backupDir, storageRootDir, resultsDir, pdfBackupDir, reportsDir, backupRootDir, resultsBackupDir].forEach((dirPath) => {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });
}

function readJsonSafe(filePath, defaultValue) {
    try {
        if (!fs.existsSync(filePath)) return defaultValue;
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
        console.error(`Failed to read JSON: ${filePath}`, error);
        return defaultValue;
    }
}

function writeJsonSafe(filePath, value) {
    fs.writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf-8');
}

function loadRuntimeState() {
    const data = readJsonSafe(runtimeStateFile, null);
    if (data && typeof data === 'object') {
        runtimeState = {
            inProgress: Boolean(data.inProgress),
            candidateName: data.candidateName || null,
            startedAt: data.startedAt || null,
            lastSavedAt: data.lastSavedAt || null,
        };
    }
}

function persistRuntimeState() {
    runtimeState.lastSavedAt = new Date().toISOString();
    writeJsonSafe(runtimeStateFile, runtimeState);
}

function sanitizeForFileName(input) {
    const raw = String(input || '').trim();
    return raw
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9._-]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 80) || 'unknown';
}

function toTimestampText(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${y}${m}${d}_${hh}${mm}${ss}`;
}

function toCsvCell(value) {
    const text = String(value ?? '');
    return `"${text.replace(/"/g, '""')}"`;
}

function upsertReports(indexItems) {
    const totalExams = indexItems.length;
    const passedExams = indexItems.filter((item) => item?.result?.isPassed).length;
    const failedExams = totalExams - passedExams;

    const totalScore = indexItems.reduce((sum, item) => sum + Number(item?.result?.score || 0), 0);
    const averageScore = totalExams > 0 ? Number((totalScore / totalExams).toFixed(2)) : 0;

    const byDepartment = {};
    const byCandidate = {};

    indexItems.forEach((item) => {
        const department = item?.user?.department || 'N/A';
        byDepartment[department] = byDepartment[department] || { total: 0, pass: 0, fail: 0, avgScore: 0, sumScore: 0 };
        byDepartment[department].total += 1;
        byDepartment[department].sumScore += Number(item?.result?.score || 0);
        if (item?.result?.isPassed) {
            byDepartment[department].pass += 1;
        } else {
            byDepartment[department].fail += 1;
        }

        const candidateKey = `${item?.user?.fullName || 'Unknown'}|${item?.user?.department || ''}`;
        if (!byCandidate[candidateKey]) {
            byCandidate[candidateKey] = {
                fullName: item?.user?.fullName || 'Unknown',
                department,
                attempts: 0,
                passCount: 0,
                failCount: 0,
                bestScore: 0,
                lastScore: 0,
                lastExamAt: item?.exam?.endTime || item?.savedAt || null,
            };
        }

        const c = byCandidate[candidateKey];
        const score = Number(item?.result?.score || 0);
        c.attempts += 1;
        c.lastScore = score;
        if (score > c.bestScore) c.bestScore = score;
        if (item?.result?.isPassed) c.passCount += 1;
        else c.failCount += 1;

        const currentTime = new Date(item?.exam?.endTime || item?.savedAt || 0).getTime();
        const existingTime = new Date(c.lastExamAt || 0).getTime();
        if (currentTime >= existingTime) {
            c.lastExamAt = item?.exam?.endTime || item?.savedAt || c.lastExamAt;
            c.department = department;
        }
    });

    Object.keys(byDepartment).forEach((department) => {
        const dep = byDepartment[department];
        dep.avgScore = dep.total > 0 ? Number((dep.sumScore / dep.total).toFixed(2)) : 0;
        delete dep.sumScore;
    });

    const reportJson = {
        generatedAt: new Date().toISOString(),
        summary: {
            totalExams,
            passedExams,
            failedExams,
            averageScore,
        },
        byDepartment,
        candidates: Object.values(byCandidate).sort((a, b) => {
            const tA = new Date(a.lastExamAt || 0).getTime();
            const tB = new Date(b.lastExamAt || 0).getTime();
            return tB - tA;
        }),
    };

    writeJsonSafe(reportJsonFile, reportJson);

    const header = [
        'id',
        'savedAt',
        'fullName',
        'department',
        'attemptNumber',
        'correctAnswers',
        'totalQuestions',
        'score',
        'isPassed',
        'duration',
        'startTime',
        'endTime',
        'pdfPrimaryPath',
        'pdfBackupPath',
    ];

    const rows = indexItems.map((item) => [
        item.id,
        item.savedAt,
        item?.user?.fullName,
        item?.user?.department,
        item?.user?.attemptNumber,
        item?.result?.correctAnswers,
        item?.result?.totalQuestions,
        item?.result?.score,
        item?.result?.isPassed ? 'PASS' : 'FAIL',
        item?.exam?.duration,
        item?.exam?.startTime,
        item?.exam?.endTime,
        item?.files?.pdfPrimaryPath,
        item?.files?.pdfBackupPath,
    ]);

    const csv = [header, ...rows].map((row) => row.map(toCsvCell).join(',')).join('\n');
    fs.writeFileSync(reportCsvFile, csv, 'utf-8');
}

function appendResultIndex(record) {
    const items = readJsonSafe(resultsIndexFile, []);
    items.unshift(record);
    writeJsonSafe(resultsIndexFile, items);
    upsertReports(items);
}

function notifyRendererStayInExam() {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    mainWindow.webContents.send('force-stay-in-exam');
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 860,
        minWidth: 900,
        minHeight: 650,
        icon: path.join(__dirname, 'assets', 'icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
            spellcheck: false,
        },
        autoHideMenuBar: true,
        title: 'He thong Thi Trac Nghiem - DAHC',
        backgroundColor: '#0F172A',
        show: false,
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));
    Menu.setApplicationMenu(null);

    if (app.isPackaged) {
        mainWindow.webContents.on('devtools-opened', () => {
            mainWindow.webContents.closeDevTools();
        });

        mainWindow.webContents.on('before-input-event', (event, input) => {
            if (
                input.key === 'F12' ||
                (input.control && input.shift && (input.key === 'I' || input.key === 'J')) ||
                (input.control && input.key === 'U')
            ) {
                event.preventDefault();
            }
        });
    }

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    mainWindow.on('close', (event) => {
        if (!forceQuit && runtimeState.inProgress) {
            event.preventDefault();
            notifyRendererStayInExam();
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

ipcMain.handle('save-pdf', async (event, pdfData, defaultFileName) => {
    try {
        const result = await dialog.showSaveDialog(mainWindow, {
            title: 'Luu ket qua thi (PDF)',
            defaultPath: path.join(app.getPath('documents'), defaultFileName),
            filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
        });

        if (result.canceled || !result.filePath) {
            return { success: false, canceled: true };
        }

        const buffer = typeof pdfData === 'string' ? Buffer.from(pdfData, 'base64') : Buffer.from(pdfData);
        fs.writeFileSync(result.filePath, buffer);

        return {
            success: true,
            filePath: result.filePath,
            fileName: path.basename(result.filePath),
        };
    } catch (error) {
        console.error('Error saving PDF:', error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('save-exam-artifacts', async (event, payload) => {
    try {
        ensureDirectories();

        const examResult = payload?.examResult || {};
        const rawFileName = payload?.fileName || 'ket_qua.pdf';
        const pdfBase64 = payload?.pdfBase64 || '';
        const savedAtIso = new Date().toISOString();

        const candidate = sanitizeForFileName(examResult?.user?.fullName || 'ThiSinh');
        const attempt = String(examResult?.user?.attemptNumber || 1);
        const stamp = toTimestampText(new Date());
        const baseName = `${candidate}_L${attempt}_${stamp}`;

        const finalPdfName = rawFileName.toLowerCase().endsWith('.pdf') ? `${baseName}.pdf` : `${baseName}.pdf`;
        let pdfBackupPath = null;

        if (pdfBase64 && pdfBase64.length > 0) {
            const pdfBuffer = Buffer.from(String(pdfBase64).replace(/^data:.*;base64,/, ''), 'base64');
            if (pdfBuffer.length) {
                pdfBackupPath = path.join(pdfBackupDir, finalPdfName);
                fs.writeFileSync(pdfBackupPath, pdfBuffer);
            }
        }

        const resultJsonName = `${baseName}.json`;
        const resultJsonPath = path.join(resultsDir, resultJsonName);

        const resultPayload = {
            ...examResult,
            files: {
                pdfBackupPath: pdfBackupPath,
            },
            savedAt: savedAtIso,
            source: 'electron-app',
        };

        writeJsonSafe(resultJsonPath, resultPayload);

        appendResultIndex({
            ...resultPayload,
            files: {
                ...resultPayload.files,
                resultJsonPath,
            },
        });

        return {
            success: true,
            savedAt: savedAtIso,
            paths: {
                pdfBackupPath,
                resultJsonPath,
                reportJsonFile,
                reportCsvFile,
                storageRootDir,
            },
        };
    } catch (error) {
        console.error('save-exam-artifacts failed:', error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('set-exam-state', async (event, nextState) => {
    try {
        runtimeState = {
            ...runtimeState,
            ...(nextState || {}),
            inProgress: Boolean(nextState?.inProgress),
            lastSavedAt: new Date().toISOString(),
        };
        persistRuntimeState();
        return { success: true, state: runtimeState };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('get-exam-state', () => ({ success: true, state: runtimeState }));

ipcMain.handle('get-storage-paths', () => ({
    success: true,
    paths: {
        userDataPath,
        storageRootDir,
        resultsDir,
        pdfBackupDir,
        reportsDir,
        reportJsonFile,
        reportCsvFile,
        backupRootDir,
        resultsBackupDir,
    },
}));

ipcMain.handle('get-security-config', () => ({
    success: true,
    adminPassword: process.env.QUIZ_ADMIN_PASSWORD || null,
}));

ipcMain.handle('open-pdf-folder', async () => {
    try {
        ensureDirectories();
        await shell.openPath(pdfBackupDir);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('open-folder', async (event, folderPath) => {
    try {
        if (!folderPath || typeof folderPath !== 'string') {
            return { success: false, error: 'Invalid folder path' };
        }

        if (!fs.existsSync(folderPath)) {
            // Tạo thư mục nếu chưa tồn tại
            fs.mkdirSync(folderPath, { recursive: true });
        }

        shell.openPath(folderPath);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('backup-data', async (event, key, data) => {
    try {
        ensureDirectories();
        const filePath = path.join(backupDir, `${key}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        return { success: true, filePath };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('restore-data', async (event, key) => {
    try {
        const filePath = path.join(backupDir, `${key}.json`);
        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            return { success: true, data };
        }
        return { success: false, error: 'File not found' };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('get-app-path', () => ({
    userData: userDataPath,
    documents: app.getPath('documents'),
    desktop: app.getPath('desktop'),
    downloads: app.getPath('downloads'),
}));

ipcMain.handle('get-app-info', () => ({
    name: app.getName(),
    version: app.getVersion(),
    isPackaged: app.isPackaged,
    platform: process.platform,
    arch: process.arch,
}));

app.whenReady().then(() => {
    ensureDirectories();
    loadRuntimeState();
    createWindow();
});

app.on('before-quit', (event) => {
    if (runtimeState.inProgress) {
        event.preventDefault();
        forceQuit = false;
        notifyRendererStayInExam();
        return;
    }
    forceQuit = true;
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}


// Helper for recursive copy
function copyDirRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

ipcMain.handle('backup-data-to-root', async () => {
    try {
        const timestamp = toTimestampText(new Date());
        // Thư mục chứa file chạy (.exe)
        // Nếu chạy dev thì process.cwd() là project folder
        const exeDir = process.env.PORTABLE_EXECUTABLE_DIR || path.dirname(app.getPath('exe'));

        // Thư mục đích: DATA_EXPORT_YYYY-MM-DD_HHMMSS
        const targetDir = path.join(exeDir, 'DATA_EXPORT_' + timestamp);

        ensureDirectories(); // Đảm bảo source tồn tại

        // Tạo thư mục đích
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Copy PDF Backup
        const targetPdfDir = path.join(targetDir, 'pdf_backup');
        copyDirRecursive(pdfBackupDir, targetPdfDir);

        // Copy Results
        const targetResultsDir = path.join(targetDir, 'results_backup');
        copyDirRecursive(resultsDir, targetResultsDir);

        // Mở thư mục đích để user thấy
        await shell.openPath(targetDir);

        return { success: true, path: targetDir };
    } catch (error) {
        console.error('Backup failed:', error);
        return { success: false, error: error.message };
    }
});

// ===== Excel Import Handlers =====

// Đường dẫn tới thư mục app/js (nơi chứa candidates.js và questions.js)
function getAppJsDir() {
    if (app.isPackaged) {
        return path.join(process.resourcesPath, 'app', 'app', 'js');
    }
    return path.join(__dirname, 'app', 'js');
}

function cleanText(text) {
    if (text === null || text === undefined) return '';
    return String(text).trim();
}

// --- Import Candidates ---
ipcMain.handle('import-candidates-excel', async () => {
    try {
        const result = await dialog.showOpenDialog(mainWindow, {
            title: 'Chon file danh sach thi sinh (Excel)',
            filters: [{ name: 'Excel Files', extensions: ['xlsx', 'xls'] }],
            properties: ['openFile'],
        });

        if (result.canceled || !result.filePaths.length) {
            return { success: false, canceled: true };
        }

        const filePath = result.filePaths[0];
        const workbook = XLSX.read(fs.readFileSync(filePath), { type: 'buffer', cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

        if (rows.length < 2) {
            return { success: false, error: 'File Excel khong co du lieu (can it nhat 1 dong header + 1 dong data).' };
        }

        // Find column indices from header row
        const header = rows[0].map(h => String(h).toLowerCase().trim());
        const nameIdx = header.findIndex(h => h.includes('ten') || h.includes('tên'));
        const passIdx = header.findIndex(h => h.includes('mat') || h.includes('mật') || h.includes('password') || h.includes('pass') || h.includes('pin'));
        const unitIdx = header.findIndex(h => h.includes('don') || h.includes('đơn') || h.includes('vi') || h.includes('vị'));

        if (nameIdx < 0 || passIdx < 0) {
            return { success: false, error: 'Khong tim thay cot "Ho ten" hoac "Mat khau" trong file Excel.' };
        }

        const candidates = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const name = cleanText(row[nameIdx]);
            if (!name || name === 'nan') continue;

            const password = cleanText(row[passIdx]);

            const unit = unitIdx >= 0 ? cleanText(row[unitIdx]) : '';

            candidates.push({
                name,
                password: (password && password !== 'nan') ? password : '',
                department: (unit && unit !== 'nan') ? unit : '',
            });
        }

        if (candidates.length === 0) {
            return { success: false, error: 'Khong tim thay thi sinh hop le trong file Excel.' };
        }

        // Generate JS content
        const jsContent = `/**\n * Danh sach thi sinh - Duoc tao tu Excel\n * Tong so: ${candidates.length} thi sinh\n */\n\nconst CANDIDATES_LIST = ${JSON.stringify(candidates, null, 2)};\n\nfunction validateCandidate(name, password) {\n    const candidate = CANDIDATES_LIST.find(c => c.name === name);\n    if (!candidate) return { valid: false, error: 'Khong tim thay thi sinh' };\n    if (candidate.password !== password) return { valid: false, error: 'Mat khau khong dung' };\n    return { valid: true, department: candidate.department, name: candidate.name };\n}\n\nfunction getCandidateNames() {\n    return CANDIDATES_LIST.map(c => c.name);\n}\n`;

        // Backup & write
        const jsDir = getAppJsDir();
        const targetFile = path.join(jsDir, 'candidates.js');
        if (fs.existsSync(targetFile)) {
            fs.copyFileSync(targetFile, targetFile + '.bak');
        }
        fs.writeFileSync(targetFile, jsContent, 'utf-8');

        return { success: true, count: candidates.length };
    } catch (error) {
        console.error('import-candidates-excel failed:', error);
        return { success: false, error: error.message };
    }
});

// --- Import Questions ---
ipcMain.handle('import-questions-excel', async () => {
    try {
        const result = await dialog.showOpenDialog(mainWindow, {
            title: 'Chon file ngan hang cau hoi (Excel) - co the chon nhieu file',
            filters: [{ name: 'Excel Files', extensions: ['xlsx', 'xls'] }],
            properties: ['openFile', 'multiSelections'],
        });

        if (result.canceled || !result.filePaths.length) {
            return { success: false, canceled: true };
        }

        // Map filename patterns to category codes
        const categoryMap = {
            'pccc': 'PCCC',
            'qt_atd': 'QT_ATD',
            'qtatd': 'QT_ATD',
            'atd': 'ATD',
            'tba': 'TBA',
            'nmd': 'NMD',
        };

        function detectCategory(filename) {
            const lower = filename.toLowerCase();
            // Specific patterns first
            if (lower.includes('qt_atd') || lower.includes('qtatd') || lower.includes('qt atd')) return 'QT_ATD';
            if (lower.includes('pccc')) return 'PCCC';
            if (lower.includes('tba')) return 'TBA';
            if (lower.includes('nmd')) return 'NMD';
            if (lower.includes('atd')) return 'ATD';
            // Fallback: look for number prefix
            const match = lower.match(/(\d+)/);
            if (match) {
                const num = parseInt(match[1]);
                const numMap = { 1: 'PCCC', 2: 'QT_ATD', 3: 'ATD', 4: 'TBA', 5: 'NMD' };
                if (numMap[num]) return numMap[num];
            }
            return path.basename(filename, path.extname(filename)).toUpperCase();
        }

        let allQuestions = [];
        let questionId = 1;

        // Sort files by basename so "1. PCCC.xlsx" comes before "2. QT_ATD.xlsx" etc.
        const sortedFilePaths = [...result.filePaths].sort((a, b) =>
            path.basename(a).localeCompare(path.basename(b), undefined, { numeric: true })
        );

        for (const filePath of sortedFilePaths) {
            const categoryCode = detectCategory(path.basename(filePath));
            const workbook = XLSX.read(fs.readFileSync(filePath), { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

            if (rows.length < 2) continue;

            // Find column indices from header
            const header = rows[0].map(h => String(h).toLowerCase().replace(/\s+/g, '_').trim());
            const sttIdx = header.findIndex(h => h.includes('stt'));
            const noiDungIdx = header.findIndex(h => h.includes('noi') && h.includes('dung'));
            const phanLoaiIdx = header.findIndex(h => h.includes('phan') && h.includes('loai'));
            const dapAnDungIdx = header.findIndex(h => (h.includes('dung') && h.includes('dap')) || (h.includes('dap') && h.includes('an') && h.includes('dung')));

            if (sttIdx < 0 || noiDungIdx < 0) continue;

            // Find question start rows (rows with STT value), sort by STT number
            const qEntries = [];
            for (let i = 1; i < rows.length; i++) {
                const sttVal = rows[i][sttIdx];
                if (sttVal !== '' && sttVal !== null && sttVal !== undefined) {
                    qEntries.push({ rowIdx: i, stt: parseFloat(sttVal) || 0 });
                }
            }
            // Sort by STT value to preserve order even if Excel rows are scrambled
            qEntries.sort((a, b) => a.stt - b.stt);
            const qIndices = qEntries.map(e => e.rowIdx);
            qIndices.push(rows.length); // sentinel

            for (let qi = 0; qi < qIndices.length - 1; qi++) {
                const start = qIndices[qi];
                const end = qIndices[qi + 1];

                const qText = cleanText(rows[start][noiDungIdx]);
                if (!qText) continue;

                let category = categoryCode;
                if (phanLoaiIdx >= 0) {
                    const cat = cleanText(rows[start][phanLoaiIdx]);
                    if (cat) category = cat;
                }

                const options = [];
                let correctIdx = -1;

                for (let ri = start + 1; ri < end; ri++) {
                    const optText = cleanText(rows[ri][noiDungIdx]);
                    if (!optText) continue;
                    options.push(optText);

                    if (dapAnDungIdx >= 0) {
                        const marker = cleanText(rows[ri][dapAnDungIdx]);
                        if (marker) correctIdx = options.length - 1;
                    }
                }

                if (options.length >= 2 && correctIdx >= 0 && correctIdx < options.length) {
                    while (options.length < 4) options.push(`Dap an ${String.fromCharCode(65 + options.length)}`);
                    const finalOptions = options.slice(0, 4);

                    allQuestions.push({
                        question: qText,
                        options: finalOptions,
                        correct: correctIdx,
                        category,
                        id: questionId++,
                    });
                }
            }
        }

        if (allQuestions.length === 0) {
            return { success: false, error: 'Khong tim thay cau hoi hop le trong cac file Excel.' };
        }

        // Build categories info
        const categoriesInfo = {};
        allQuestions.forEach(q => {
            categoriesInfo[q.category] = (categoriesInfo[q.category] || 0) + 1;
        });

        // Generate JS content
        const catLines = Object.entries(categoriesInfo).sort().map(([cat, count]) => ` *   - ${cat}: ${count} cau`).join('\n');
        let jsContent = `/**\n * Ngan hang cau hoi - Duoc tao tu dong tu Excel\n * Tong so cau hoi: ${allQuestions.length}\n * \n * Phan loai:\n${catLines}\n */\n\nconst QUESTION_BANK = ${JSON.stringify(allQuestions, null, 2)};\n\nconst CATEGORIES_INFO = ${JSON.stringify(categoriesInfo, null, 2)};\n\n// ===== Anti-Repetition Helpers =====\n\nconst QUESTION_SELECTION_DEFAULTS = {\n  recentExamCount: 3,\n  cooldownExams: 3,\n  maxRepeatRatio: 0.2,\n  recentPenalty: 1.2,\n  totalPenalty: 0.35,\n  rotationMode: true,\n  conceptMaxPerExam: 1,\n  difficultyTargets: null,\n  categoryFallbacks: null,\n  allowCrossCategoryFill: true,\n  seed: null,\n  historyKeyPrefix: 'exam_history',\n};\n\nfunction normalizeKeyPart(value) {\n  return String(value || '')\n    .trim()\n    .toLowerCase()\n    .replace(/\\s+/g, '-')\n    .replace(/[^a-z0-9-]/g, '');\n}\n\nfunction getDeviceId() {\n  if (typeof localStorage === 'undefined') return 'device-unknown';\n  const key = 'quiz_device_id';\n  const existing = localStorage.getItem(key);\n  if (existing) return existing;\n  const newId = 'device-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);\n  localStorage.setItem(key, newId);\n  return newId;\n}\n\nfunction getHistoryKey(options) {\n  const prefix = options && options.historyKeyPrefix ? options.historyKeyPrefix : 'exam_history';\n  const deviceId = getDeviceId();\n  const user = (typeof state !== 'undefined' && state.user) || (typeof quizSettings !== 'undefined' && quizSettings.user);\n  const nameKey = user && user.fullName ? normalizeKeyPart(user.fullName) : '';\n  const birthKey = user && user.password ? normalizeKeyPart(user.password) : '';\n  if (nameKey && birthKey) {\n    return prefix + '::' + deviceId + '::' + nameKey + '::' + birthKey;\n  }\n  return prefix + '::' + deviceId;\n}\n\nfunction getExamHistory(options) {\n  try {\n    if (typeof localStorage === 'undefined') return [];\n    const key = getHistoryKey(options);\n    const raw = localStorage.getItem(key);\n    if (raw) {\n      const parsed = JSON.parse(raw);\n      return Array.isArray(parsed) ? parsed : [];\n    }\n    const legacyRaw = localStorage.getItem(options && options.historyKeyPrefix ? options.historyKeyPrefix : 'exam_history');\n    if (!legacyRaw) return [];\n    const legacy = JSON.parse(legacyRaw);\n    return Array.isArray(legacy) ? legacy : [];\n  } catch (e) {\n    return [];\n  }\n}\n\nfunction sortHistoryByTime(history) {\n  return [...history].sort((a, b) => {\n    const ta = a.savedAt || (a.exam && a.exam.endTime) || '';\n    const tb = b.savedAt || (b.exam && b.exam.endTime) || '';\n    return tb.localeCompare(ta);\n  });\n}\n\nfunction getRecentQuestionIdsFromHistory(history, lastNExams) {\n  if (!Array.isArray(history) || history.length === 0 || lastNExams <= 0) return new Set();\n  const sorted = sortHistoryByTime(history);\n  const recentIds = new Set();\n  sorted.slice(0, lastNExams).forEach(record => {\n    const ids = record.exam && record.exam.questionIds;\n    if (Array.isArray(ids)) ids.forEach(id => recentIds.add(id));\n  });\n  return recentIds;\n}\n\nfunction buildQuestionStats(history, recentExamCount) {\n  const sorted = sortHistoryByTime(history);\n  const totalCountById = new Map();\n  const recentCountById = new Map();\n  const recentIds = new Set();\n\n  sorted.forEach((record, idx) => {\n    const ids = record.exam && record.exam.questionIds;\n    if (!Array.isArray(ids)) return;\n    ids.forEach(id => {\n      totalCountById.set(id, (totalCountById.get(id) || 0) + 1);\n      if (idx < recentExamCount) {\n        recentCountById.set(id, (recentCountById.get(id) || 0) + 1);\n        recentIds.add(id);\n      }\n    });\n  });\n\n  return { sorted, totalCountById, recentCountById, recentIds };\n}\n\nfunction hashStringToSeed(value) {\n  const str = String(value || '');\n  let hash = 2166136261;\n  for (let i = 0; i < str.length; i++) {\n    hash ^= str.charCodeAt(i);\n    hash = Math.imul(hash, 16777619);\n  }\n  return hash >>> 0;\n}\n\nfunction createSeededRng(seed) {\n  let a = (seed >>> 0) || 1;\n  return function rng() {\n    a |= 0;\n    a = a + 0x6D2B79F5 | 0;\n    let t = Math.imul(a ^ a >>> 15, 1 | a);\n    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;\n    return ((t ^ t >>> 14) >>> 0) / 4294967296;\n  };\n}\n\nfunction getExamSeed(options) {\n  if (options && options.seed !== null && options.seed !== undefined) return options.seed;\n  const user = (typeof state !== 'undefined' && state.user) || (typeof quizSettings !== 'undefined' && quizSettings.user) || {};\n  const attempt = user.attemptNumber || '';\n  const today = new Date();\n  const dateKey = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');\n  return (user.fullName || '') + '|' + (user.password || '') + '|' + attempt + '|' + dateKey;\n}\n\nfunction shuffleWithRng(items, rng) {\n  const a = [...items];\n  for (let i = a.length - 1; i > 0; i--) {\n    const j = Math.floor(rng() * (i + 1));\n    const tmp = a[i];\n    a[i] = a[j];\n    a[j] = tmp;\n  }\n  return a;\n}\n\nfunction weightedSample(items, count, weightFn, rng) {\n  const pool = [...items];\n  const selected = [];\n  while (selected.length < count && pool.length > 0) {\n    const weights = pool.map(weightFn);\n    const total = weights.reduce((sum, w) => sum + w, 0);\n    if (total <= 0) {\n      selected.push(...shuffleWithRng(pool, rng).slice(0, count - selected.length));\n      break;\n    }\n    let r = rng() * total;\n    let idx = 0;\n    for (; idx < pool.length; idx++) {\n      r -= weights[idx];\n      if (r <= 0) break;\n    }\n    selected.push(pool[idx]);\n    pool.splice(idx, 1);\n  }\n  return selected;\n}\n\nfunction normalizeDifficultyTargets(targets) {\n  if (!targets || typeof targets !== 'object') return null;\n  const entries = Object.entries(targets).filter((pair) => typeof pair[1] === 'number' && pair[1] > 0);\n  if (entries.length === 0) return null;\n  const total = entries.reduce((sum, pair) => sum + pair[1], 0);\n  const normalized = {};\n  entries.forEach(([k, v]) => {\n    normalized[k] = v / total;\n  });\n  return normalized;\n}\n\nfunction selectFromPool(pool, count, context) {\n  if (count <= 0) return [];\n  const stats = context.stats;\n  const options = context.options;\n  const rng = context.rng;\n  const selectedIds = context.selectedIds;\n  const selectedConcepts = context.selectedConcepts;\n  const maxRecentAllowed = context.maxRecentAllowed;\n  const recentCountById = stats.recentCountById;\n  const totalCountById = stats.totalCountById;\n  const recentIds = stats.recentIds;\n  const cooldownIds = stats.cooldownIds;\n  const conceptLimit = options.conceptMaxPerExam || 0;\n  let recentSelected = 0;\n\n  const filterByConstraints = (list, allowCooldown) => list.filter(q => {\n    if (selectedIds.has(q.id)) return false;\n    if (!allowCooldown && cooldownIds.has(q.id)) return false;\n    if (conceptLimit > 0 && q.conceptId) {\n      const current = selectedConcepts.get(q.conceptId) || 0;\n      if (current >= conceptLimit) return false;\n    }\n    return true;\n  });\n\n  const pickWeighted = (candidates, needed) => {\n    return weightedSample(candidates, needed, q => {\n      const recentCount = recentCountById.get(q.id) || 0;\n      const totalCount = totalCountById.get(q.id) || 0;\n      let weight = 1;\n      if (recentCount > 0) weight /= (1 + recentCount * options.recentPenalty);\n      if (totalCount > 0) weight /= (1 + totalCount * (options.rotationMode ? (options.totalPenalty * 1.5) : options.totalPenalty));\n      if (options.rotationMode && totalCount === 0) weight *= 1.5;\n      return Math.max(weight, 0.0001);\n    }, rng);\n  };\n\n  let candidates = filterByConstraints(pool, false);\n  if (candidates.length < count) {\n    candidates = filterByConstraints(pool, true);\n  }\n\n  const selected = [];\n  while (selected.length < count && candidates.length > 0) {\n    const needed = count - selected.length;\n    const batch = pickWeighted(candidates, needed);\n    if (batch.length === 0) break;\n\n    for (const q of batch) {\n      const isRecent = recentIds.has(q.id);\n      if (isRecent && recentSelected >= maxRecentAllowed) continue;\n      selected.push(q);\n      selectedIds.add(q.id);\n      if (q.conceptId) {\n        selectedConcepts.set(q.conceptId, (selectedConcepts.get(q.conceptId) || 0) + 1);\n      }\n      if (isRecent) recentSelected += 1;\n      if (selected.length >= count) break;\n    }\n\n    candidates = candidates.filter(q => !selectedIds.has(q.id));\n  }\n\n  return selected;\n}\n\nfunction selectQuestionsSmart(questionPool, count, context) {\n  if (count <= 0) return [];\n  const difficultyTargets = normalizeDifficultyTargets(context.options.difficultyTargets);\n  if (!difficultyTargets) {\n    return selectFromPool(questionPool, count, context);\n  }\n\n  const grouped = {};\n  questionPool.forEach(q => {\n    const diff = q.difficulty || 'unknown';\n    if (!grouped[diff]) grouped[diff] = [];\n    grouped[diff].push(q);\n  });\n\n  const selected = [];\n  Object.entries(difficultyTargets).forEach(([diff, ratio]) => {\n    if (selected.length >= count) return;\n    const desired = Math.round(count * ratio);\n    if (!grouped[diff] || desired <= 0) return;\n    const picked = selectFromPool(grouped[diff], desired, context);\n    selected.push(...picked);\n  });\n\n  if (selected.length < count) {\n    const remainingPool = questionPool.filter(q => !context.selectedIds.has(q.id));\n    selected.push(...selectFromPool(remainingPool, count - selected.length, context));\n  }\n\n  return selected.slice(0, count);\n}\n\n// ===== Main Question Selector =====\n\nfunction getRandomQuestions(totalQuestions = 30, settings = null, selectionOptions = null) {\n  const options = {\n    ...QUESTION_SELECTION_DEFAULTS,\n    ...(typeof quizSettings !== 'undefined' ? quizSettings.questionSelection : null),\n    ...(selectionOptions || null),\n  };\n\n  const history = getExamHistory(options);\n  const stats = buildQuestionStats(history, options.recentExamCount);\n  const cooldownIds = getRecentQuestionIdsFromHistory(history, options.cooldownExams);\n  const seed = getExamSeed(options);\n  const rng = createSeededRng(hashStringToSeed(seed));\n\n  const context = {\n    stats: {\n      ...stats,\n      cooldownIds,\n    },\n    options,\n    rng,\n    selectedIds: new Set(),\n    selectedConcepts: new Map(),\n    maxRecentAllowed: Math.max(0, Math.floor(totalQuestions * options.maxRepeatRatio)),\n  };\n\n  if (!settings || Object.keys(settings).length === 0) {\n    return selectQuestionsSmart(QUESTION_BANK, totalQuestions, context)\n      .slice(0, totalQuestions);\n  }\n\n  const categoryOrder = ['PCCC', 'QT_ATD', 'ATD', 'TBA', 'NMD'];\n  let selectedQuestions = [];\n\n  for (const category of categoryOrder) {\n    const count = settings[category];\n    if (!count || count <= 0) continue;\n\n    const basePool = QUESTION_BANK.filter(q => q.category === category);\n    let pool = basePool;\n\n    const fallbacks = options.categoryFallbacks && options.categoryFallbacks[category];\n    if (Array.isArray(fallbacks) && fallbacks.length > 0) {\n      const fallbackPool = QUESTION_BANK.filter(q => fallbacks.includes(q.category));\n      const merged = [...basePool, ...fallbackPool];\n      const seen = new Set();\n      pool = merged.filter(q => {\n        if (seen.has(q.id)) return false;\n        seen.add(q.id);\n        return true;\n      });\n    }\n\n    const picked = selectQuestionsSmart(pool, count, context);\n    selectedQuestions = selectedQuestions.concat(picked);\n  }\n\n  if (selectedQuestions.length < totalQuestions) {\n    const remaining = QUESTION_BANK.filter(q => !context.selectedIds.has(q.id));\n    if (options.allowCrossCategoryFill) {\n      selectedQuestions = selectedQuestions.concat(\n        selectQuestionsSmart(remaining, totalQuestions - selectedQuestions.length, context)\n      );\n    }\n  }\n\n  return selectedQuestions.slice(0, totalQuestions);\n}\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = { QUESTION_BANK, CATEGORIES_INFO, getRandomQuestions };\n}\n`;
        jsContent = jsContent
            .replace('return String(value || \'\')\\n    .trim()\\n    .toLowerCase()\\n    .replace(/\\\\s+/g, \'-\')\\n    .replace(/[^a-z0-9-]/g, \'\');',
                'const cleaned = String(value || \'\').trim().toLowerCase();\\n  return encodeURIComponent(cleaned).replace(/%20/g, \'-\');')
            .replace('let recentSelected = 0;', 'if (typeof context.recentSelectedCount !== \"number\") context.recentSelectedCount = 0;')
            .replace('recentSelected >= maxRecentAllowed', 'context.recentSelectedCount >= maxRecentAllowed')
            .replace('recentSelected += 1', 'context.recentSelectedCount += 1');

        // Backup & write
        const jsDir = getAppJsDir();
        const targetFile = path.join(jsDir, 'questions.js');
        if (fs.existsSync(targetFile)) {
            fs.copyFileSync(targetFile, targetFile + '.bak');
        }
        fs.writeFileSync(targetFile, jsContent, 'utf-8');

        return { success: true, totalQuestions: allQuestions.length, categoriesInfo };
    } catch (error) {
        console.error('import-questions-excel failed:', error);
        return { success: false, error: error.message };
    }
});
