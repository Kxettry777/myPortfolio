// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");

const quizQuestions = [
    {
        question : "Which superpower would a student want the most ?",
        answers : [
            { text: "Ability to pause life for a nap.", correct: false },
            { text: "Infinite coffee supply.", correct: false },
            { text: "Instantly memorizing entire textbooks.", correct: true },
            { text: "Flying to skip classes.", correct: false },
        ],
    },
        {
        question : "What's your ultimate stress buster during exams ?",
        answers : [
            { text: "Memes and Reels Scrolling", correct: false },
            { text: "Crying quietly and calling it 'meditation' ", correct: false },
            { text: "Over analysing every single old questions", correct: false },
            { text: "Taking a short walk outside", correct: true },
        ],
    },
        {
        question : "What is the fastest way to 'study' before an exam ?",
        answers : [
            { text: "Reading the whole textbook in one hour.", correct: false },
            { text: "Watching the lecture video at 2x speed.", correct: true },
            { text: "Asking your pet for tips.", correct: false },
            { text: "Making a colorful mind map... that you never look at.", correct: false },
        ],
    },
        {
        question : "What's the real reason students check their phones during class ?",
        answers : [
            { text: "To learn something from educational apps.", correct: true },
            { text: "To see if the Wi-Fi is still working ", correct: false },
            { text: "To message the ghost of last year's top scorer.", correct: false },
            { text: "To convince themselves they're 'multitasking'. ", correct: false },
        ],
    },
        {
        question : "If procrastination was an Olympic sport, who would win ?",
        answers : [
            { text: "The friend who says 'I will start in 5 minutes', since forever.", correct: false },
            { text: "The topper who studies only at the last moment but still tops.", correct: true },
            { text: "The one who opens the book, reads one line, and goes to make tea.", correct: false },
            { text: "The person who cleans the whole room just to avoid studying.", correct: false },
        ],
    },
];

// Quiz State Vars
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length

// Event Listeners

startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)

function startQuiz(){
    // reset vars
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion(){
    // reset state
    answerDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%"

    questionText.textContent = currentQuestion.question

    // todo : explain this in a second
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn");

        // What is dataset ?  It is a property of the button that allows you to store custom data
        button.dataset.correct = answer.correct

        button.addEventListener("click", selectAnswer)

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    // optimization check
    if(answerDisabled) return 

    answerDisabled = true

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // todo: explain this in a sec
    Array.from(answersContainer.children).forEach((button) => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score
    }

    setTimeout(() => {
        currentQuestionIndex++;

        // check if there are more questions or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()
        } else {
            showResults()
        }
    },1000)
}

function showResults(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100

    if(percentage === 100){
        resultMessage.textContent = "Perfect ! You're a genius";
    }
    else if(percentage >= 80){
        resultMessage.textContent = "Great job ! You know your stuff !";
    }
    else if(percentage >= 60){
        resultMessage.textContent = "Good effort ! keep learning !";
    }
    else if(percentage >= 40){
        resultMessage.textContent = "Not bad ! Try again to improve !";
    }
    else{
        resultMessage.textContent = "Keep studying ! You'll get better !"
    }
}

function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}