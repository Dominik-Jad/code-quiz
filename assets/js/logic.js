import { quizQuestions } from "./questions.js";

var buttonEl = document.querySelector("#start");
var timerEl = document.querySelector("#time");
var questionsEl = document.querySelector("#questions");
var questionTitleEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var startScreenEl = document.querySelector("#start-screen");
var endScreenEl = document.querySelector("#end-screen");
var submitBtn = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");
var finalScoreEl = document.querySelector("#final-score");
var feedbackEl = document.querySelector("#feedback");

var questionObject = quizQuestions;
var currentQuestion = 0;
var correctAnswer = 0;
var timeLeft = 100;

//display questions

function displayQuestions() {
    // clear out any old question choices
    choicesEl.innerHTML = "";
    // loop over options
    for (var i = 0; i < questionObject[currentQuestion].options.length; i++) {
        // create new button for each choice
        var choice = document.createElement("button");
            choice.setAttribute("data-answer", i);
            choice.innerHTML = `${i + 1}. ${questionObject[currentQuestion].options[i]}`;
            choicesEl.appendChild(choice);
            console.log(choice);
    }
    // display question title
    questionTitleEl.textContent = questionObject[currentQuestion].question;
}

// event listener for start button to start timer and display questions
buttonEl.addEventListener("click", function () {
    // hide start screen
    startScreenEl.setAttribute("class", "hide");
    // un-hide questions section
    questionsEl.setAttribute("class", "show");
    // start timer and display questions
    timerEl.textContent = timeLeft;
    displayQuestions();
});