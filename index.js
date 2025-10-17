
const username = localStorage.getItem('username') || 'name';
document.querySelector('.navbar-text').textContent = `Hi, ${username}`;

 
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Hyper Text Preprocessor",
            "Hyper Text Multiple Language",
            "Hyper Tool Multi Language"
        ],
        answer: 0
    },
    {
        question: "Which tag is used for inserting an image in HTML?",
        options: [
            "<image>",
            "<img>",
            "<src>",
            "<pic>"
        ],
        answer: 1
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style System",
            "Computer Style Sheet",
            "Cascading Style Sheets",
            "Colorful Style Sheet"
        ],
        answer: 2
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<a>",
            "<link>",
            "<href>",
            "<hyper>"
        ],
        answer: 0
    },
    {
        question: "Which property is used to change the background color in CSS?",
        options: [
            "color",
            "bgcolor",
            "background",
            "background-color"
        ],
        answer: 3
    }
];

let current = 0;
let timeLeft = 30;   
let timerInterval;
let score = 0;

function renderQuestion(idx) {
    if (idx >= questions.length) {
        document.getElementById('question-card').innerHTML = `<h3 class="card-title" style="color: #5EB562;">Quiz Complete!</h3>
                    <p>Thank you for participating.</p>
                    <h5>Your Score: ${score} / ${questions.length}</h5>`;
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('timer').style.display = 'none';
        clearInterval(timerInterval);
        return;
    }
    const q = questions[idx];
    let html = `<h5 class="card-title">${q.question}</h5>
                <div justify-content="start" style="text-align: start; margin-top: 30px;">`;
    q.options.forEach((opt, i) => {

        const safeOpt = opt.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        html += `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="radioDefault" id="radioDefault${i}" value="${i}">
                        <label class="form-check-label" for="radioDefault${i}">
                            ${safeOpt}
                        </label>
                    </div>
                    <br>`;
    });
    html += `</div>`;
    document.getElementById('question-card').innerHTML = html;
}

function startTimer() {
    timeLeft = 30;
    document.getElementById('timer').textContent = `${timeLeft}s`;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `${timeLeft}s`;
        if (timeLeft <= 0) {
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    // Check selected answer
    const selected = document.querySelector('input[name="radioDefault"]:checked');
    if (selected) {
        if (parseInt(selected.value) === questions[current].answer) {
            score++;
        }
    }
    current++;
    renderQuestion(current);
    if (current < questions.length) {
        startTimer();
    }
}

// Initial render
renderQuestion(current);
startTimer();

// Next button event
document.getElementById('nextBtn').onclick = nextQuestion;