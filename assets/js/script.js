var questions = [{
    title: "What does HTML stand for?",
    choices: ["HyperText Markup Language", "HyperTalk Markup Language", "Hyperlink Markup Language", "HyperTest Markup Language"],
    correctAnswer: "HyperText Markup Language"
}, {
    title: "Which of the following tags is used to create an ordered list?",
    choices: ["<dl>", "<li>", "<ol>", "<ul>"],
    correctAnswer: "<ul>"
}, {
    title: "Which is the correct HTML tag for a new paragraph?",
    choices: ["<p>", "<paragraph>", "<pg>", "<para>"],
    correctAnswer: "<p>"
}, {
    title: "Which tag is used to create a hyperlink?",
    choices: ["<a>", "<href>", "<link>", "<hyperlink>"],
    correctAnswer: "<href>"
}];

let questionIndex = 0;
let startScreenEl = document.querySelector('#start-screen');
let startQuestionEl = document.querySelector('#question-screen');
let startEndEL = document.querySelector('#end-screen');
let startBtn = document.querySelector('#start-button');
let titleEl = document.querySelector('#title');
let choicesEl = document.querySelector('#choices');
let timerEl = document.querySelector('#timer');
let timer;
let timerCount;
let quizScore = 0;

startScreenEl.setAttribute('class', 'reveal');
startQuestionEl.setAttribute('class', 'hidden');
startEndEL.setAttribute('class', 'hidden');
timerEl.setAttribute('class', 'countdown');

function startQuiz() {
    timerCount = 30;
    startScreenEl.setAttribute('class', 'hidden');
    startQuestionEl.setAttribute('class', 'reveal');
    generateQuestions();
    beginTimer();
};

function beginTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount <= 0) {
            clearInterval(timer);
            lostGame();
        };
    }, 1000);
}

function lostGame() {
    localStorage.setItem("recentScore", quizScore)
};

function generateQuestions() {
    let currentQuestion = questions[questionIndex]

    titleEl.textContent = currentQuestion.title

    choicesEl.innerHTML = "";

    for (let i = 0; i < 4; i++) {
        let tempBtn = document.createElement("button");
        tempBtn.textContent = currentQuestion.choices[i];
        tempBtn.setAttribute('class', 'question-box');
        tempBtn.setAttribute("id", currentQuestion.choices[i])

        tempBtn.onclick = validateAnswer
        choicesEl.appendChild(tempBtn)
    }
    if (currentQuestion === 0) {
        endQuiz();
    };
};

function validateAnswer() {
    if (this.id !== questions[questionIndex].correctAnswer) {
        alert("Wrong");
        console.log('this is the id', this.id);
        subtractQuizTimer();
    } else {
        alert("Correct!");
        quizScore += "";
        console.log('score so far', quizScore);
    };
    questionIndex++;
    if (questionIndex >= questions.length) {
        endQuiz();
    } else {
        generateQuestions();
    };
};

function endQuiz() {
    startQuestionEl.setAttribute('class', 'hidden');
    startEndEL.setAttribute('class', 'reveal');
    localStorage.setItem("recentScore", quizScore);
    clearInterval(timer)
};

function subtractQuizTimer() {
    timerCount -= 10;
}

var startButton = document.querySelector("#startButton");
var endButton = document.querySelector('#end-screen');
var initials = document.querySelector('#initials');
var initialsButton = document.querySelector('#initials-button');
var hiscores = document.querySelector('#high-scores');
var userData = JSON.parse(localStorage.getItem("high-scores")) || [];

initialsButton.addEventListener("click", function () {
    var Player = {
        initials: initials.value,
        score: quizScore,
    };
    console.log(Player);
    userData.push(Player);
    localStorage.setItem("high-scores", JSON.stringify(userData));
    for (let i = 0; i < userData.length; i++) {
        var p = document.createElement('p')
        p.textContent = "Player: " + userData[i].initials + " Score: " + userData[i].score;
        hiscores.append(p)
    };
});

startBtn.onclick = startQuiz;