/**
 * Quiz Application Main Logic
 * Hệ thống thi trắc nghiệm - DAHC
 */

// ===== Global State =====
const state = {
    user: {
        fullName: '',
        password: '',
        department: '',
        attemptNumber: 1
    },
    questions: [],
    currentIndex: 0,
    answers: {},          // { questionId: selectedOptionIndex }
    questionStatus: {},   // { questionId: 'not-visited' | 'visited' | 'answered' | 'flagged' }
    timer: {
        duration: 30 * 60, // 30 minutes in seconds
        remaining: 30 * 60,
        interval: null
    },
    startTime: null,
    endTime: null,
    violationCount: 0
};

// ===== Exam Attempt Counter =====
function getAttemptCount(fullName, password) {
    const key = `exam_attempts_${fullName}_${password}`;
    return parseInt(localStorage.getItem(key) || '0');
}

function incrementAttemptCount(fullName, password) {
    const key = `exam_attempts_${fullName}_${password}`;
    const count = getAttemptCount(fullName, password) + 1;
    localStorage.setItem(key, count.toString());
    return count;
}

// ===== Exam History Management =====
const EXAM_HISTORY_KEY = 'exam_history';
const DEVICE_ID_KEY = 'quiz_device_id';
const SESSION_KEY = 'exam_session'; // Lưu trạng thái bài thi hiện tại
const MAX_HISTORY_ITEMS = 100; // Giữ tối đa 100 kết quả
const AUTO_SAVE_INTERVAL = 30000; // Tự động lưu mỗi 30 giây

let autoSaveTimer = null;

function isElectronRuntime() {
    return !!(window.electronAPI && window.electronAPI.isElectron);
}

async function syncExamRuntimeState(inProgress, extra = {}) {
    if (!isElectronRuntime() || typeof window.electronAPI.setExamState !== 'function') return;
    try {
        await window.electronAPI.setExamState({
            inProgress: !!inProgress,
            candidateName: state.user.fullName || null,
            startedAt: state.startTime ? state.startTime.toISOString() : null,
            timerRemaining: state.timer.remaining,
            ...extra
        });
    } catch (error) {
        console.warn('Failed to sync exam state:', error);
    }
}

function saveExamToHistory(examResult) {
    try {
        const historyKey = getHistoryStorageKey(state.user.fullName, state.user.password);
        let history = getExamHistory(historyKey);

        // Thêm kết quả mới vào đầu danh sách
        history.unshift(examResult);

        // Giới hạn số lượng lịch sử
        if (history.length > MAX_HISTORY_ITEMS) {
            history = history.slice(0, MAX_HISTORY_ITEMS);
        }

        localStorage.setItem(historyKey, JSON.stringify(history));

        if (historyKey !== EXAM_HISTORY_KEY) {
            let legacyHistory = getExamHistory(EXAM_HISTORY_KEY);
            legacyHistory.unshift(examResult);
            if (legacyHistory.length > MAX_HISTORY_ITEMS) {
                legacyHistory = legacyHistory.slice(0, MAX_HISTORY_ITEMS);
            }
            localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(legacyHistory));
        }
        console.log('✅ Đã lưu kết quả thi vào lịch sử');
        return true;
    } catch (error) {
        console.error('❌ Lỗi lưu lịch sử thi:', error);
        return false;
    }
}

function getExamHistory(customKey = null) {
    try {
        const key = customKey || getHistoryStorageKey(state.user.fullName, state.user.password);
        const historyJson = localStorage.getItem(key);
        if (historyJson) return JSON.parse(historyJson);
        if (key !== EXAM_HISTORY_KEY) {
            const legacyJson = localStorage.getItem(EXAM_HISTORY_KEY);
            return legacyJson ? JSON.parse(legacyJson) : [];
        }
        return [];
    } catch (error) {
        console.error('❌ Lỗi đọc lịch sử thi:', error);
        return [];
    }
}

function getExamHistoryByUser(fullName, password) {
    const key = getHistoryStorageKey(fullName, password);
    return getExamHistory(key);
}

function clearExamHistory() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === EXAM_HISTORY_KEY || (key && key.startsWith(EXAM_HISTORY_KEY + '::'))) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    console.log('🗑️ Đã xóa toàn bộ lịch sử thi');
}

function buildExamResult(correctAnswers, totalQuestions, isPassed, timeUp = false) {
    return {
        id: Date.now(), // Unique ID
        user: {
            fullName: state.user.fullName,
            department: state.user.department,
            attemptNumber: state.user.attemptNumber
        },
        exam: {
            startTime: state.startTime ? state.startTime.toISOString() : null,
            endTime: state.endTime ? state.endTime.toISOString() : null,
            duration: calculateDuration(),
            timeUp: timeUp,
            questionIds: state.questions.map(q => q.id)
        },
        result: {
            correctAnswers: correctAnswers,
            totalQuestions: totalQuestions,
            wrongAnswers: totalQuestions - correctAnswers,
            isPassed: isPassed,
            score: Math.round((correctAnswers / totalQuestions) * 100)
        },
        // Chỉ lưu tóm tắt câu trả lời (tiết kiệm dung lượng)
        answersSummary: state.questions.map(q => ({
            id: q.id,
            cat: q.category,
            ua: state.answers[q.id] !== undefined ? state.answers[q.id] : -1,
            ca: q.correct,
            ok: state.answers[q.id] === q.correct
        })),
        savedAt: new Date().toISOString()
    };
}

// ===== PDF Cache Management (IndexedDB - hỗ trợ dung lượng lớn) =====
const PDF_DB_NAME = 'QuizDAHC_PDFCache';
const PDF_DB_VERSION = 1;
const PDF_STORE_NAME = 'pdfs';
const MAX_PDF_CACHE = 40; // Giữ tối đa 40 PDF (IndexedDB cho phép lưu trữ lớn hơn nhiều so với LocalStorage)

function openPDFDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(PDF_DB_NAME, PDF_DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(PDF_STORE_NAME)) {
                const store = db.createObjectStore(PDF_STORE_NAME, { keyPath: 'examId' });
                store.createIndex('savedAt', 'savedAt', { unique: false });
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

async function savePDFToCache(examId, fileName, pdfBase64) {
    try {
        const db = await openPDFDatabase();
        const tx = db.transaction(PDF_STORE_NAME, 'readwrite');
        const store = tx.objectStore(PDF_STORE_NAME);

        // Lưu PDF mới
        store.put({
            examId: examId,
            fileName: fileName,
            pdfData: pdfBase64,
            savedAt: new Date().toISOString()
        });

        await new Promise((resolve, reject) => {
            tx.oncomplete = resolve;
            tx.onerror = () => reject(tx.error);
        });

        // Kiểm tra và xóa bớt nếu vượt quá giới hạn
        await trimPDFCache();

        console.log('📄 Đã lưu PDF vào IndexedDB:', fileName);
        db.close();
        return true;
    } catch (error) {
        console.error('❌ Lỗi lưu PDF vào cache:', error);
        return false;
    }
}

async function trimPDFCache() {
    try {
        const db = await openPDFDatabase();
        const tx = db.transaction(PDF_STORE_NAME, 'readwrite');
        const store = tx.objectStore(PDF_STORE_NAME);
        const index = store.index('savedAt');

        const countRequest = store.count();
        const count = await new Promise((resolve) => {
            countRequest.onsuccess = () => resolve(countRequest.result);
        });

        if (count > MAX_PDF_CACHE) {
            // Lấy các mục cũ nhất để xóa
            const toDelete = count - MAX_PDF_CACHE;
            let deleted = 0;
            const cursorRequest = index.openCursor();

            await new Promise((resolve) => {
                cursorRequest.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor && deleted < toDelete) {
                        cursor.delete();
                        deleted++;
                        cursor.continue();
                    } else {
                        resolve();
                    }
                };
            });
        }

        db.close();
    } catch (error) {
        console.error('❌ Lỗi trim PDF cache:', error);
    }
}

