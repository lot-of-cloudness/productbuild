document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const startScreen = document.getElementById('start-screen');
    const questionScreen = document.getElementById('question-screen');
    const resultScreen = document.getElementById('result-screen');
    const retryBtn = document.getElementById('retry-btn');

    const questionEl = document.getElementById('question');
    const answerABtn = document.getElementById('answer-a');
    const answerBBtn = document.getElementById('answer-b');
    const progressEl = document.getElementById('progress');

    const mbtiResultEl = document.getElementById('mbti-result');
    const mbtiDescriptionEl = document.getElementById('mbti-description');

    const themeToggle = document.getElementById('theme-toggle');
    const contactBtn = document.getElementById('contact-btn');
    const contactScreen = document.getElementById('contact-screen');
    const closeContactBtn = document.getElementById('close-contact-btn');
    const mbtiTypesScreen = document.getElementById('mbti-types-screen');

    const questions = [
        { question: '혼자 있을 때 에너지를 얻나요, 아니면 다른 사람들과 함께 있을 때 에너지를 얻나요?', a: '혼자 있을 때', b: '다른 사람들과 함께 있을 때', type: 'I', type_b: 'E' },
        { question: '미래의 가능성을 상상하는 것을 즐기나요, 아니면 현재의 사실에 집중하는 것을 선호하나요?', a: '가능성을 상상', b: '현재 사실에 집중', type: 'N', type_b: 'S' },
        { question: '결정을 내릴 때 논리와 원칙을 중요하게 생각하나요, 아니면 사람들의 감정을 더 중요하게 생각하나요?', a: '논리와 원칙', b: '사람들의 감정', type: 'T', type_b: 'F' },
        { question: '계획을 세우고 미리 준비하는 것을 선호하나요, 아니면 즉흥적으로 행동하는 것을 즐기나요?', a: '계획과 준비', b: '즉흥적 행동', type: 'J', type_b: 'P' },
        { question: '주목받는 것을 즐기나요, 아니면 주목받지 않는 것을 선호하나요?', a: '주목받지 않음', b: '주목받는 것', type: 'I', type_b: 'E' },
        { question: '경험에서 배우는 것을 중요하게 생각하나요, 아니면 이론과 개념을 통해 배우는 것을 선호하나요?', a: '이론과 개념', b: '경험에서 배움', type: 'N', type_b: 'S' },
        { question: '다른 사람의 의견에 동의하지 않을 때, 솔직하게 표현하는 편인가요?', a: '솔직하게 표현', b: '상황에 따라 다름', type: 'T', type_b: 'F' },
        { question: '마감일이 다가올수록 더 힘이 나나요, 아니면 미리 일을 끝내고 여유를 즐기나요?', a: '미리 끝내고 여유', b: '마감일에 힘이 남', type: 'J', type_b: 'P' },
        { question: '새로운 사람들을 만나는 것을 즐기나요, 아니면 기존에 알던 사람들과 어울리는 것을 선호하나요?', a: '기존에 알던 사람', b: '새로운 사람', type: 'I', type_b: 'E' },
        { question: '나무보다는 숲을 보는 경향이 있나요?', a: '네', b: '아니오', type: 'N', type_b: 'S' },
        { question: '객관적인 사실과 논리가 감정보다 중요하다고 생각하나요?', a: '네', b: '아니오', type: 'T', type_b: 'F' },
        { question: '여행을 갈 때, 상세한 계획을 세우는 편인가요, 아니면 대략적인 계획만 세우나요?', a: '상세한 계획', b: '대략적인 계획', type: 'J', type_b: 'P' },
    ];

    const mbtiDescriptions = {
        ISTJ: "청렴결백한 논리주의자, 세상의 소금형",
        ISFJ: "용감한 수호자, 임금 뒷편의 권력형",
        INFJ: "선의의 옹호자, 예언자형",
        INTJ: "용의주도한 전략가, 과학자형",
        ISTP: "만능 재주꾼, 백과사전형",
        ISFP: "호기심 많은 예술가, 성인군자형",
        INFP: "열정적인 중재자, 잔다르크형",
        INTP: "논리적인 사색가, 아이디어 뱅크형",
        ESTP: "모험을 즐기는 사업가, 수완좋은 활동가형",
        ESFP: "자유로운 영혼의 연예인, 사교적인 유형",
        ENFP: "재기발랄한 활동가, 스파크형",
        ENTP: "뜨거운 논쟁을 즐기는 변론가, 발명가형",
        ESTJ: "엄격한 관리자, 사업가형",
        ESFJ: "사교적인 외교관, 친선도모형",
        ENFJ: "정의로운 사회운동가, 언변능숙형",
        ENTJ: "대담한 통솔자, 지도자형"
    };

    let currentQuestionIndex = 0;
    let userAnswers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, P: 0, J: 0 };

    function startTest() {
        startScreen.style.display = 'none';
        mbtiTypesScreen.style.display = 'none';
        questionScreen.style.display = 'block';
        currentQuestionIndex = 0;
        userAnswers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, P: 0, J: 0 };
        showQuestion();
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionEl.textContent = currentQuestion.question;
        answerABtn.textContent = currentQuestion.a;
        answerBBtn.textContent = currentQuestion.b;
        updateProgress();
    }

    function handleAnswer(answer) {
        const currentQuestion = questions[currentQuestionIndex];
        userAnswers[answer === 'a' ? currentQuestion.type : currentQuestion.type_b]++;
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function updateProgress() {
        const progressPercentage = (currentQuestionIndex / questions.length) * 100;
        progressEl.style.width = `${progressPercentage}%`;
    }

    function showResult() {
        questionScreen.style.display = 'none';
        resultScreen.style.display = 'block';
        
        let result = '';
        result += userAnswers.I > userAnswers.E ? 'I' : 'E';
        result += userAnswers.N > userAnswers.S ? 'N' : 'S';
        result += userAnswers.F > userAnswers.T ? 'F' : 'T';
        result += userAnswers.P > userAnswers.J ? 'P' : 'J';

        mbtiResultEl.textContent = result;
        mbtiDescriptionEl.textContent = mbtiDescriptions[result];
    }

    function retryTest() {
        resultScreen.style.display = 'none';
        startScreen.style.display = 'block';
        mbtiTypesScreen.style.display = 'block';
    }

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    // Contact form modal
    contactBtn.addEventListener('click', () => {
        contactScreen.style.display = 'block';
    });

    closeContactBtn.addEventListener('click', () => {
        contactScreen.style.display = 'none';
    });

    startBtn.addEventListener('click', startTest);
    answerABtn.addEventListener('click', () => handleAnswer('a'));
    answerBBtn.addEventListener('click', () => handleAnswer('b'));
    retryBtn.addEventListener('click', retryTest);
});