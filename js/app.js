/**
 * Quiz Application Main Logic
 * Hệ thống thi trắc nghiệm - DAHC
 */

// ===== Global State =====
const state = {
    user: {
        fullName: '',
        birthDate: '',
        department: '',
        attemptNumber: 1
    },
    questions: [],
    currentIndex: 0,
    answers: {},          // { questionId: selectedOptionIndex }
    questionStatus: {},   // { questionId: 'not-visited' | 'visited' | 'answered' | 'flagged' }
    timer: {
        duration: 20 * 60, // 20 minutes in seconds
        remaining: 20 * 60,
        interval: null
    },
    startTime: null,
    endTime: null
};

// ===== Exam Attempt Counter =====
function getAttemptCount(fullName, birthDate) {
    const key = `exam_attempts_${fullName}_${birthDate}`;
    return parseInt(localStorage.getItem(key) || '0');
}

function incrementAttemptCount(fullName, birthDate) {
    const key = `exam_attempts_${fullName}_${birthDate}`;
    const count = getAttemptCount(fullName, birthDate) + 1;
    localStorage.setItem(key, count.toString());
    return count;
}

// ===== Exam History Management =====
const EXAM_HISTORY_KEY = 'exam_history';
const PDF_CACHE_KEY = 'pdf_cache';
const SESSION_KEY = 'exam_session'; // Lưu trạng thái bài thi hiện tại
const MAX_HISTORY_ITEMS = 100; // Giữ tối đa 100 kết quả
const MAX_PDF_CACHE = 10; // Giữ tối đa 10 PDF gần nhất (do giới hạn dung lượng LocalStorage ~5MB)
const AUTO_SAVE_INTERVAL = 30000; // Tự động lưu mỗi 30 giây

let autoSaveTimer = null;

function saveExamToHistory(examResult) {
    try {
        let history = getExamHistory();

        // Thêm kết quả mới vào đầu danh sách
        history.unshift(examResult);

        // Giới hạn số lượng lịch sử
        if (history.length > MAX_HISTORY_ITEMS) {
            history = history.slice(0, MAX_HISTORY_ITEMS);
        }

        localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(history));
        console.log('✅ Đã lưu kết quả thi vào lịch sử');
        return true;
    } catch (error) {
        console.error('❌ Lỗi lưu lịch sử thi:', error);
        return false;
    }
}

function getExamHistory() {
    try {
        const historyJson = localStorage.getItem(EXAM_HISTORY_KEY);
        return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
        console.error('❌ Lỗi đọc lịch sử thi:', error);
        return [];
    }
}

function getExamHistoryByUser(fullName, birthDate) {
    const history = getExamHistory();
    return history.filter(exam =>
        exam.user.fullName === fullName &&
        exam.user.birthDate === birthDate
    );
}

function clearExamHistory() {
    localStorage.removeItem(EXAM_HISTORY_KEY);
    console.log('🗑️ Đã xóa toàn bộ lịch sử thi');
}

function buildExamResult(correctAnswers, totalQuestions, isPassed, timeUp = false) {
    return {
        id: Date.now(), // Unique ID
        user: {
            fullName: state.user.fullName,
            birthDate: state.user.birthDate,
            department: state.user.department,
            attemptNumber: state.user.attemptNumber
        },
        exam: {
            startTime: state.startTime ? state.startTime.toISOString() : null,
            endTime: state.endTime ? state.endTime.toISOString() : null,
            duration: calculateDuration(),
            timeUp: timeUp
        },
        result: {
            correctAnswers: correctAnswers,
            totalQuestions: totalQuestions,
            wrongAnswers: totalQuestions - correctAnswers,
            isPassed: isPassed,
            score: Math.round((correctAnswers / totalQuestions) * 100)
        },
        answers: { ...state.answers },
        questions: state.questions.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correct: q.correct,
            userAnswer: state.answers[q.id],
            category: q.category
        })),
        savedAt: new Date().toISOString()
    };
}

