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
    setupEventListeners();
    setDefaultBirthDate();
}

function setDefaultBirthDate() {
    // Set max date to today minus 18 years
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    elements.birthDateInput.max = maxDate.toISOString().split('T')[0];

    // Set default value
    const defaultDate = new Date(1990, 0, 1);
    elements.birthDateInput.value = defaultDate.toISOString().split('T')[0];
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

    const fullName = elements.fullNameInput.value.trim();
    const birthDate = elements.birthDateInput.value;
    const departmentRadio = document.querySelector('input[name="department"]:checked');

    if (!fullName || !birthDate || !departmentRadio) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    state.user.fullName = fullName;
    state.user.birthDate = birthDate;
    state.user.department = departmentRadio.value;

    // Increment and store attempt number
    state.user.attemptNumber = incrementAttemptCount(fullName, birthDate);

    startQuiz();
}

// ===== Quiz Logic =====
function startQuiz() {
    // Get random questions
    state.questions = getRandomQuestions(30);

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

    // Start timer
    startTimer();
}

function renderQuestion() {
    const question = state.questions[state.currentIndex];
    const selectedAnswer = state.answers[question.id];
    const isFlagged = state.questionStatus[question.id] === 'flagged';

    const html = `
        <div class="question-box">
            <div class="question-header">
                <span class="question-number">${state.currentIndex + 1}. Chọn đáp án đúng</span>
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
    const html = state.questions.map((q, idx) => {
        let statusClass = state.questionStatus[q.id] || 'not-visited';

        // Override with current if this is current question
        if (idx === state.currentIndex && statusClass !== 'flagged') {
            statusClass = 'current';
        }

        return `
            <div class="grid-item ${statusClass}" 
                 onclick="goToQuestion(${idx})"
                 title="Câu ${idx + 1}">
                ${idx + 1}
            </div>
        `;
    }).join('');

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
    state.endTime = new Date();

    if (timeUp) {
        alert('⏰ Hết giờ! Bài thi của bạn đã được nộp tự động.');
    }

    calculateAndShowResult();
}

function calculateAndShowResult() {
    let correctAnswers = 0;

    state.questions.forEach(question => {
        const userAnswer = state.answers[question.id];
        if (userAnswer === question.correct) {
            correctAnswers++;
        }
    });

    const wrongAnswers = state.questions.length - correctAnswers;
    const isPassed = correctAnswers >= 27;

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
}

function calculateDuration() {
    const duration = state.timer.duration - state.timer.remaining;
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes} phút ${seconds} giây`;
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

        const isPassed = correctAnswers >= 27;

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
                                    <div style="font-size:10px;color:#666;">Chuẩn: 27/30</div>
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

        // Save PDF
        const fileName = `KetQua_${removeVietnameseTones(state.user.fullName).replace(/\s+/g, '_')}_Lan${state.user.attemptNumber}_${formatDateFile(new Date())}.pdf`;
        doc.save(fileName);

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Đã xảy ra lỗi khi tạo PDF. Vui lòng thử lại.');
    } finally {
        // Remove loading
        const loading = document.getElementById('pdfLoading');
        if (loading) loading.remove();
    }
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

