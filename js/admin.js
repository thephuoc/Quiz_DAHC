/**
 * Admin Settings Module
 * Quản lý cài đặt bài thi
 */

// ===== Quiz Settings =====
const ADMIN_PASSWORD = 'DAHC@6789';
const ADMIN_AUTH_SESSION_KEY = 'quiz_admin_authenticated';
const ADMIN_AUTH_ATTEMPTS_SESSION_KEY = 'quiz_admin_auth_attempts';
const MAX_ADMIN_PASSWORD_ATTEMPTS = 3;

const defaultSettings = {
    categories: {
        PCCC: 4,
        QT_ATD: 7,
        ATD: 7,
        TBA: 6,
        NMD: 6
    },
    totalQuestions: 30,
    durationMinutes: 30
};

function loadSettings() {
    try {
        const saved = localStorage.getItem('quizSettings');
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error loading settings:', e);
    }
    return JSON.parse(JSON.stringify(defaultSettings));
}

function saveSettingsToStorage(settings) {
    localStorage.setItem('quizSettings', JSON.stringify(settings));
}

let quizSettings = loadSettings();

function isAdminAuthenticated() {
    try {
        return sessionStorage.getItem(ADMIN_AUTH_SESSION_KEY) === 'true';
    } catch (e) {
        console.warn('Unable to read admin auth session:', e);
        return false;
    }
}

function setAdminAuthenticated(value) {
    try {
        if (value) {
            sessionStorage.setItem(ADMIN_AUTH_SESSION_KEY, 'true');
        } else {
            sessionStorage.removeItem(ADMIN_AUTH_SESSION_KEY);
        }
    } catch (e) {
        console.warn('Unable to update admin auth session:', e);
    }
}

function getAdminAuthAttempts() {
    try {
        return parseInt(sessionStorage.getItem(ADMIN_AUTH_ATTEMPTS_SESSION_KEY) || '0', 10);
    } catch (e) {
        console.warn('Unable to read admin auth attempts:', e);
        return 0;
    }
}

function setAdminAuthAttempts(value) {
    try {
        sessionStorage.setItem(ADMIN_AUTH_ATTEMPTS_SESSION_KEY, String(Math.max(0, value)));
    } catch (e) {
        console.warn('Unable to update admin auth attempts:', e);
    }
}

function resetAdminAuthAttempts() {
    setAdminAuthAttempts(0);
}

function getRemainingAdminAttempts() {
    return Math.max(0, MAX_ADMIN_PASSWORD_ATTEMPTS - getAdminAuthAttempts());
}

function updateAdminPasswordControls() {
    const passwordInput = document.getElementById('adminPassword');
    const verifyButton = document.getElementById('btnVerifyPassword');
    const isLocked = !isAdminAuthenticated() && getRemainingAdminAttempts() <= 0;

    if (passwordInput) {
        passwordInput.disabled = isLocked;
    }
    if (verifyButton) {
        verifyButton.disabled = isLocked;
    }
}

// ===== Admin Modal Functions =====
function openAdminModal() {
    const modal = document.getElementById('adminSettingsModal');
    const passwordSection = document.getElementById('adminPasswordSection');
    const settingsSection = document.getElementById('adminSettingsSection');
    const passwordInput = document.getElementById('adminPassword');

    passwordInput.value = '';

    if (isAdminAuthenticated()) {
        resetAdminAuthAttempts();
        passwordSection.style.display = 'none';
        settingsSection.style.display = 'block';
        loadSettingsToForm();
    } else {
        passwordSection.style.display = 'block';
        settingsSection.style.display = 'none';
        updateAdminPasswordControls();
        if (!passwordInput.disabled) {
            passwordInput.focus();
        }
    }

    modal.classList.add('active');
}

function closeAdminModal() {
    const modal = document.getElementById('adminSettingsModal');
    modal.classList.remove('active');
}

