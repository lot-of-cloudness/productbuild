const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const contactScreen = document.getElementById('contact-screen');

const startBtn = document.getElementById('start-btn');
const answerA = document.getElementById('answer-a');
const answerB = document.getElementById('answer-b');
const retryBtn = document.getElementById('retry-btn');
const themeToggle = document.getElementById('theme-toggle');
const contactBtn = document.getElementById('contact-btn');
const closeContactBtn = document.getElementById('close-contact-btn');

const questionEl = document.getElementById('question');
const progressBar = document.getElementById('progress');
const mbtiResultEl = document.getElementById('mbti-result');
const mbtiDescriptionEl = document.getElementById('mbti-description');

const questions = [
    { question: '사람들과 어울리는 것을 즐기시나요?', type: 'E', choiceA: '네', choiceB: '아니오' },
    { question: '현실적인 것에 더 집중하는 편인가요?', type: 'S', choiceA: '네', choiceB: '아니오' },
    { question: '결정을 내릴 때 논리와 사실을 중요하게 생각하시나요?', type: 'T', choiceA: '네', choiceB: '아니오' },
    { question: '계획을 세우고 체계적으로 일하는 것을 선호하시나요?', type: 'J', choiceA: '네', choiceB: '아니오' },
    { question: '파티나 모임에서 중심에 있는 것을 즐기시나요?', type: 'E', choiceA: '네', choiceB: '아니오' },
    { question: '실제 경험을 통해 배우는 것을 선호하시나요?', type: 'S', choiceA: '네', choiceB: '아니오' },
    { question: '객관적인 사실에 근거하여 비판하는 편인가요?', type: 'T', choiceA: '네', choiceB: '아니오' },
    { question: '마감 기한을 지키기 위해 미리 계획을 세우시나요?', type: 'J', choiceA: '네', choiceB: '아니오' },
    { question: '새로운 사람들을 만나는 것을 좋아하시나요?', type: 'E', choiceA: '네', choiceB: '아니오' },
    { question: '구체적인 정보를 더 신뢰하시나요?', type: 'S', choiceA: '네', choiceB: '아니오' },
    { question: '감정적인 호소보다는 논리적인 설명에 더 설득되시나요?', type: 'T', choiceA: '네', choiceB: '아니오' },
    { question: '주변 환경을 정리정돈하는 것을 좋아하시나요?', type: 'J', choiceA: '네', choiceB: '아니오' },
];

let currentQuestionIndex = 0;
let scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
};

startBtn.addEventListener('click', startQuiz);
answerA.addEventListener('click', () => handleAnswer('A'));
answerB.addEventListener('click', () => handleAnswer('B'));
retryBtn.addEventListener('click', retryQuiz);
themeToggle.addEventListener('click', toggleTheme);
contactBtn.addEventListener('click', showContactScreen);
closeContactBtn.addEventListener('click', hideContactScreen);

function hideAllScreens() {
    startScreen.style.display = 'none';
    questionScreen.style.display = 'none';
    resultScreen.style.display = 'none';
    contactScreen.style.display = 'none';
}

function startQuiz() {
    hideAllScreens();
    questionScreen.style.display = 'flex';
    currentQuestionIndex = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answerA.textContent = currentQuestion.choiceA;
    answerB.textContent = currentQuestion.choiceB;
    updateProgressBar();
}

function handleAnswer(choice) {
    const currentQuestion = questions[currentQuestionIndex];
    const type = currentQuestion.type;

    if (choice === 'A') {
        scores[type]++;
    } else {
        switch(type) {
            case 'E': scores['I']++; break;
            case 'S': scores['N']++; break;
            case 'T': scores['F']++; break;
            case 'J': scores['P']++; break;
        }
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function updateProgressBar() {
    const progressPercentage = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function showResult() {
    hideAllScreens();
    resultScreen.style.display = 'flex';
    
    let mbti = '';
    mbti += scores.E >= 2 ? 'E' : 'I';
    mbti += scores.S >= 2 ? 'S' : 'N';
    mbti += scores.T >= 2 ? 'T' : 'F';
    mbti += scores.J >= 2 ? 'J' : 'P';

    mbtiResultEl.textContent = mbti;
    mbtiDescriptionEl.textContent = getMbtiDescription(mbti);
}

function getMbtiDescription(mbti) {
    const descriptions = {
        'ISTJ': '청렴결백한 논리주의자', 'ISFJ': '용감한 수호자', 'INFJ': '선의의 옹호자', 'INTJ': '용의주도한 전략가',
        'ISTP': '만능 재주꾼', 'ISFP': '호기심 많은 예술가', 'INFP': '열정적인 중재자', 'INTP': '논리적인 사색가',
        'ESTP': '모험을 즐기는 사업가', 'ESFP': '자유로운 영혼의 연예인', 'ENFP': '재기발랄한 활동가', 'ENTP': '뜨거운 논쟁을 즐기는 변론가',
        'ESTJ': '엄격한 관리자', 'ESFJ': '사교적인 외교관', 'ENFJ': '정의로운 사회운동가', 'ENTJ': '대담한 통솔자',
    };
    return descriptions[mbti] || '결과를 찾을 수 없습니다.';
}

function retryQuiz() {
    hideAllScreens();
    startScreen.style.display = 'flex';
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }
}

function showContactScreen() {
    hideAllScreens();
    contactScreen.style.display = 'flex';
}

function hideContactScreen() {
    hideAllScreens();
    startScreen.style.display = 'flex';
}
