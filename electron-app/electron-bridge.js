(function () {
    'use strict';

    if (!window.electronAPI || !window.electronAPI.isElectron) {
        return;
    }

    async function backupHistoryToFile() {
        try {
            if (typeof getExamHistory !== 'function') return;
            const history = getExamHistory();
            if (history && history.length > 0) {
                await window.electronAPI.backupData('exam_history', history);
            }
        } catch (error) {
            console.warn('History backup failed:', error);
        }
    }

    async function backupSessionToFile() {
        try {
            const sessionJson = localStorage.getItem('exam_session');
            if (!sessionJson) return;
            await window.electronAPI.backupData('exam_session', JSON.parse(sessionJson));
        } catch (error) {
            console.warn('Session backup failed:', error);
        }
    }

    async function restoreHistoryIfNeeded() {
        try {
            if (typeof getExamHistory !== 'function') return;
            const history = getExamHistory();
            if (history && history.length > 0) return;
            const backup = await window.electronAPI.restoreData('exam_history');
            if (backup.success && Array.isArray(backup.data) && backup.data.length > 0) {
                localStorage.setItem('exam_history', JSON.stringify(backup.data));
            }
        } catch (error) {
            console.warn('History restore failed:', error);
        }
    }

    async function restoreSessionIfNeeded() {
        try {
            const localSession = localStorage.getItem('exam_session');
            if (localSession) return;
            const backup = await window.electronAPI.restoreData('exam_session');
            if (backup.success && backup.data && backup.data.questions) {
                localStorage.setItem('exam_session', JSON.stringify(backup.data));
            }
        } catch (error) {
            console.warn('Session restore failed:', error);
        }
    }

    function hookPersistenceFunctions() {
        if (typeof window.saveExamToHistory === 'function') {
            const originalSaveExamToHistory = window.saveExamToHistory;
            window.saveExamToHistory = function saveExamToHistoryWithBackup(examResult) {
                const result = originalSaveExamToHistory.call(this, examResult);
                backupHistoryToFile();
                return result;
            };
        }

        if (typeof window.saveSession === 'function') {
            const originalSaveSession = window.saveSession;
            window.saveSession = function saveSessionWithBackup() {
                const result = originalSaveSession.call(this);
                backupSessionToFile();
                return result;
            };
        }

        if (typeof window.clearSession === 'function') {
            const originalClearSession = window.clearSession;
            window.clearSession = function clearSessionWithBackup() {
                const result = originalClearSession.call(this);
                window.electronAPI.backupData('exam_session', null).catch(() => {});
                return result;
            };
        }
    }

    function setupStayInExamNotification() {
        if (typeof window.electronAPI.onForceStayInExam !== 'function') return;
        window.electronAPI.onForceStayInExam(() => {
            if (typeof showToast === 'function') {
                showToast('Dang trong thoi gian thi, khong the thoat ung dung.');
            } else {
                alert('Dang trong thoi gian thi, khong the thoat ung dung.');
            }
        });
    }

    restoreHistoryIfNeeded();
    restoreSessionIfNeeded();
    hookPersistenceFunctions();
    setupStayInExamNotification();

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
})();