// ===== PDF Cache Management =====
function savePDFToCache(examId, fileName, pdfBase64) {
    try {
        let cache = getPDFCache();

        // Thêm PDF mới vào đầu
        cache.unshift({
            examId: examId,
            fileName: fileName,
            pdfData: pdfBase64,
            savedAt: new Date().toISOString()
        });

        // Giới hạn số lượng PDF lưu trữ
        if (cache.length > MAX_PDF_CACHE) {
            cache = cache.slice(0, MAX_PDF_CACHE);
        }

        localStorage.setItem(PDF_CACHE_KEY, JSON.stringify(cache));
        console.log('📄 Đã lưu PDF vào bộ nhớ tạm:', fileName);
        return true;
    } catch (error) {
        // Có thể do vượt quá dung lượng LocalStorage
        console.error('❌ Lỗi lưu PDF vào cache:', error);
        // Thử xóa bớt cache cũ và lưu lại
        try {
            let cache = getPDFCache();
            if (cache.length > 3) {
                cache = cache.slice(0, 3); // Chỉ giữ 3 PDF gần nhất
                localStorage.setItem(PDF_CACHE_KEY, JSON.stringify(cache));
                // Thử lưu lại
                return savePDFToCache(examId, fileName, pdfBase64);
            }
        } catch (e) {
            console.error('❌ Không thể lưu PDF do dung lượng LocalStorage đầy');
        }
        return false;
    }
}

function getPDFCache() {
    try {
        const cacheJson = localStorage.getItem(PDF_CACHE_KEY);
        return cacheJson ? JSON.parse(cacheJson) : [];
    } catch (error) {
        console.error('❌ Lỗi đọc PDF cache:', error);
        return [];
    }
}

function getPDFFromCache(examId) {
    const cache = getPDFCache();
    return cache.find(item => item.examId === examId);
}