function verifyAdminPassword() {
    const passwordInput = document.getElementById('adminPassword');
    const passwordSection = document.getElementById('adminPasswordSection');
    const settingsSection = document.getElementById('adminSettingsSection');

    if (getRemainingAdminAttempts() <= 0) {
        updateAdminPasswordControls();
        alert('❌ Bạn đã nhập sai quá 3 lần. Vui lòng đóng và mở lại phiên làm việc để thử lại.');
        return;
    }

    if (passwordInput.value === ADMIN_PASSWORD) {
        setAdminAuthenticated(true);
        resetAdminAuthAttempts();
        passwordSection.style.display = 'none';
        settingsSection.style.display = 'block';
        loadSettingsToForm();
        return;
    }

    const nextAttempts = getAdminAuthAttempts() + 1;
    setAdminAuthAttempts(nextAttempts);
    passwordInput.value = '';
    updateAdminPasswordControls();

    const remaining = getRemainingAdminAttempts();
    if (remaining > 0) {
        alert(`❌ Mật khẩu không đúng! Còn ${remaining} lần thử.`);
        if (!passwordInput.disabled) {
            passwordInput.focus();
        }
        return;
    }

    alert('❌ Bạn đã nhập sai quá 3 lần. Vui lòng đóng và mở lại phiên làm việc để thử lại.');
}

function loadSettingsToForm() {
    const settings = loadSettings();

    document.getElementById('settingPCCC').value = settings.categories.PCCC || 4;
    document.getElementById('settingQT_ATD').value = settings.categories.QT_ATD || 7;
    document.getElementById('settingATD').value = settings.categories.ATD || 7;
    document.getElementById('settingTBA').value = settings.categories.TBA || 6;
    document.getElementById('settingNMD').value = settings.categories.NMD || 6;
    document.getElementById('settingTotalQuestions').value = settings.totalQuestions || 30;
    document.getElementById('settingDuration').value = settings.durationMinutes || 20;

    // Update available counts from CATEGORIES_INFO if available
    if (typeof CATEGORIES_INFO !== 'undefined') {
        const cats = ['PCCC', 'QT_ATD', 'ATD', 'TBA', 'NMD'];
        cats.forEach(cat => {
            const el = document.getElementById('available' + cat);
            if (el && CATEGORIES_INFO[cat]) {
                el.textContent = '/' + CATEGORIES_INFO[cat];
            }
        });
    }
}

function saveAdminSettings() {
    const settings = {
        categories: {
            PCCC: parseInt(document.getElementById('settingPCCC').value) || 0,
            QT_ATD: parseInt(document.getElementById('settingQT_ATD').value) || 0,
            ATD: parseInt(document.getElementById('settingATD').value) || 0,
            TBA: parseInt(document.getElementById('settingTBA').value) || 0,
            NMD: parseInt(document.getElementById('settingNMD').value) || 0
        },
        totalQuestions: parseInt(document.getElementById('settingTotalQuestions').value) || 30,
        durationMinutes: parseInt(document.getElementById('settingDuration').value) || 20
    };

    saveSettingsToStorage(settings);
    quizSettings = settings;

    alert('✅ Đã lưu cài đặt thành công!');
    closeAdminModal();
}