async function getPDFCache() {
    try {
        const db = await openPDFDatabase();
        const tx = db.transaction(PDF_STORE_NAME, 'readonly');
        const store = tx.objectStore(PDF_STORE_NAME);

        const allItems = await new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

        db.close();
        // Sắp xếp theo thời gian mới nhất
        return allItems.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
    } catch (error) {
        console.error('❌ Lỗi đọc PDF cache:', error);
        return [];
    }
}

async function getPDFFromCache(examId) {
    try {
        const db = await openPDFDatabase();
        const tx = db.transaction(PDF_STORE_NAME, 'readonly');
        const store = tx.objectStore(PDF_STORE_NAME);

        const item = await new Promise((resolve, reject) => {
            const request = store.get(examId);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

        db.close();
        return item || null;
    } catch (error) {
        console.error('❌ Lỗi đọc PDF từ cache:', error);
        return null;
    }
}

async function downloadPDFFromCache(examId) {
    const pdfItem = await getPDFFromCache(examId);
    if (!pdfItem) {
        alert('Không tìm thấy PDF trong bộ nhớ tạm!');
        return false;
    }

    // Chuyển base64 thành blob và tải về
    const byteCharacters = atob(pdfItem.pdfData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Tạo link download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfItem.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('📥 Đã tải PDF từ bộ nhớ tạm:', pdfItem.fileName);
    return true;
}

async function clearPDFCache() {
    try {
        const db = await openPDFDatabase();
        const tx = db.transaction(PDF_STORE_NAME, 'readwrite');
        const store = tx.objectStore(PDF_STORE_NAME);
        store.clear();

        await new Promise((resolve, reject) => {
            tx.oncomplete = resolve;
            tx.onerror = () => reject(tx.error);
        });

        db.close();
        console.log('🗑️ Đã xóa toàn bộ PDF cache');
    } catch (error) {
        console.error('❌ Lỗi xóa PDF cache:', error);
    }
}

// Migrate dữ liệu cũ từ LocalStorage sang IndexedDB (chạy 1 lần)
async function migratePDFCacheToIndexedDB() {
    try {
        const oldCache = localStorage.getItem('pdf_cache');
        if (!oldCache) return;

        const pdfItems = JSON.parse(oldCache);
        if (!pdfItems || pdfItems.length === 0) return;

        console.log(`🔄 Đang di chuyển ${pdfItems.length} PDF từ LocalStorage sang IndexedDB...`);

        const db = await openPDFDatabase();
        const tx = db.transaction(PDF_STORE_NAME, 'readwrite');
        const store = tx.objectStore(PDF_STORE_NAME);

        for (const item of pdfItems) {
            store.put(item);
        }

        await new Promise((resolve, reject) => {
            tx.oncomplete = resolve;
            tx.onerror = () => reject(tx.error);
        });

        db.close();

        // Xóa dữ liệu cũ từ LocalStorage
        localStorage.removeItem('pdf_cache');
        console.log('✅ Đã di chuyển PDF cache sang IndexedDB và xóa dữ liệu cũ từ LocalStorage');
    } catch (error) {
        console.error('❌ Lỗi di chuyển PDF cache:', error);
    }
}

// ===== Session Management (Khôi phục bài thi khi F5/lỗi) =====
function saveSession() {
    try {
        const sessionData = {
            user: state.user,
            questions: state.questions,
            currentIndex: state.currentIndex,
            answers: state.answers,
            questionStatus: state.questionStatus,
            timerRemaining: state.timer.remaining,
            timerDuration: state.timer.duration,
            startTime: state.startTime ? state.startTime.toISOString() : null,
            violationCount: state.violationCount,
            savedAt: new Date().toISOString()
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
        console.log('💾 Đã tự động lưu bài thi');
        syncExamRuntimeState(true, { sessionSavedAt: sessionData.savedAt });
        return true;
    } catch (error) {
        console.error('❌ Lỗi lưu session:', error);
        return false;
    }
}

function loadSession() {
    try {
        const sessionJson = localStorage.getItem(SESSION_KEY);
        if (!sessionJson) return null;

        const session = JSON.parse(sessionJson);

        // Kiểm tra session còn hợp lệ không (không quá 2 giờ)
        const savedAt = new Date(session.savedAt);
        const now = new Date();
        const hoursDiff = (now - savedAt) / (1000 * 60 * 60);

        if (hoursDiff > 2) {
            console.log('⏰ Session đã hết hạn (>2 giờ)');
            clearSession();
            return null;
        }

        return session;
    } catch (error) {
        console.error('❌ Lỗi đọc session:', error);
        return null;
    }
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    console.log('🗑️ Đã xóa session');
    syncExamRuntimeState(false, { sessionSavedAt: null });
}

function buildExamResultFromCurrentState(timeUp = false) {
    let correctAnswers = 0;
    const totalQuestions = state.questions.length;

    state.questions.forEach(question => {
        const userAnswer = state.answers[question.id];
        if (userAnswer === question.correct) {
            correctAnswers++;
        }
    });

    const isPassed = correctAnswers >= 27;
    return buildExamResult(correctAnswers, totalQuestions, isPassed, timeUp);
}

function hasActiveSession() {
    return loadSession() !== null;
}

function restoreSession() {
    const session = loadSession();
    if (!session) return false;

    // Khôi phục state
    state.user = session.user;
    state.questions = session.questions;
    state.currentIndex = session.currentIndex;
    state.answers = session.answers;
    state.questionStatus = session.questionStatus;
    state.timer.remaining = session.timerRemaining;
    state.timer.duration = session.timerDuration;
    state.startTime = session.startTime ? new Date(session.startTime) : new Date();
    state.violationCount = session.violationCount || 0;

    console.log('✅ Đã khôi phục bài thi');
    return true;
}

function startAutoSave() {
    // Dừng timer cũ nếu có
    stopAutoSave();

    // Lưu ngay lập tức
    saveSession();

    // Bắt đầu auto-save định kỳ
    autoSaveTimer = setInterval(() => {
        saveSession();
    }, AUTO_SAVE_INTERVAL);

    console.log('⏱️ Bắt đầu tự động lưu bài thi');
}

function stopAutoSave() {
    if (autoSaveTimer) {
        clearInterval(autoSaveTimer);
        autoSaveTimer = null;
    }
}

// ===== DOM Elements =====
const elements = {
    // Screens
    loginScreen: document.getElementById('loginScreen'),
    quizScreen: document.getElementById('quizScreen'),
    resultScreen: document.getElementById('resultScreen'),

    // Login
    loginForm: document.getElementById('loginForm'),
    fullNameInput: document.getElementById('fullName'),
    passwordInput: document.getElementById('candidatePassword'),

    // Quiz
    examCode: document.getElementById('examCode'),
    timer: document.getElementById('timer'),
    userName: document.getElementById('userName'),
    questionContainer: document.getElementById('questionContainer'),
    questionGrid: document.getElementById('questionGrid'),
    btnPrev: document.getElementById('btnPrev'),
    btnNext: document.getElementById('btnNext'),
    btnFinish: document.getElementById('btnFinish'),

    // Result
    resultIcon: document.getElementById('resultIcon'),
    resultTitle: document.getElementById('resultTitle'),
    resultName: document.getElementById('resultName'),
    resultAttempt: document.getElementById('resultAttempt'),
    resultDepartment: document.getElementById('resultDepartment'),
    resultDate: document.getElementById('resultDate'),
    resultDuration: document.getElementById('resultDuration'),
    scoreNumber: document.getElementById('scoreNumber'),
    correctCount: document.getElementById('correctCount'),
    wrongCount: document.getElementById('wrongCount'),
    resultStatus: document.getElementById('resultStatus'),
    btnExportPDF: document.getElementById('btnExportPDF'),
    btnRetry: document.getElementById('btnRetry'),
    btnOpenPdfFolder: document.getElementById('btnOpenPdfFolder'),
    btnGoHome: document.getElementById('btnGoHome')
};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', init);

function init() {
    populateCandidateDropdown();
    setupEventListeners();
    setupBeforeUnloadWarning();
    setupElectronGuards();

    // Migrate PDF cache cũ từ LocalStorage sang IndexedDB
    migratePDFCacheToIndexedDB();

    // Kiểm tra có session cũ không
    checkForExistingSession();
}

function showViolationModal(count, limit) {
    const existingModal = document.getElementById('violationModal');
    if (existingModal) {
        existingModal.remove();
    }

    const isLimitReached = count > limit;

    let title = 'CẢNH BÁO VI PHẠM';
    let msg = `Bạn đang cố tình thao tác ngoài phần mềm thi!<br>Số lần vi phạm: <strong style="color:#DC2626;font-size:24px;">${count}/${limit}</strong>.<br><br>Yêu cầu quay lại bài thi ngay lập tức. Nếu quá ${limit} lần vi phạm, bài thi sẽ tự động kết thúc!`;
    let btnText = 'TÔI ĐÃ HIỂU VÀ QUAY LẠI THI';

    if (isLimitReached) {
        title = 'ĐÌNH CHỈ THI';
        msg = `Bạn đã vi phạm quy chế thao tác ngoài ứng dụng quá ${limit} lần.<br>Hệ thống tự động đình chỉ và thu bài của bạn!`;
        btnText = 'KẾT THÚC BÀI THI';
    }

    const modal = document.createElement('div');
    modal.id = 'violationModal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(185, 28, 28, 0.95);display:flex;align-items:center;justify-content:center;z-index:999999;backdrop-filter:blur(8px);font-family:Tahoma, Arial, sans-serif;';

    modal.innerHTML = `
        <div style="background:white;padding:45px 40px;border-radius:24px;max-width:650px;width:90%;text-align:center;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);">
            <div style="font-size:80px;margin-bottom:10px;line-height:1;color:#DC2626;" class="animate-bounce">⚠️</div>
            <h2 style="color:#DC2626;margin-bottom:20px;font-size:32px;text-transform:uppercase;font-weight:900;letter-spacing:1px;">${title}</h2>
            <p style="color:#1F2937;font-size:20px;margin-bottom:35px;line-height:1.6;font-weight:500;">${msg}</p>
            <button id="btnViolationConfirm" style="padding:20px 40px;border:none;background:#DC2626;color:white;border-radius:12px;cursor:pointer;font-size:18px;font-weight:bold;width:100%;text-transform:uppercase;transition:all 0.2s;box-shadow:0 4px 6px -1px rgba(220,38,38,0.4);">
                ${btnText}
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('btnViolationConfirm').addEventListener('click', () => {
        modal.remove();
        if (isLimitReached) {
            finishQuiz(false); // Terminate exam
        }
    });

    // Optional: add keydown listener to prevent Enter key closing if limit reached, but we want them to click it or it just stays there.
}

let lastViolationTime = 0;

function setupElectronGuards() {
    if (!isElectronRuntime()) return;

    if (typeof window.electronAPI.onForceStayInExam === 'function') {
        window.electronAPI.onForceStayInExam(() => {
            showToast('Đang trong thời gian thi, không thể thoát ứng dụng.');
        });
    }

    if (typeof window.electronAPI.onExamViolation === 'function') {
        window.electronAPI.onExamViolation(() => {
            // Debounce 2 seconds
            const now = Date.now();
            if (now - lastViolationTime < 2000) return;
            lastViolationTime = now;

            // Only count violation if an exam is actively in progress
            if (!state.timer.interval || state.timer.remaining <= 0) return;

            state.violationCount++;
            saveSession(); // Save the new violation count immediately

            showViolationModal(state.violationCount, 3);
        });
    }
}

async function checkForExistingSession() {
    const session = loadSession();
    if (!session || !session.questions || session.questions.length === 0) return;

    if (isElectronRuntime() && typeof window.electronAPI.getExamState === 'function') {
        try {
            const runtime = await window.electronAPI.getExamState();
            if (runtime?.success && runtime?.state?.inProgress) {
                continueSession();
                return;
            }
        } catch (error) {
            console.warn('Failed to read runtime state:', error);
        }
    }

    if (session && session.questions && session.questions.length > 0) {
        // Có session cũ - hỏi người dùng
        showSessionRecoveryDialog(session);
    }
}

function showSessionRecoveryDialog(session) {
    if (document.getElementById('sessionRecoveryModal')) return;

    const minutesLeft = Math.floor(session.timerRemaining / 60);
    const answeredCount = Object.keys(session.answers).length;
    const safeFullName = String(session?.user?.fullName || '');
    const text = {
        title: 'Ph\u00E1t hi\u1EC7n b\u00E0i thi ch\u01B0a ho\u00E0n th\u00E0nh!',
        candidate: 'Th\u00ED sinh:',
        answered: '\u0110\u00E3 l\u00E0m:',
        remaining: 'C\u00F2n l\u1EA1i:',
        unit: 'c\u00E2u',
        minute: 'ph\u00FAt',
        question: 'B\u1EA1n c\u00F3 mu\u1ED1n ti\u1EBFp t\u1EE5c b\u00E0i thi n\u00E0y kh\u00F4ng?',
        discard: 'B\u1EAFt \u0111\u1EA7u m\u1EDBi',
        resume: 'Ti\u1EBFp t\u1EE5c l\u00E0m b\u00E0i',
    };

    const modal = document.createElement('div');
    modal.id = 'sessionRecoveryModal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:10000;';

    modal.innerHTML = `
        <div style="background:white;padding:35px;border-radius:15px;max-width:450px;width:90%;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,0.3);">
            <div style="font-size:50px;margin-bottom:15px;">&#9888;</div>
            <h2 style="color:#333;margin-bottom:15px;font-size:22px;">${text.title}</h2>
            <div style="background:#f5f5f5;padding:15px;border-radius:10px;margin-bottom:20px;text-align:left;">
                <p style="margin:5px 0;color:#666;"><strong>${text.candidate}</strong> <span data-session-field="fullName"></span></p>
                <p style="margin:5px 0;color:#666;"><strong>${text.answered}</strong> ${answeredCount}/${session.questions.length} ${text.unit}</p>
                <p style="margin:5px 0;color:#666;"><strong>${text.remaining}</strong> ${minutesLeft} ${text.minute}</p>
            </div>
            <p style="color:#666;font-size:14px;margin-bottom:25px;">${text.question}</p>
            <div style="display:flex;gap:15px;">
                <button data-session-action="discard" style="flex:1;padding:15px;border:2px solid #ddd;background:white;border-radius:10px;cursor:pointer;font-size:14px;font-weight:600;color:#666;">
                    ${text.discard}
                </button>
                <button data-session-action="continue" style="flex:1;padding:15px;border:none;background:#4CAF50;color:white;border-radius:10px;cursor:pointer;font-size:14px;font-weight:600;">
                    ${text.resume}
                </button>
            </div>
        </div>
    `;

    modal.querySelector('[data-session-field="fullName"]').textContent = safeFullName;
    modal.querySelector('[data-session-action="discard"]').addEventListener('click', discardSession);
    modal.querySelector('[data-session-action="continue"]').addEventListener('click', continueSession);
    document.body.appendChild(modal);
}

function continueSession() {
    document.getElementById('sessionRecoveryModal')?.remove();

    if (restoreSession()) {
        // Chuyển sang màn hình thi
        switchScreen('quiz');

        // Cập nhật UI
        elements.userName.textContent = state.user.fullName;
        elements.examCode.textContent = `BÀI THI - ${state.user.department} - (Khôi phục)`;
        elements.btnFinish.textContent = `KẾT THÚC ${state.questions.length} CÂU`;

        renderQuestion();
        renderQuestionGrid();
        updateNavigationButtons();
        updateTimerDisplay(); // Hiển thị thời gian còn lại
        resumeTimer(); // Tiếp tục đếm ngược (KHÔNG reset)
        startAutoSave();
        syncExamRuntimeState(true);

        // Hiển thị thông báo
        showToast('✅ Đã khôi phục bài thi của bạn!');
    }
}

function discardSession() {
    document.getElementById('sessionRecoveryModal')?.remove();
    clearSession();
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.innerHTML = `
        <div style="position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#4CAF50;color:white;padding:15px 30px;border-radius:10px;box-shadow:0 5px 20px rgba(0,0,0,0.3);z-index:9999;font-weight:500;">
            ${message}
        </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}

function setupBeforeUnloadWarning() {
    window.addEventListener('beforeunload', (e) => {
        // Chỉ cảnh báo nếu đang trong bài thi
        if (state.questions.length > 0 && state.timer.interval) {
            saveSession(); // Lưu trước khi thoát
            e.preventDefault();
            e.returnValue = 'Bạn đang làm bài thi. Bạn có chắc muốn thoát?';
            return e.returnValue;
        }
    });
}

function populateCandidateDropdown() {
    const select = document.getElementById('fullName');
    if (!select) return;

    if (typeof CANDIDATES_LIST !== 'undefined' && CANDIDATES_LIST.length > 0) {
        CANDIDATES_LIST.forEach(candidate => {
            const option = document.createElement('option');
            option.value = candidate.name;
            option.textContent = candidate.name;
            select.appendChild(option);
        });

        // Add change handler for name selection
        select.addEventListener('change', onNameSelected);
    }
}

function onNameSelected() {
    const select = document.getElementById('fullName');
    const passwordInput = document.getElementById('candidatePassword');

    const selectedName = select.value;

    if (!selectedName) {
        if (passwordInput) passwordInput.value = '';
        return;
    }

    // Clear password when switching candidates
    if (passwordInput) passwordInput.value = '';
}

function setupEventListeners() {
    // Login form
    elements.loginForm.addEventListener('submit', handleLogin);

    // Toggle password visibility
    const togglePasswordBtn = document.getElementById('toggleCandidatePassword');
    if (togglePasswordBtn && elements.passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = elements.passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            elements.passwordInput.setAttribute('type', type);
            togglePasswordBtn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }

    // Navigation
    elements.btnPrev.addEventListener('click', () => navigateQuestion(-1));
    elements.btnNext.addEventListener('click', () => navigateQuestion(1));
    elements.btnFinish.addEventListener('click', handleFinish);
    elements.questionContainer.addEventListener('click', handleQuestionContainerClick);
    elements.questionContainer.addEventListener('change', handleQuestionContainerChange);
    elements.questionGrid.addEventListener('click', handleQuestionGridClick);

    // Result actions
    elements.btnExportPDF.addEventListener('click', exportToPDF);
    elements.btnRetry.addEventListener('click', handleRetry);
    if (elements.btnOpenPdfFolder) {
        elements.btnOpenPdfFolder.addEventListener('click', openSavedPDFFolder);
    }
    if (elements.btnGoHome) {
        elements.btnGoHome.addEventListener('click', goHomeFromResult);
    }
}

function handleQuestionContainerClick(event) {
    const flagButton = event.target.closest('[data-action="toggle-flag"]');
    if (flagButton) {
        const questionId = Number(flagButton.dataset.questionId);
        if (!Number.isNaN(questionId)) {
            toggleFlag(questionId);
        }
        return;
    }

    const optionItem = event.target.closest('[data-action="select-option"]');
    if (optionItem) {
        const questionId = Number(optionItem.dataset.questionId);
        const optionIndex = Number(optionItem.dataset.optionIndex);
        if (!Number.isNaN(questionId) && !Number.isNaN(optionIndex)) {
            selectOption(questionId, optionIndex);
        }
    }
}

function handleQuestionContainerChange(event) {
    const optionInput = event.target.closest('input[data-action="select-option-input"]');
    if (!optionInput) return;

    const questionId = Number(optionInput.dataset.questionId);
    const optionIndex = Number(optionInput.dataset.optionIndex);
    if (!Number.isNaN(questionId) && !Number.isNaN(optionIndex)) {
        selectOption(questionId, optionIndex);
    }
}

function handleQuestionGridClick(event) {
    const gridItem = event.target.closest('[data-action="go-to-question"]');
    if (!gridItem) return;

    const questionIndex = Number(gridItem.dataset.questionIndex);
    if (!Number.isNaN(questionIndex)) {
        goToQuestion(questionIndex);
    }
}

// ===== Login =====
function handleLogin(e) {
    e.preventDefault();

    const fullName = elements.fullNameInput.value;
    const passwordValue = elements.passwordInput.value.trim();
    const errorDiv = document.getElementById('loginError');

    // Hide previous error
    if (errorDiv) errorDiv.style.display = 'none';

    if (!fullName) {
        showLoginError('Vui lòng chọn tên của bạn!');
        return;
    }

    if (!passwordValue) {
        showLoginError('Vui lòng nhập mật khẩu!');
        return;
    }

    // Validate against candidate list
    if (typeof validateCandidate === 'function') {
        const result = validateCandidate(fullName, passwordValue);
        if (!result.valid) {
            showLoginError(result.error);
            return;
        }
        state.user.department = result.department || '';
    }

    state.user.fullName = fullName;
    state.user.password = passwordValue;

    // Increment and store attempt number
    state.user.attemptNumber = incrementAttemptCount(fullName, passwordValue);

    startQuiz();
}

function showLoginError(message) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.innerHTML = '<span style="font-size: 18px; font-weight: bold;">✖</span> ' + message;
        errorDiv.style.display = 'flex';
    } else {
        alert(message);
    }
}

// ===== Quiz Logic =====
function startQuiz() {
    // Load settings and get random questions based on settings
    const settings = typeof quizSettings !== 'undefined' ? quizSettings : { totalQuestions: 30, durationMinutes: 30, categories: {} };
    const totalQuestions = settings.totalQuestions || 30;
    const durationMinutes = settings.durationMinutes || 30;

    // Get random questions with category settings
    state.questions = getRandomQuestions(totalQuestions, settings.categories);

    // Update timer duration
    state.timer.duration = durationMinutes * 60;
    state.timer.remaining = state.timer.duration;

    // Initialize state
    state.currentIndex = 0;
    state.answers = {};
    state.questionStatus = {};
    state.questions.forEach((q, i) => {
        state.questionStatus[q.id] = 'not-visited';
    });

    // Mark first question as current
    state.questionStatus[state.questions[0].id] = 'current';

    // Record start time
    state.startTime = new Date();
    state.violationCount = 0;

    // Switch screens
    switchScreen('quiz');

    // Update UI
    elements.userName.textContent = state.user.fullName;
    elements.examCode.textContent = `BÀI THI - ${state.user.department} - ${formatDate(state.startTime)}`;

    // Render
    renderQuestion();
    renderQuestionGrid();
    updateNavigationButtons();

    // Update finish button text with question count
    elements.btnFinish.textContent = `KẾT THÚC ${totalQuestions} CÂU`;

    // Start timer
    startTimer();

    // Bắt đầu tự động lưu bài thi
    startAutoSave();
    syncExamRuntimeState(true);
}

function renderQuestion() {
    const question = state.questions[state.currentIndex];
    const selectedAnswer = state.answers[question.id];
    const isFlagged = state.questionStatus[question.id] === 'flagged';

    const optionLabels = ['A', 'B', 'C', 'D'];

    const html = `
        <div class="question-box">
            <div class="question-header">
                <span class="question-number">Câu ${state.currentIndex + 1}:</span>
                <button class="flag-btn ${isFlagged ? 'active' : ''}" 
                        type="button"
                        data-action="toggle-flag"
                        data-question-id="${question.id}"
                        title="Đánh dấu câu hỏi">
                    ⚑
                </button>
            </div>
            <div class="question-content">
                <p class="question-text">${question.question}</p>
                <div class="options-list">
                    ${question.options.map((option, idx) => `
                        <label class="option-item ${selectedAnswer === idx ? 'selected' : ''}" 
                               data-action="select-option"
                               data-question-id="${question.id}"
                               data-option-index="${idx}">
                            <input type="radio" 
                                   name="question_${question.id}" 
                                   value="${idx}"
                                   data-action="select-option-input"
                                   data-question-id="${question.id}"
                                   data-option-index="${idx}"
                                   ${selectedAnswer === idx ? 'checked' : ''}>
                            <span class="option-radio"></span>
                            <span class="option-label">${optionLabels[idx]}.</span>
                            <span class="option-text">${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    elements.questionContainer.innerHTML = html;
}

function selectOption(questionId, optionIndex) {
    state.answers[questionId] = optionIndex;

    // Update status if not flagged
    if (state.questionStatus[questionId] !== 'flagged') {
        state.questionStatus[questionId] = 'answered';
    }

    renderQuestion();
    renderQuestionGrid();

    // Lưu session khi trả lời câu hỏi
    saveSession();
}

function toggleFlag(questionId) {
    if (state.questionStatus[questionId] === 'flagged') {
        // Unflag - set to answered if has answer, else visited
        state.questionStatus[questionId] = state.answers[questionId] !== undefined ? 'answered' : 'visited';
    } else {
        state.questionStatus[questionId] = 'flagged';
    }

    renderQuestion();
    renderQuestionGrid();
}

function renderQuestionGrid() {
    // Định nghĩa thứ tự các category
    const categoryOrder = ['PCCC', 'QT_ATD', 'ATD', 'TBA', 'NMD'];
    const categoryNames = {
        'PCCC': '1. PCCC',
        'QT_ATD': '2. QT_ATD',
        'ATD': '3. ATD',
        'TBA': '4. TBA',
        'NMD': '5. NMD'
    };

    // Nhóm câu hỏi theo category và giữ index gốc
    const questionsByCategory = {};
    state.questions.forEach((q, idx) => {
        const cat = q.category || 'OTHER';
        if (!questionsByCategory[cat]) {
            questionsByCategory[cat] = [];
        }
        questionsByCategory[cat].push({ question: q, index: idx });
    });

    // Render HTML cho từng nhóm
    let html = '';
    categoryOrder.forEach(cat => {
        const questions = questionsByCategory[cat];
        if (!questions || questions.length === 0) return;

        // Tính phạm vi câu hỏi
        const firstQuestion = questions[0].index + 1;
        const lastQuestion = questions[questions.length - 1].index + 1;
        const rangeLabel = firstQuestion === lastQuestion
            ? `Câu ${firstQuestion}`
            : `Câu ${firstQuestion}-${lastQuestion}`;

        const categoryLabel = `${categoryNames[cat] || cat} (${rangeLabel})`;

        html += `<div class="category-section">`;
        html += `<div class="category-label">${categoryLabel}</div>`;
        html += `<div class="category-grid">`;

        questions.forEach(({ question, index }) => {
            let statusClass = state.questionStatus[question.id] || 'not-visited';

            // Override with current if this is current question
            if (index === state.currentIndex && statusClass !== 'flagged') {
                statusClass = 'current';
            }

            html += `
                <div class="grid-item ${statusClass}" 
                     data-action="go-to-question"
                     data-question-index="${index}"
                     title="Câu ${index + 1} - ${categoryNames[cat] || cat}">
                    ${index + 1}
                </div>
            `;
        });

        html += `</div></div>`;
    });

    elements.questionGrid.innerHTML = html;
}

function goToQuestion(index) {
    // Update previous question status
    const prevQuestion = state.questions[state.currentIndex];
    if (state.questionStatus[prevQuestion.id] === 'current') {
        state.questionStatus[prevQuestion.id] =
            state.answers[prevQuestion.id] !== undefined ? 'answered' : 'visited';
    }

    // Navigate to new question
    state.currentIndex = index;

    // Update new question status
    const currentQuestion = state.questions[state.currentIndex];
    if (state.questionStatus[currentQuestion.id] !== 'flagged' &&
        state.questionStatus[currentQuestion.id] !== 'answered') {
        state.questionStatus[currentQuestion.id] = 'current';
    }

    renderQuestion();
    renderQuestionGrid();
    updateNavigationButtons();
}

function navigateQuestion(direction) {
    const newIndex = state.currentIndex + direction;
    if (newIndex >= 0 && newIndex < state.questions.length) {
        goToQuestion(newIndex);
    }
}

function updateNavigationButtons() {
    elements.btnPrev.disabled = state.currentIndex === 0;
    elements.btnNext.disabled = state.currentIndex === state.questions.length - 1;
}

// ===== Timer =====
function startTimer() {
    state.timer.remaining = state.timer.duration;
    // Lưu timestamp bắt đầu đếm ngược
    state.timer._startedAt = Date.now();
    state.timer._initialRemaining = state.timer.remaining;
    updateTimerDisplay();
    _runTimerInterval();
}

// Tiếp tục timer (KHÔNG reset remaining) - dùng khi khôi phục session
function resumeTimer() {
    // Kiểm tra nếu đã hết giờ
    if (state.timer.remaining <= 0) {
        finishQuiz(true);
        return;
    }
    // Lưu timestamp tại thời điểm resume
    state.timer._startedAt = Date.now();
    state.timer._initialRemaining = state.timer.remaining;
    updateTimerDisplay();
    _runTimerInterval();
}

function _runTimerInterval() {
    // Dừng interval cũ nếu có
    stopTimer();

    state.timer.interval = setInterval(() => {
        // Tính remaining dựa trên thời gian thực (chống drift khi tab bị background)
        const elapsed = Math.floor((Date.now() - state.timer._startedAt) / 1000);
        state.timer.remaining = Math.max(0, state.timer._initialRemaining - elapsed);
        updateTimerDisplay();

        if (state.timer.remaining <= 0) {
            clearInterval(state.timer.interval);
            finishQuiz(true); // Time's up
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(state.timer.remaining / 60);
    const seconds = state.timer.remaining % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    elements.timer.textContent = display;

    // Warning colors
    if (state.timer.remaining <= 60) {
        elements.timer.classList.add('danger');
        elements.timer.classList.remove('warning');
    } else if (state.timer.remaining <= 300) { // 5 minutes
        elements.timer.classList.add('warning');
        elements.timer.classList.remove('danger');
    }
}

function stopTimer() {
    if (state.timer.interval) {
        clearInterval(state.timer.interval);
        state.timer.interval = null;
    }
}

// ===== Finish Quiz =====
function handleFinish() {
    const answeredCount = Object.keys(state.answers).length;
    const totalQuestions = state.questions.length;

    if (answeredCount < totalQuestions) {
        const unanswered = totalQuestions - answeredCount;
        showConfirmModal(
            '⚠️',
            'Xác nhận nộp bài',
            `Bạn còn ${unanswered} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài?`,
            () => finishQuiz(false)
        );
    } else {
        showConfirmModal(
            '✅',
            'Xác nhận nộp bài',
            'Bạn đã trả lời tất cả các câu hỏi. Bạn có chắc chắn muốn nộp bài?',
            () => finishQuiz(false)
        );
    }
}

function finishQuiz(timeUp = false) {
    stopTimer();
    stopAutoSave();  // Dừng tự động lưu
    clearSession();  // Xóa session vì đã nộp bài
    state.endTime = new Date();

    // Chấm điểm và lưu kết quả vào lịch sử
    // timeUp = true: hiển thị thông báo hết giờ
    // timeUp = false: nộp bài bình thường
    calculateAndShowResult(timeUp);
}

async function calculateAndShowResult(timeUp = false) {
    let correctAnswers = 0;

    state.questions.forEach(question => {
        const userAnswer = state.answers[question.id];
        if (userAnswer === question.correct) {
            correctAnswers++;
        }
    });

    const wrongAnswers = state.questions.length - correctAnswers;
    const isPassed = correctAnswers >= 27;

    // === LƯU KẾT QUẢ VÀO LOCALSTORAGE (DỰ PHÒNG) ===
    const examResult = buildExamResult(correctAnswers, state.questions.length, isPassed, timeUp);
    saveExamToHistory(examResult);

    // [ELECTRON] Lưu file JSON kết quả (backup cứng) ngay lập tức
    if (isElectronRuntime() && typeof window.electronAPI.saveExamArtifacts === 'function') {
        window.electronAPI.saveExamArtifacts({
            examResult: examResult,
            fileName: 'auto_save.pdf', // Tên tham khảo, backend tự đặt tên chuẩn
            pdfBase64: null
        }).then(res => {
            if (res.success) console.log('✅ Đã lưu JSON backup:', res.paths?.resultJsonPath);
            else console.error('❌ Lỗi lưu JSON backup:', res.error);
        });
    }

    // Update result screen
    elements.resultName.textContent = state.user.fullName;
    elements.resultAttempt.textContent = `Lần ${state.user.attemptNumber}`;
    elements.resultDepartment.textContent = state.user.department;
    elements.resultDate.textContent = formatDateTime(state.startTime);
    elements.resultDuration.textContent = calculateDuration();

    elements.scoreNumber.textContent = correctAnswers;
    elements.correctCount.textContent = correctAnswers;
    elements.wrongCount.textContent = wrongAnswers;

    // Cập nhật tổng số câu (động theo cài đặt admin)
    const scoreTotalEl = document.getElementById('scoreTotal');
    if (scoreTotalEl) scoreTotalEl.textContent = `/${state.questions.length}`;

    // Cập nhật SVG Ring Chart
    const scoreRingFill = document.getElementById('scoreRingFill');
    const percentage = correctAnswers / state.questions.length;
    const circumference = 2 * Math.PI * 52; // r=52
    if (scoreRingFill) {
        scoreRingFill.style.strokeDashoffset = circumference; // reset
        setTimeout(() => {
            scoreRingFill.style.strokeDashoffset = circumference * (1 - percentage);
        }, 100);
    }

    // Cập nhật banner và trạng thái
    const resultBanner = document.getElementById('resultBanner');
    if (isPassed) {
        elements.resultIcon.textContent = '🎉';
        elements.resultTitle.textContent = 'Chúc Mừng!';
        if (resultBanner) resultBanner.classList.remove('fail');
        if (scoreRingFill) scoreRingFill.classList.remove('fail');
        elements.resultStatus.className = 'result-status pass';
        elements.resultStatus.textContent = '✓ ĐẠT';
    } else {
        elements.resultIcon.textContent = '😔';
        elements.resultTitle.textContent = 'Kết Quả Bài Thi';
        if (resultBanner) resultBanner.classList.add('fail');
        if (scoreRingFill) scoreRingFill.classList.add('fail');
        elements.resultStatus.className = 'result-status fail';
        elements.resultStatus.textContent = '✗ KHÔNG ĐẠT';
    }

    switchScreen('result');

    // Hiển thị nút xuất PDF và mở thư mục ngay sau khi nộp bài
    if (isElectronRuntime()) {
        togglePostExportButtons(true);
    } else {
        togglePostExportButtons(false);
    }
}

function calculateDuration() {
    const duration = state.timer.duration - state.timer.remaining;
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes} phút ${seconds} giây`;
}

// ===== Time Up Notification =====
function showTimeUpNotification(correctAnswers, totalQuestions, isPassed, historySaved) {
    const notificationDiv = document.createElement('div');
    notificationDiv.id = 'timeUpNotification';
    notificationDiv.innerHTML = `
        <div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9998;">
            <div style="background:white;padding:30px 50px;border-radius:15px;text-align:center;max-width:420px;box-shadow:0 10px 40px rgba(0,0,0,0.3);">
                <div style="font-size:50px;margin-bottom:15px;">⏰</div>
                <h2 style="color:#EF4444;margin:0 0 15px 0;font-size:24px;">HẾT GIỜ LÀM BÀI!</h2>
                <p style="color:#475569;font-size:16px;margin:0 0 15px 0;">Bài thi của bạn đã được tự động nộp.</p>
                <div style="background:${isPassed ? '#ECFDF5' : '#FEF2F2'};padding:15px;border-radius:10px;margin:15px 0;">
                    <div style="font-size:32px;font-weight:bold;color:${isPassed ? '#10B981' : '#EF4444'};">${correctAnswers}/${totalQuestions}</div>
                    <div style="font-size:14px;color:#475569;margin-top:5px;">${isPassed ? '✓ ĐẠT' : '✗ KHÔNG ĐẠT'}</div>
                </div>
                ${historySaved ?
            '\x3cp style="color:#10B981;font-size:13px;margin:10px 0 0 0;">✅ Kết quả đã được lưu vào lịch sử (dự phòng)\x3c/p>' :
            '\x3cp style="color:#F59E0B;font-size:13px;margin:10px 0 0 0;">⚠️ Không thể lưu lịch sử\x3c/p>'
        }
                <p style="color:#0D9488;font-size:14px;margin:15px 0 0 0;">📄 Vui lòng nhấn "<strong>Xuất PDF</strong>" để lưu kết quả</p>
            </div>
        </div>
    `;
    document.body.appendChild(notificationDiv);

    // Tự động ẩn sau 4 giây
    setTimeout(() => {
        const notification = document.getElementById('timeUpNotification');
        if (notification) {
            notification.style.transition = 'opacity 0.5s';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }
    }, 4000);
}

// ===== History Saved Notification =====
function showHistorySavedNotification() {
    const notificationDiv = document.createElement('div');
    notificationDiv.id = 'historySavedNotification';
    notificationDiv.innerHTML = `
        <div style="position:fixed;bottom:20px;left:20px;background:#10B981;color:white;padding:14px 18px;border-radius:12px;box-shadow:0 4px 16px rgba(16,185,129,0.25);z-index:9999;max-width:320px;">
            <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:20px;line-height:1;">💾</span>
                <div style="flex:1;">
                    <div style="font-weight:600;font-size:13px;">Đã lưu kết quả & PDF</div>
                    <div style="font-size:10px;opacity:0.75;margin-top:2px;">📄 PDF tự động lưu vào bộ nhớ tạm</div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(notificationDiv);

    // Tự động ẩn sau 4 giây
    setTimeout(() => {
        const notification = document.getElementById('historySavedNotification');
        if (notification) {
            notification.style.transition = 'opacity 0.5s';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }
    }, 4000);
}

/**
 * Loại bỏ dấu tiếng Việt để tạo tên file an toàn
 */
function removeVietnameseTones(str) {
    if (!str) return '';

    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Thay thế các ký tự đặc biệt tiếng Việt
    str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');

    // Loại bỏ các ký tự không phải chữ cái, số, khoảng trắng
    str = str.replace(/[^a-zA-Z0-9\s]/g, '');

    return str;
}

// ===== PDF Generation (hàm dùng chung) =====
async function _generatePDFDoc(footerNote) {
    const { jsPDF } = window.jspdf;

    // Calculate results
    let correctAnswers = 0;
    const questionResults = [];
    const totalQuestions = state.questions.length;

    state.questions.forEach((question, index) => {
        const userAnswerIndex = state.answers[question.id];
        const isCorrect = userAnswerIndex === question.correct;
        if (isCorrect) correctAnswers++;

        questionResults.push({
            index: index + 1,
            question: question.question,
            options: question.options,
            userAnswer: userAnswerIndex !== undefined ? userAnswerIndex : -1,
            correctAnswer: question.correct,
            isCorrect: isCorrect
        });
    });

    const isPassed = correctAnswers >= 27;

    const questionsHtml = questionResults.map(q => `
        <div class="pdf-block pdf-question" style="margin-bottom:10px;padding:10px;border-left:3px solid ${q.isCorrect ? '#10B981' : '#EF4444'};background:#F8FAFC;border-radius:6px;">
            <div style="font-weight:bold;font-size:11px;color:#1E293B;margin-bottom:6px;">
                <span style="color:${q.isCorrect ? '#10B981' : '#EF4444'};margin-right:5px;">${q.isCorrect ? '✓' : '✗'}</span>
                Câu ${q.index}: ${q.question}
            </div>
            <div style="margin-left:15px;font-size:10px;">
                ${q.options.map((opt, idx) => {
        const prefix = String.fromCharCode(65 + idx);
        let bgColor = '#fff';
        let borderColor = '#E2E8F0';
        let textColor = '#1E293B';
        let symbol = '';

        if (idx === q.correctAnswer) {
            bgColor = '#ECFDF5';
            borderColor = '#10B981';
            symbol = '✓ ';
        }
        if (idx === q.userAnswer && idx !== q.correctAnswer) {
            bgColor = '#FEF2F2';
            borderColor = '#EF4444';
            symbol = '✗ ';
        }

        return `<div style="padding:5px 8px;margin:3px 0;border-radius:4px;background:${bgColor};border:1px solid ${borderColor};color:${textColor};">
                            <strong>${symbol}${prefix}.</strong> ${opt}
                        </div>`;
    }).join('')}
            </div>
            ${q.userAnswer === -1 ? '<div style="color:#F59E0B;margin-top:5px;margin-left:15px;font-size:9px;font-style:italic;">⚠ Chưa trả lời</div>' : ''}
        </div>
    `).join('');

    // Create hidden container for rendering
    const container = document.createElement('div');
    container.id = 'pdfContainer';
    container.style.cssText = 'position:fixed;left:-9999px;top:0;width:760px;background:white;font-family:Roboto,Arial,sans-serif;padding:20px;';

    container.innerHTML = `
        <div class="pdf-root" style="max-width:760px;">
            <div class="pdf-block pdf-header" style="margin-bottom:14px;">
                <div style="text-align:center;margin-bottom:14px;">
                    <h1 style="color:#0D9488;font-size:22px;margin:0 0 8px 0;">KẾT QUẢ BÀI THI TRẮC NGHIỆM</h1>
                    <div style="height:2px;background:linear-gradient(90deg, #0D9488, #5EEAD4, #0D9488);"></div>
                </div>
                <table style="width:100%;border-collapse:collapse;margin-bottom:12px;font-size:11px;">
                    <tr>
                        <td style="padding:4px 0;width:25%;"><strong>Họ và tên:</strong></td>
                        <td style="padding:4px 0;width:25%;">${state.user.fullName}</td>
                        <td style="padding:4px 0;width:25%;"><strong>Đơn vị:</strong></td>
                        <td style="padding:4px 0;width:25%;">${state.user.department}</td>
                    </tr>
                    <tr>
                        <td style="padding:4px 0;"><strong>Chữ ký thí sinh:</strong></td>
                        <td style="padding:4px 0;border-bottom:1px dotted #999;min-height:30px;"></td>
                        <td style="padding:4px 0;"><strong>Ngày thi:</strong></td>
                        <td style="padding:4px 0;">${formatDateTime(state.startTime)}</td>
                    </tr>
                    <tr>
                        <td style="padding:4px 0;"><strong>Thời gian:</strong></td>
                        <td style="padding:4px 0;">${calculateDuration()}</td>
                        <td style="padding:4px 0;"><strong>Lần thi:</strong></td>
                        <td style="padding:4px 0;">Lần ${state.user.attemptNumber}</td>
                    </tr>
                </table>
                <div style="padding:12px;background:${isPassed ? '#ECFDF5' : '#FEF2F2'};border-radius:8px;">
                    <table style="width:100%;font-size:11px;">
                        <tr>
                            <td style="text-align:center;width:33%;">
                                <div style="font-size:28px;font-weight:bold;color:${isPassed ? '#10B981' : '#EF4444'};">${correctAnswers}/${totalQuestions}</div>
                                <div style="font-size:10px;color:#475569;">Điểm số</div>
                            </td>
                            <td style="text-align:center;width:34%;">
                                <div style="font-size:14px;font-weight:bold;color:#10B981;">✓ ${correctAnswers} đúng</div>
                                <div style="font-size:14px;font-weight:bold;color:#EF4444;margin-top:3px;">✗ ${totalQuestions - correctAnswers} sai</div>
                            </td>
                            <td style="text-align:center;width:33%;">
                                <div style="font-size:18px;font-weight:bold;color:${isPassed ? '#10B981' : '#EF4444'};">
                                    ${isPassed ? 'ĐẠT' : 'KHÔNG ĐẠT'}
                                </div>
                                <div style="font-size:10px;color:#475569;">Chuẩn: 27/${totalQuestions}</div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="pdf-block pdf-section-title" style="margin:10px 0 6px 0;">
                <h2 style="color:#0D9488;font-size:14px;border-bottom:2px solid #0D9488;padding-bottom:5px;margin:0;">
                    CHI TIẾT CÂU TRẢ LỜI
                </h2>
            </div>

            <div class="pdf-questions">
                ${questionsHtml}
            </div>

            <div class="pdf-block pdf-footer" style="margin-top:12px;text-align:center;padding-top:8px;border-top:1px solid #E2E8F0;font-size:9px;color:#94A3B8;">
                <div>Hệ thống thi trắc nghiệm DAHC</div>
                <div style="margin-top:3px;">${footerNote}: ${formatDateTime(new Date())}</div>
            </div>
        </div>
    `;

    document.body.appendChild(container);

    // Wait for fonts and rendering
    await document.fonts.ready;
    await new Promise(resolve => setTimeout(resolve, 300));

    const doc = new jsPDF('p', 'mm', 'a4', true);
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pageWidth - margin * 2;
    let cursorY = margin;

    const blocks = Array.from(container.querySelectorAll('.pdf-block'));

    for (const block of blocks) {
        const canvas = await html2canvas(block, {
            scale: 3, // Tăng từ 2 lên 3 để sắc nét hơn
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: 760,
            imageTimeout: 0,
            removeContainer: true
        });
        const imgHeight = (canvas.height * contentWidth) / canvas.width;

        if (cursorY + imgHeight > pageHeight - margin) {
            doc.addPage();
            cursorY = margin;
        }

        const imgData = canvas.toDataURL('image/jpeg', 0.89); // Quality 89% - Cân bằng giữa chất lượng và dung lượng
        doc.addImage(imgData, 'JPEG', margin, cursorY, contentWidth, imgHeight, undefined, 'SLOW'); // Dùng SLOW thay vì FAST
        cursorY += imgHeight + 2;
    }

    document.body.removeChild(container);

    // Tạo tên file: KetQua_TenKhongDau_DonVi_LanX_NgayGio.pdf
    const nameSafe = removeVietnameseTones(state.user.fullName).replace(/\s+/g, '_');
    const deptSafe = removeVietnameseTones(state.user.department || '').replace(/\s+/g, '');
    const fileName = `KetQua_${nameSafe}_${deptSafe}_L${state.user.attemptNumber}_${formatDateFile(new Date())}.pdf`;

    return { doc, fileName };
}

// ===== Auto Save PDF to Cache (không download, chỉ lưu vào IndexedDB) =====
async function autoSavePDFToCache(examResult = null) {
    console.log('📄 Đang tự động tạo PDF để lưu cache...');

    try {
        const { doc, fileName } = await _generatePDFDoc('Tự động lưu');

        // Lưu PDF vào IndexedDB (KHÔNG download)
        const pdfBase64 = doc.output('datauristring').split(',')[1];
        const examId = Date.now();
        const savedToCache = await savePDFToCache(examId, fileName, pdfBase64);

        if (savedToCache) {
            console.log('✅ Đã tự động lưu PDF vào cache:', fileName);
        }

        // Lưu vào file hệ thống (pdf_primary + pdf_backup)
        let savedToFixed = null;
        if (isElectronRuntime() && examResult && typeof window.electronAPI.saveExamArtifacts === 'function') {
            savedToFixed = await window.electronAPI.saveExamArtifacts({
                examResult,
                fileName,
                pdfBase64
            });
            if (!savedToFixed?.success) {
                console.error('❌ Lỗi lưu dữ liệu cố định:', savedToFixed?.error || 'unknown');
            } else {
                console.log('✅ Đã lưu PDF vào:', savedToFixed.paths);
                // Lưu đường dẫn để dùng khi mở thư mục
                state.lastSavedPdfPath = savedToFixed.paths?.pdfPrimaryPath || null;
            }
        }

        return {
            savedToCache,
            savedToFixed,
            fileName,
            examId
        };
    } catch (error) {
        console.error('❌ Lỗi tự động tạo PDF:', error);
        return null;
    }
}

// ===== PDF Export (download về máy + lưu backup) =====
async function exportToPDF() {
    // Show loading
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'pdfLoading';
    loadingDiv.innerHTML = `
        <div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;">
            <div style="background:white;padding:30px 50px;border-radius:10px;text-align:center;">
                <div style="font-size:40px;margin-bottom:15px;">📄</div>
                <div style="font-size:18px;color:#1E293B;">Đang tạo PDF...</div>
                <div style="font-size:14px;color:#475569;margin-top:10px;">Vui lòng đợi...</div>
            </div>
        </div>
    `;
    document.body.appendChild(loadingDiv);

    try {
        const { doc, fileName } = await _generatePDFDoc('Ngày tạo');

        // Lưu vào cache (IndexedDB) để xem lại trong History
        const pdfBase64 = doc.output('datauristring').split(',')[1];
        const examId = Date.now();
        const savedToCache = await savePDFToCache(examId, fileName, pdfBase64);
        state.lastExamId = examId;

        // Download về máy (file chính)
        doc.save(fileName);

        // Lưu bản dự phòng vào pdf_backup (Electron only)
        if (isElectronRuntime() && typeof window.electronAPI.saveExamArtifacts === 'function') {
            const examResult = buildExamResultFromCurrentState(false);
            const backupResult = await window.electronAPI.saveExamArtifacts({
                examResult,
                fileName,
                pdfBase64
            });
            if (backupResult?.success) {
                console.log('✅ Đã lưu bản dự phòng vào pdf_backup:', backupResult.paths?.pdfBackupPath);
            } else {
                console.error('❌ Lỗi lưu backup:', backupResult?.error);
            }
        }

        // Hiển thị thông báo thành công
        showPDFSuccessNotification(fileName, savedToCache);

        // Hiển thị nút mở thư mục nếu là Electron
        if (isElectronRuntime()) {
            togglePostExportButtons(true);
        }

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Đã xảy ra lỗi khi tạo PDF. Vui lòng thử lại.');
    } finally {
        // Remove loading
        const loading = document.getElementById('pdfLoading');
        if (loading) loading.remove();
    }
}

function togglePostExportButtons(show) {
    if (elements.btnOpenPdfFolder) {
        elements.btnOpenPdfFolder.style.display = show ? 'inline-flex' : 'none';
    }
    if (elements.btnGoHome) {
        elements.btnGoHome.style.display = show ? 'inline-flex' : 'none';
    }
}

async function openSavedPDFFolder() {
    if (!isElectronRuntime() || typeof window.electronAPI.openPDFFolder !== 'function') {
        alert('Tính năng này chỉ khả dụng trên ứng dụng Electron.');
        return;
    }

    try {
        const result = await window.electronAPI.openPDFFolder();
        if (!result.success) {
            alert('Không thể mở thư mục PDF: ' + (result.error || 'Lỗi không xác định'));
        }
    } catch (error) {
        console.error('Error opening PDF folder:', error);
        alert('Đã xảy ra lỗi khi mở thư mục PDF.');
    }
}

function goHomeFromResult() {
    handleRetry();
}



// Hiển thị thông báo PDF đã được lưu thành công
function showPDFSuccessNotification(fileName, savedToCache = false) {
    const cacheMessage = savedToCache
        ? '<div style="font-size:10px;opacity:0.75;margin-top:3px;">💾 Đã lưu bản dự phòng</div>'
        : '';
    const locationText = isElectronRuntime()
        ? '📂 Đã lưu vào thư mục ứng dụng'
        : '📂 Đã tải về Downloads';

    const successDiv = document.createElement('div');
    successDiv.id = 'pdfSuccessNotification';
    successDiv.innerHTML = `
        <div style="position:fixed;bottom:20px;right:20px;background:#10B981;color:white;padding:14px 18px;border-radius:12px;box-shadow:0 4px 16px rgba(16,185,129,0.25);z-index:9999;max-width:340px;">
            <div style="display:flex;align-items:flex-start;gap:10px;">
                <span style="font-size:20px;line-height:1;">✅</span>
                <div style="flex:1;">
                    <div style="font-weight:600;font-size:13px;">Đã lưu kết quả!</div>
                    <div style="font-size:11px;opacity:0.85;margin-top:3px;">${locationText}</div>
                    <div style="font-size:10px;opacity:0.65;margin-top:2px;word-break:break-all;">${fileName}</div>
                    ${cacheMessage}
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(successDiv);

    // Tự động ẩn sau 6 giây
    setTimeout(() => {
        const notification = document.getElementById('pdfSuccessNotification');
        if (notification) {
            notification.style.transition = 'opacity 0.5s';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }
    }, 6000);
}

// ===== Utility Functions =====
function switchScreen(screen) {
    elements.loginScreen.classList.remove('active');
    elements.quizScreen.classList.remove('active');
    elements.resultScreen.classList.remove('active');

    if (screen === 'login') elements.loginScreen.classList.add('active');
    if (screen === 'quiz') elements.quizScreen.classList.add('active');
    if (screen === 'result') elements.resultScreen.classList.add('active');
}

function formatDate(date) {
    return date.toLocaleDateString('vi-VN');
}

function formatDateTime(date) {
    return date.toLocaleString('vi-VN');
}

function formatDateDisplay(dateStr) {
    if (!dateStr) return 'N/A';
    try {
        // Xử lý format dd/mm/yyyy
        if (dateStr.includes('/')) {
            const parts = dateStr.split('/');
            if (parts.length === 3) {
                return dateStr; // Đã đúng format dd/mm/yyyy
            }
        }
        // Xử lý format yyyy-mm-dd
        if (dateStr.includes('-')) {
            const parts = dateStr.split('-');
            if (parts.length === 3) {
                return `${parts[2]}/${parts[1]}/${parts[0]}`;
            }
        }
        // Fallback
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('vi-VN');
    } catch (e) {
        return dateStr;
    }
}

function formatDateFile(date) {
    return date.toISOString().split('T')[0].replace(/-/g, '');
}

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

function handleRetry() {
    stopAutoSave();
    clearSession();

    // Reset state
    state.questions = [];
    state.currentIndex = 0;
    state.answers = {};
    state.questionStatus = {};
    state.lastSavedPdfPath = null;
    state.timer.remaining = state.timer.duration;
    state.startTime = null;
    state.endTime = null;

    // Clear timer display classes
    elements.timer.classList.remove('warning', 'danger');

    // Switch to login
    switchScreen('login');
    togglePostExportButtons(false);
}

// ===== Confirmation Modal =====
function showConfirmModal(icon, title, message, onConfirm) {
    closeModal();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.id = 'confirmModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icon">${icon}</div>
            <h2 class="modal-title">${title}</h2>
            <p class="modal-text">${message}</p>
            <div class="modal-buttons">
                <button class="modal-btn cancel" type="button" data-confirm-action="cancel">Hủy</button>
                <button class="modal-btn confirm" type="button" data-confirm-action="confirm">Xác nhận</button>
            </div>
        </div>
    `;

    window.confirmCallback = onConfirm;
    modal.querySelector('[data-confirm-action="cancel"]').addEventListener('click', closeModal);
    modal.querySelector('[data-confirm-action="confirm"]').addEventListener('click', confirmAction);
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.getElementById('confirmModal');
    if (modal) {
        modal.remove();
    }
    window.confirmCallback = null;
}

function confirmAction() {
    if (window.confirmCallback) {
        window.confirmCallback();
    }
    closeModal();
}

// Make functions globally accessible
window.selectOption = selectOption;
window.toggleFlag = toggleFlag;
window.goToQuestion = goToQuestion;
window.closeModal = closeModal;
window.confirmAction = confirmAction;
window.continueSession = continueSession;
window.discardSession = discardSession;


function normalizeKeyPart(value) {
    const cleaned = String(value || '').trim().toLowerCase();
    return encodeURIComponent(cleaned).replace(/%20/g, '-');
}

function getDeviceId() {
    const existing = localStorage.getItem(DEVICE_ID_KEY);
    if (existing) return existing;
    const newId = 'device-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    localStorage.setItem(DEVICE_ID_KEY, newId);
    return newId;
}

function getHistoryStorageKey(fullName, password) {
    const deviceId = getDeviceId();
    const nameKey = normalizeKeyPart(fullName);
    const passKey = normalizeKeyPart(password);
    if (nameKey && passKey) {
        return `${EXAM_HISTORY_KEY}::${deviceId}::${nameKey}::${passKey}`;
    }
    return `${EXAM_HISTORY_KEY}::${deviceId}`;
}