function downloadPDFFromCache(examId) {
    const pdfItem = getPDFFromCache(examId);
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

function clearPDFCache() {
    localStorage.removeItem(PDF_CACHE_KEY);
    console.log('🗑️ Đã xóa toàn bộ PDF cache');
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
            savedAt: new Date().toISOString()
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
        console.log('💾 Đã tự động lưu bài thi');
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
    birthDateInput: document.getElementById('birthDate'),

    // Quiz
    examCode: document.getElementById('examCode'),
    timer: document.getElementById('timer'),
    userName: document.getElementById('userName'),
    questionContainer: document.getElementById('questionContainer'),
    questionGrid: document.getElementById('questionGrid'),
    btnPrev: document.getElementById('btnPrev'),
    btnNext: document.getElementById('btnNext'),
    btnFinish: document.getElementById('btnFinish'),
    downloadExam: document.getElementById('downloadExam'),

    // Result
    resultIcon: document.getElementById('resultIcon'),
    resultTitle: document.getElementById('resultTitle'),
    resultName: document.getElementById('resultName'),
    resultBirthDate: document.getElementById('resultBirthDate'),
    resultDepartment: document.getElementById('resultDepartment'),
    resultDate: document.getElementById('resultDate'),
    resultDuration: document.getElementById('resultDuration'),
    scoreCircle: document.getElementById('scoreCircle'),
    scoreNumber: document.getElementById('scoreNumber'),
    correctCount: document.getElementById('correctCount'),
    wrongCount: document.getElementById('wrongCount'),
    resultStatus: document.getElementById('resultStatus'),
    btnExportPDF: document.getElementById('btnExportPDF'),
    btnRetry: document.getElementById('btnRetry')
};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', init);

function init() {
    populateCandidateDropdown();
    setupEventListeners();
    setupDateInputEvents();
    setupBeforeUnloadWarning();

    // Kiểm tra có session cũ không
    checkForExistingSession();
}

function checkForExistingSession() {
    const session = loadSession();
    if (session && session.questions && session.questions.length > 0) {
        // Có session cũ - hỏi người dùng
        showSessionRecoveryDialog(session);
    }
}

function showSessionRecoveryDialog(session) {
    const minutesLeft = Math.floor(session.timerRemaining / 60);
    const answeredCount = Object.keys(session.answers).length;

    const dialogHTML = `
        <div id="sessionRecoveryModal" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:10000;">
            <div style="background:white;padding:35px;border-radius:15px;max-width:450px;width:90%;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,0.3);">
                <div style="font-size:50px;margin-bottom:15px;">⚠️</div>
                <h2 style="color:#333;margin-bottom:15px;font-size:22px;">Phát hiện bài thi chưa hoàn thành!</h2>
                <div style="background:#f5f5f5;padding:15px;border-radius:10px;margin-bottom:20px;text-align:left;">
                    <p style="margin:5px 0;color:#666;"><strong>👤 Thí sinh:</strong> ${session.user.fullName}</p>
                    <p style="margin:5px 0;color:#666;"><strong>📝 Đã làm:</strong> ${answeredCount}/${session.questions.length} câu</p>
                    <p style="margin:5px 0;color:#666;"><strong>⏱️ Còn lại:</strong> ${minutesLeft} phút</p>
                </div>
                <p style="color:#666;font-size:14px;margin-bottom:25px;">Bạn có muốn tiếp tục bài thi này không?</p>
                <div style="display:flex;gap:15px;">
                    <button onclick="discardSession()" style="flex:1;padding:15px;border:2px solid #ddd;background:white;border-radius:10px;cursor:pointer;font-size:14px;font-weight:600;color:#666;">
                        🗑️ Bắt đầu mới
                    </button>
                    <button onclick="continueSession()" style="flex:1;padding:15px;border:none;background:#4CAF50;color:white;border-radius:10px;cursor:pointer;font-size:14px;font-weight:600;">
                        ✅ Tiếp tục làm bài
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', dialogHTML);
}

function continueSession() {
    document.getElementById('sessionRecoveryModal')?.remove();

    if (restoreSession()) {
        // Chuyển sang màn hình thi
        switchScreen('quiz');
        renderQuestion();
        renderQuestionGrid();
        updateTimer();
        startTimer();
        startAutoSave();

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
    const dateInput = document.getElementById('birthDate');
    const yearDisplay = document.getElementById('birthYearDisplay');

    const selectedName = select.value;

    if (!selectedName) {
        dateInput.value = '';
        if (yearDisplay) {
            yearDisplay.textContent = '';
            yearDisplay.classList.remove('has-year');
            yearDisplay.classList.add('hidden');
        }
        return;
    }

    // Find candidate and set year
    const candidate = CANDIDATES_LIST.find(c => c.name === selectedName);
    if (candidate && candidate.birthDate) {
        // birthDate format: dd/mm/yyyy
        const parts = candidate.birthDate.split('/');
        if (parts.length === 3) {
            const year = parts[2];
            const month = parts[1];
            const day = parts[0];

            // Set date picker to candidate's year range
            dateInput.min = `${year}-01-01`;
            dateInput.max = `${year}-12-31`;

            // Show year (only visible when date input is focused)
            if (yearDisplay) {
                yearDisplay.textContent = `Năm sinh: ${year}`;
                yearDisplay.classList.add('has-year');
            }
        }
    }
}

// Setup focus/blur events for date input to show/hide year display
function setupDateInputEvents() {
    const dateInput = document.getElementById('birthDate');
    const yearDisplay = document.getElementById('birthYearDisplay');

    if (!dateInput || !yearDisplay) return;

    // Show year display when clicking/focusing on date input
    dateInput.addEventListener('focus', () => {
        if (yearDisplay.classList.contains('has-year')) {
            yearDisplay.classList.remove('hidden');
        }
    });

    // Hide year display when clicking outside
    dateInput.addEventListener('blur', () => {
        // Delay to allow any click on yearDisplay to register
        setTimeout(() => {
            yearDisplay.classList.add('hidden');
        }, 200);
    });
}

function setupEventListeners() {
    // Login form
    elements.loginForm.addEventListener('submit', handleLogin);

    // Navigation
    elements.btnPrev.addEventListener('click', () => navigateQuestion(-1));
    elements.btnNext.addEventListener('click', () => navigateQuestion(1));
    elements.btnFinish.addEventListener('click', handleFinish);

    // Result actions
    elements.btnExportPDF.addEventListener('click', exportToPDF);
    elements.btnRetry.addEventListener('click', handleRetry);

    // Download exam
    elements.downloadExam.addEventListener('click', (e) => {
        e.preventDefault();
        exportToPDF();
    });
}

// ===== Login =====
function handleLogin(e) {
    e.preventDefault();

    const fullName = elements.fullNameInput.value;
    const birthDateValue = elements.birthDateInput.value; // yyyy-mm-dd format from date picker
    const errorDiv = document.getElementById('loginError');

    // Hide previous error
    if (errorDiv) errorDiv.style.display = 'none';

    if (!fullName) {
        showLoginError('Vui lòng chọn tên của bạn!');
        return;
    }

    if (!birthDateValue) {
        showLoginError('Vui lòng chọn ngày sinh!');
        return;
    }

    // Convert date picker value (yyyy-mm-dd) to dd/mm/yyyy
    const dateParts = birthDateValue.split('-');
    const birthDateFormatted = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    // Validate against candidate list
    if (typeof validateCandidate === 'function') {
        const result = validateCandidate(fullName, birthDateFormatted);
        if (!result.valid) {
            showLoginError(result.error);
            return;
        }
        state.user.department = result.department || '';
    }

    state.user.fullName = fullName;
    state.user.birthDate = birthDateFormatted;

    // Increment and store attempt number
    state.user.attemptNumber = incrementAttemptCount(fullName, birthDateFormatted);

    startQuiz();
}

function showLoginError(message) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = '❌ ' + message;
        errorDiv.style.display = 'block';
    } else {
        alert(message);
    }
}

// ===== Quiz Logic =====
function startQuiz() {
    // Load settings and get random questions based on settings
    const settings = typeof quizSettings !== 'undefined' ? quizSettings : { totalQuestions: 30, durationMinutes: 20, categories: {} };
    const totalQuestions = settings.totalQuestions || 30;
    const durationMinutes = settings.durationMinutes || 20;

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
                        onclick="toggleFlag(${question.id})" 
                        title="Đánh dấu câu hỏi">
                    ⚑
                </button>
            </div>
            <div class="question-content">
                <p class="question-text">${question.question}</p>
                <div class="options-list">
                    ${question.options.map((option, idx) => `
                        <label class="option-item ${selectedAnswer === idx ? 'selected' : ''}" 
                               onclick="selectOption(${question.id}, ${idx})">
                            <input type="radio" 
                                   name="question_${question.id}" 
                                   value="${idx}"
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
                     onclick="goToQuestion(${index})"
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
    updateTimerDisplay();

    state.timer.interval = setInterval(() => {
        state.timer.remaining--;
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

function calculateAndShowResult(timeUp = false) {
    let correctAnswers = 0;

    state.questions.forEach(question => {
        const userAnswer = state.answers[question.id];
        if (userAnswer === question.correct) {
            correctAnswers++;
        }
    });

    const wrongAnswers = state.questions.length - correctAnswers;
    const isPassed = correctAnswers >= 28;

    // === LƯU KẾT QUẢ VÀO LOCALSTORAGE (DỰ PHÒNG) ===
    const examResult = buildExamResult(correctAnswers, state.questions.length, isPassed, timeUp);
    const saved = saveExamToHistory(examResult);

    // Update result screen
    elements.resultName.textContent = state.user.fullName;
    elements.resultBirthDate.textContent = formatDateDisplay(state.user.birthDate);
    elements.resultDepartment.textContent = state.user.department;
    elements.resultDate.textContent = formatDateTime(state.startTime);
    elements.resultDuration.textContent = calculateDuration();

    elements.scoreNumber.textContent = correctAnswers;
    elements.correctCount.textContent = correctAnswers;
    elements.wrongCount.textContent = wrongAnswers;

    // Update status
    if (isPassed) {
        elements.resultIcon.textContent = '🎉';
        elements.resultTitle.textContent = 'Chúc Mừng!';
        elements.scoreCircle.classList.remove('fail');
        elements.resultStatus.className = 'result-status pass';
        elements.resultStatus.textContent = '✓ ĐẠT';
    } else {
        elements.resultIcon.textContent = '😔';
        elements.resultTitle.textContent = 'Kết Quả Bài Thi';
        elements.scoreCircle.classList.add('fail');
        elements.resultStatus.className = 'result-status fail';
        elements.resultStatus.textContent = '✗ KHÔNG ĐẠT';
    }

    switchScreen('result');

    // Hiển thị thông báo khi hết giờ (KHÔNG tự động xuất PDF)
    if (timeUp) {
        showTimeUpNotification(correctAnswers, state.questions.length, isPassed, saved);
    } else if (saved) {
        // Hiển thị thông báo nhỏ xác nhận đã lưu vào lịch sử
        showHistorySavedNotification();
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
                <h2 style="color:#f44336;margin:0 0 15px 0;font-size:24px;">HẾT GIỜ LÀM BÀI!</h2>
                <p style="color:#666;font-size:16px;margin:0 0 15px 0;">Bài thi của bạn đã được tự động nộp.</p>
                <div style="background:${isPassed ? '#E8F5E9' : '#FFEBEE'};padding:15px;border-radius:10px;margin:15px 0;">
                    <div style="font-size:32px;font-weight:bold;color:${isPassed ? '#4CAF50' : '#f44336'};">${correctAnswers}/${totalQuestions}</div>
                    <div style="font-size:14px;color:#666;margin-top:5px;">${isPassed ? '✓ ĐẠT' : '✗ KHÔNG ĐẠT'}</div>
                </div>
                ${historySaved ?
            '<p style="color:#4CAF50;font-size:13px;margin:10px 0 0 0;">✅ Kết quả đã được lưu vào lịch sử (dự phòng)</p>' :
            '<p style="color:#ff9800;font-size:13px;margin:10px 0 0 0;">⚠️ Không thể lưu lịch sử</p>'
        }
                <p style="color:#2196F3;font-size:14px;margin:15px 0 0 0;">📄 Vui lòng nhấn "<strong>Xuất PDF</strong>" để lưu kết quả</p>
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
        <div style="position:fixed;bottom:20px;left:20px;background:#4CAF50;color:white;padding:15px 25px;border-radius:10px;box-shadow:0 5px 20px rgba(0,0,0,0.3);z-index:9999;max-width:350px;">
            <div style="display:flex;align-items:center;gap:12px;">
                <span style="font-size:24px;">💾</span>
                <div>
                    <div style="font-weight:bold;font-size:14px;">Đã lưu vào lịch sử</div>
                    <div style="font-size:12px;opacity:0.9;margin-top:3px;">Kết quả được dự phòng trong trường hợp lỗi</div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(notificationDiv);

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        const notification = document.getElementById('historySavedNotification');
        if (notification) {
            notification.style.transition = 'opacity 0.5s';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }
    }, 3000);
}

// ===== PDF Export =====
async function exportToPDF() {
    // Show loading
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'pdfLoading';
    loadingDiv.innerHTML = `
        <div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;">
            <div style="background:white;padding:30px 50px;border-radius:10px;text-align:center;">
                <div style="font-size:40px;margin-bottom:15px;">📄</div>
                <div style="font-size:18px;color:#333;">Đang tạo PDF...</div>
                <div style="font-size:14px;color:#666;margin-top:10px;">Vui lòng đợi...</div>
            </div>
        </div>
    `;
    document.body.appendChild(loadingDiv);

    try {
        const { jsPDF } = window.jspdf;

        // Calculate results
        let correctAnswers = 0;
        const questionResults = [];

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

        const isPassed = correctAnswers >= 28;

        const questionsHtml = questionResults.map(q => `
            <div class="pdf-block pdf-question" style="margin-bottom:10px;padding:10px;border-left:3px solid ${q.isCorrect ? '#4CAF50' : '#f44336'};background:#fafafa;border-radius:6px;">
                <div style="font-weight:bold;font-size:11px;color:#333;margin-bottom:6px;">
                    <span style="color:${q.isCorrect ? '#4CAF50' : '#f44336'};margin-right:5px;">${q.isCorrect ? '✓' : '✗'}</span>
                    Câu ${q.index}: ${q.question}
                </div>
                <div style="margin-left:15px;font-size:10px;">
                    ${q.options.map((opt, idx) => {
            const prefix = String.fromCharCode(65 + idx);
            let bgColor = '#fff';
            let borderColor = '#e0e0e0';
            let textColor = '#333';
            let symbol = '';

            if (idx === q.correctAnswer && idx === q.userAnswer) {
                bgColor = '#C8E6C9';
                borderColor = '#4CAF50';
                symbol = '✓ ';
            } else if (idx === q.correctAnswer) {
                bgColor = '#C8E6C9';
                borderColor = '#4CAF50';
                symbol = '✓ ';
            } else if (idx === q.userAnswer) {
                bgColor = '#FFCDD2';
                borderColor = '#f44336';
                symbol = '✗ ';
            }

            return `<div style="padding:5px 8px;margin:3px 0;border-radius:4px;background:${bgColor};border:1px solid ${borderColor};color:${textColor};">
                                <strong>${symbol}${prefix}.</strong> ${opt}
                            </div>`;
        }).join('')}
                </div>
                ${q.userAnswer === -1 ? '<div style="color:#ff9800;margin-top:5px;margin-left:15px;font-size:9px;font-style:italic;">⚠ Chưa trả lời</div>' : ''}
            </div>
        `).join('');

        // Create hidden container for rendering
        const container = document.createElement('div');
        container.id = 'pdfContainer';
        container.style.cssText = 'position:fixed;left:-9999px;top:0;width:760px;background:white;font-family:Roboto,Arial,sans-serif;padding:20px;';

        // Build HTML content
        container.innerHTML = `
            <div class="pdf-root" style="max-width:760px;">
                <div class="pdf-block pdf-header" style="margin-bottom:14px;">
                    <div style="text-align:center;margin-bottom:14px;">
                        <h1 style="color:#2196F3;font-size:22px;margin:0 0 8px 0;">KẾT QUẢ BÀI THI TRẮC NGHIỆM</h1>
                        <div style="height:2px;background:#2196F3;"></div>
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
                            <td colspan="3" style="padding:4px 0;border-bottom:1px dotted #999;min-height:30px;"></td>
                        </tr>
                        <tr>
                            <td style="padding:4px 0;"><strong>Ngày sinh:</strong></td>
                            <td style="padding:4px 0;">${formatDateDisplay(state.user.birthDate)}</td>
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
                    <div style="padding:12px;background:${isPassed ? '#E8F5E9' : '#FFEBEE'};border-radius:8px;">
                        <table style="width:100%;font-size:11px;">
                            <tr>
                                <td style="text-align:center;width:33%;">
                                    <div style="font-size:28px;font-weight:bold;color:${isPassed ? '#4CAF50' : '#f44336'};">${correctAnswers}/30</div>
                                    <div style="font-size:10px;color:#666;">Điểm số</div>
                                </td>
                                <td style="text-align:center;width:34%;">
                                    <div style="font-size:14px;font-weight:bold;color:#4CAF50;">✓ ${correctAnswers} đúng</div>
                                    <div style="font-size:14px;font-weight:bold;color:#f44336;margin-top:3px;">✗ ${30 - correctAnswers} sai</div>
                                </td>
                                <td style="text-align:center;width:33%;">
                                    <div style="font-size:18px;font-weight:bold;color:${isPassed ? '#4CAF50' : '#f44336'};">
                                        ${isPassed ? 'ĐẠT' : 'KHÔNG ĐẠT'}
                                    </div>
                                    <div style="font-size:10px;color:#666;">Chuẩn: 28/30</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="pdf-block pdf-section-title" style="margin:10px 0 6px 0;">
                    <h2 style="color:#2196F3;font-size:14px;border-bottom:2px solid #2196F3;padding-bottom:5px;margin:0;">
                        CHI TIẾT CÂU TRẢ LỜI
                    </h2>
                </div>

                <div class="pdf-questions">
                    ${questionsHtml}
                </div>

                <div class="pdf-block pdf-footer" style="margin-top:12px;text-align:center;padding-top:8px;border-top:1px solid #e0e0e0;font-size:9px;color:#999;">
                    <div>Hệ thống thi trắc nghiệm DAHC</div>
                    <div style="margin-top:3px;">Xuất ngày: ${formatDateTime(new Date())}</div>
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
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: 760
            });
            const imgHeight = (canvas.height * contentWidth) / canvas.width;

            if (cursorY + imgHeight > pageHeight - margin) {
                doc.addPage();
                cursorY = margin;
            }

            const imgData = canvas.toDataURL('image/jpeg', 0.85);
            doc.addImage(imgData, 'JPEG', margin, cursorY, contentWidth, imgHeight, undefined, 'FAST');
            cursorY += imgHeight + 2;
        }

        document.body.removeChild(container);

        // Tạo tên file
        const fileName = `KetQua_${removeVietnameseTones(state.user.fullName).replace(/\s+/g, '_')}_Lan${state.user.attemptNumber}_${formatDateFile(new Date())}.pdf`;

        // === LƯU PDF VÀO BỘ NHỚ TẠM (LocalStorage) ===
        const pdfBase64 = doc.output('datauristring').split(',')[1]; // Lấy phần base64
        const examId = Date.now(); // ID duy nhất cho bài thi này
        const savedToCache = savePDFToCache(examId, fileName, pdfBase64);

        // Lưu examId vào state để có thể tải lại sau
        state.lastExamId = examId;

        // Tải PDF về thư mục Downloads
        doc.save(fileName);

        // Hiển thị thông báo thành công
        showPDFSuccessNotification(fileName, savedToCache);

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Đã xảy ra lỗi khi tạo PDF. Vui lòng thử lại.');
    } finally {
        // Remove loading
        const loading = document.getElementById('pdfLoading');
        if (loading) loading.remove();
    }
}

// Hiển thị thông báo PDF đã được lưu thành công
function showPDFSuccessNotification(fileName, savedToCache = false) {
    const cacheMessage = savedToCache
        ? '<div style="font-size:11px;opacity:0.8;margin-top:5px;color:#E8F5E9;">💾 Đã lưu bản dự phòng vào bộ nhớ tạm</div>'
        : '';

    const successDiv = document.createElement('div');
    successDiv.id = 'pdfSuccessNotification';
    successDiv.innerHTML = `
        <div style="position:fixed;bottom:20px;right:20px;background:#4CAF50;color:white;padding:20px 30px;border-radius:10px;box-shadow:0 5px 20px rgba(0,0,0,0.3);z-index:9999;max-width:420px;">
            <div style="display:flex;align-items:flex-start;gap:15px;">
                <span style="font-size:30px;">✅</span>
                <div>
                    <div style="font-weight:bold;font-size:16px;">Đã lưu kết quả!</div>
                    <div style="font-size:12px;opacity:0.9;margin-top:5px;">📂 File PDF đã được tải về thư mục Downloads</div>
                    <div style="font-size:11px;opacity:0.7;margin-top:3px;word-break:break-all;">${fileName}</div>
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
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN');
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
    // Reset state
    state.questions = [];
    state.currentIndex = 0;
    state.answers = {};
    state.questionStatus = {};
    state.timer.remaining = state.timer.duration;
    state.startTime = null;
    state.endTime = null;

    // Clear timer display classes
    elements.timer.classList.remove('warning', 'danger');

    // Switch to login
    switchScreen('login');
}

// ===== Confirmation Modal =====
function showConfirmModal(icon, title, message, onConfirm) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay active" id="confirmModal">
            <div class="modal-content">
                <div class="modal-icon">${icon}</div>
                <h2 class="modal-title">${title}</h2>
                <p class="modal-text">${message}</p>
                <div class="modal-buttons">
                    <button class="modal-btn cancel" onclick="closeModal()">Hủy</button>
                    <button class="modal-btn confirm" onclick="confirmAction()">Xác nhận</button>
                </div>
            </div>
        </div>
    `;

    // Add to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Store callback
    window.confirmCallback = onConfirm;
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

