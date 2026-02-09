/**
 * Admin Settings Module
 * Quản lý cài đặt bài thi
 */

// ===== Quiz Settings =====
const ADMIN_PASSWORD = 'DAHC@6789';

const defaultSettings = {
    categories: {
        PCCC: 4,
        QT_ATD: 7,
        ATD: 7,
        TBA: 6,
        NMD: 6
    },
    totalQuestions: 30,
    durationMinutes: 20
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

// ===== Admin Modal Functions =====
function openAdminModal() {
    const modal = document.getElementById('adminSettingsModal');
    const passwordSection = document.getElementById('adminPasswordSection');
    const settingsSection = document.getElementById('adminSettingsSection');
    const passwordInput = document.getElementById('adminPassword');

    // Reset to password view
    passwordSection.style.display = 'block';
    settingsSection.style.display = 'none';
    passwordInput.value = '';

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

    if (passwordInput.value === ADMIN_PASSWORD) {
        passwordSection.style.display = 'none';
        settingsSection.style.display = 'block';
        loadSettingsToForm();
    } else {
        alert('❌ Mật khẩu không đúng!');
        passwordInput.value = '';
        passwordInput.focus();
    }
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
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', setupAdminEventListeners);
