// -*- coding: utf-8 -*-
/**
 * Quiz DAHC - Electron Preload Script
 * Bridge giữa Electron (Node.js) và Web (Renderer)
 * 
 * contextBridge đảm bảo:
 *  - Web app KHÔNG truy cập được Node.js APIs trực tiếp
 *  - Chỉ các API được expose ở đây mới khả dụng
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Đánh dấu đây là Electron app
    isElectron: true,

    // Lưu PDF với dialog chọn thư mục
    savePDF: (pdfData, defaultFileName) => {
        return ipcRenderer.invoke('save-pdf', pdfData, defaultFileName);
    },

    // Lấy đường dẫn hệ thống
    getAppPath: () => {
        return ipcRenderer.invoke('get-app-path');
    },

    // Backup/Restore dữ liệu (lưu file JSON trong AppData)
    backupData: (key, data) => {
        return ipcRenderer.invoke('backup-data', key, data);
    },

    restoreData: (key) => {
        return ipcRenderer.invoke('restore-data', key);
    },

    // Lấy thông tin app
    getAppInfo: () => {
        return ipcRenderer.invoke('get-app-info');
    },

    setExamState: (state) => {
        return ipcRenderer.invoke('set-exam-state', state);
    },

    getExamState: () => {
        return ipcRenderer.invoke('get-exam-state');
    },

    saveExamArtifacts: (payload) => {
        return ipcRenderer.invoke('save-exam-artifacts', payload);
    },

    getStoragePaths: () => {
        return ipcRenderer.invoke('get-storage-paths');
    },

    getSecurityConfig: () => {
        return ipcRenderer.invoke('get-security-config');
    },

    openPDFFolder: () => {
        return ipcRenderer.invoke('open-pdf-folder');
    },

    openFolder: (folderPath) => {
        return ipcRenderer.invoke('open-folder', folderPath);
    },

    backupDataToRoot: () => {
        return ipcRenderer.invoke('backup-data-to-root');
    },

    // Import Excel
    importCandidatesExcel: () => {
        return ipcRenderer.invoke('import-candidates-excel');
    },

    importQuestionsExcel: () => {
        return ipcRenderer.invoke('import-questions-excel');
    },

    onForceStayInExam: (callback) => {
        if (typeof callback !== 'function') return () => { };
        const wrapped = () => callback();
        ipcRenderer.on('force-stay-in-exam', wrapped);
        return () => ipcRenderer.removeListener('force-stay-in-exam', wrapped);
    },
});