// ===== Excel Import Functions =====
async function importCandidatesFromExcel() {
    if (!window.electronAPI || !window.electronAPI.importCandidatesExcel) {
        alert('❌ Chức năng này chỉ khả dụng trong ứng dụng desktop.');
        return;
    }

    const btn = document.getElementById('btnImportCandidates');
    const status = document.getElementById('importCandidatesStatus');
    const originalText = btn.textContent;
    btn.textContent = '⏳ Đang xử lý...';
    btn.disabled = true;
    status.textContent = '';
    status.className = 'import-status';

    try {
        const result = await window.electronAPI.importCandidatesExcel();
        if (result.canceled) {
            status.textContent = '';
        } else if (result.success) {
            status.textContent = `✅ Đã nạp ${result.count} thí sinh`;
            status.classList.add('success');
            setTimeout(() => {
                if (confirm(`Đã nạp ${result.count} thí sinh thành công!\nTải lại trang để áp dụng?`)) {
                    location.reload();
                }
            }, 300);
        } else {
            status.textContent = `❌ ${result.error}`;
            status.classList.add('error');
        }
    } catch (error) {
        status.textContent = `❌ Lỗi: ${error.message}`;
        status.classList.add('error');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

async function importQuestionsFromExcel() {
    if (!window.electronAPI || !window.electronAPI.importQuestionsExcel) {
        alert('❌ Chức năng này chỉ khả dụng trong ứng dụng desktop.');
        return;
    }

    const btn = document.getElementById('btnImportQuestions');
    const status = document.getElementById('importQuestionsStatus');
    const originalText = btn.textContent;
    btn.textContent = '⏳ Đang xử lý...';
    btn.disabled = true;
    status.textContent = '';
    status.className = 'import-status';

    try {
        const result = await window.electronAPI.importQuestionsExcel();
        if (result.canceled) {
            status.textContent = '';
        } else if (result.success) {
            const catInfo = Object.entries(result.categoriesInfo || {})
                .map(([cat, count]) => `${cat}: ${count}`)
                .join(', ');
            status.textContent = `✅ ${result.totalQuestions} câu hỏi (${catInfo})`;
            status.classList.add('success');
            setTimeout(() => {
                if (confirm(`Đã nạp ${result.totalQuestions} câu hỏi thành công!\n${catInfo}\nTải lại trang để áp dụng?`)) {
                    location.reload();
                }
            }, 300);
        } else {
            status.textContent = `❌ ${result.error}`;
            status.classList.add('error');
        }
    } catch (error) {
        status.textContent = `❌ Lỗi: ${error.message}`;
        status.classList.add('error');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

// ===== Reset Exam History =====
function resetExamHistory() {
    const status = document.getElementById('resetHistoryStatus');

    const historyKeys = (() => {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key === 'exam_history' || (key && key.startsWith('exam_history::'))) {
                keys.push(key);
            }
        }
        return keys;
    })();

    const count = (() => {
        try {
            const legacyRaw = localStorage.getItem('exam_history');
            if (legacyRaw) return JSON.parse(legacyRaw).length || 0;
            let total = 0;
            historyKeys.forEach(key => {
                const raw = localStorage.getItem(key);
                if (raw) total += (JSON.parse(raw).length || 0);
            });
            return total;
        } catch {
            return 0;
        }
    })();

    if (count === 0) {
        status.textContent = '(Không có lịch sử)';
        status.className = 'import-status';
        return;
    }

    if (!confirm(`Xóa lịch sử ${count} lần thi?\nSố lần thi (L1, L2...) và Anti-Repetition sẽ được reset về ban đầu.`)) return;

    // Xóa lịch sử thi (legacy + per-user/device)
    historyKeys.forEach(key => localStorage.removeItem(key));

    // Xóa tất cả bộ đếm số lần thi (key: exam_attempts_TenThiSinh_MatKhau)
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('exam_attempts_')) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));

    status.textContent = `✅ Đã xóa ${count} lần thi + reset số lần (L1)`;
    status.className = 'import-status success';
    setTimeout(() => { status.textContent = ''; }, 5000);
}

// ===== Setup Admin Event Listeners =====
function setupAdminEventListeners() {
    const btnAdminSettings = document.getElementById('btnAdminSettings');
    const closeAdminModalBtn = document.getElementById('closeAdminModal');
    const btnVerifyPassword = document.getElementById('btnVerifyPassword');
    const btnCancelSettings = document.getElementById('btnCancelSettings');
    const btnSaveSettings = document.getElementById('btnSaveSettings');
    const adminPassword = document.getElementById('adminPassword');

    if (btnAdminSettings) {
        btnAdminSettings.addEventListener('click', openAdminModal);
    }

    if (closeAdminModalBtn) {
        closeAdminModalBtn.addEventListener('click', closeAdminModal);
    }

    if (btnVerifyPassword) {
        btnVerifyPassword.addEventListener('click', verifyAdminPassword);
    }

    if (adminPassword) {
        adminPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                verifyAdminPassword();
            }
        });
    }

    if (btnCancelSettings) {
        btnCancelSettings.addEventListener('click', closeAdminModal);
    }

    if (btnSaveSettings) {
        btnSaveSettings.addEventListener('click', saveAdminSettings);
    }

    // Import Excel buttons
    const btnImportCandidates = document.getElementById('btnImportCandidates');
    const btnImportQuestions = document.getElementById('btnImportQuestions');

    if (btnImportCandidates) {
        btnImportCandidates.addEventListener('click', importCandidatesFromExcel);
    }

    if (btnImportQuestions) {
        btnImportQuestions.addEventListener('click', importQuestionsFromExcel);
    }

    const btnResetHistory = document.getElementById('btnResetHistory');
    if (btnResetHistory) {
        btnResetHistory.addEventListener('click', resetExamHistory);
    }

    // Hide import section if not in Electron
    const importSection = document.getElementById('importSection');
    if (importSection && (!window.electronAPI || !window.electronAPI.isElectron)) {
        importSection.style.display = 'none';
        // Also hide the h3 before it
        const prevH3 = importSection.previousElementSibling;
        if (prevH3 && prevH3.tagName === 'H3' && prevH3.textContent.includes('Nạp dữ liệu')) {
            prevH3.style.display = 'none';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', setupAdminEventListeners);

