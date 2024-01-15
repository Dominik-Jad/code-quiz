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
var timeLeft = 60;

var correctAudio = new Audio("./assets/sfx/correct.wav");
var incorrectAudio = new Audio("./assets/sfx/incorrect.wav");

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
    }
    // display question title
    questionTitleEl.textContent = questionObject[currentQuestion].question;
}

// function to check if answer is correct
function answers(event) {
    // check if button clicked, if not exit function
    if (!event.target.matches("button")){
        return;
    }
        // check if answer is correct
    if (event.target.getAttribute("data-answer") == questionObject[currentQuestion].answer) {
        // increase score if answer is correct
        correctAnswer++;
        // display correct answer message and play correct audio
        correctAudio.play(); 
        feedbackEl.removeAttribute("class", "hide");
        feedbackEl.setAttribute("class", "feedback");
        feedbackEl.textContent = "Correct!";
        // after 2 seconds, hide the message
        setInterval(() => {
            feedbackEl.setAttribute("class", "hide");
        }, 2000);
    } else {
        // penalize time
        timeLeft -= 10;
        // display wrong answer message and play incorrect audio
        incorrectAudio.play();
        feedbackEl.removeAttribute("class", "hide");
        feedbackEl.setAttribute("class", "feedback");
        feedbackEl.textContent = "Wrong!";
        // after 2 seconds, hide the message
        setInterval(() => {
            feedbackEl.setAttribute("class", "hide");
        }, 2000);
    }
    // move to next question
    currentQuestion++;
    // check if we've run out of questions
    if (currentQuestion === questionObject.length) {
        endGame();
    } else {
        displayQuestions();
    }
}

// timer function
function startTimer(){
    // start timer countdown
    var timeInterval = setInterval(function() {
        // decrement time
        timeLeft--;
        timerEl.textContent = timeLeft;
        // check if user ran out of time
        if (timeLeft <= 0) {
            // stop timer
            clearInterval(timeInterval);
            // set timer to 0 
            timerEl.textContent = 0;
            // end game
            endGame();
        }
    }, 1000);
}

// function to end quiz
function endGame(){
    // hide questions section
    questionsEl.setAttribute("class", "hide");
    // show end screen
    endScreenEl.setAttribute("class", "show");
    // show final score
    finalScoreEl.textContent = `${correctAnswer} out of ${questionObject.length}`;
}

function saveScore(){
    var score = {
        initials: initialsEl.value.trim(),
        score: correctAnswer
    };
    // check if initials are empty
    if (score.initials === "") {
        alert("Please enter your initials.");
        return;
    }
    // high scores is equal to high scores in local storage or empty array if nothing in local storage
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    // add score to high scores array
    highScores.push(score);
    // add the new array of scores to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // redirect to high scores page
    window.location.href = "highscores.html";
}

// event listener for submit button
submitBtn.addEventListener("click", saveScore);

// event listener for answer choices
choicesEl.addEventListener("click", answers);

// event listener for start button to start timer and display questions
buttonEl.addEventListener("click", function () {
    // hide start screen
    startScreenEl.setAttribute("class", "hide");
    // un-hide questions section
    questionsEl.setAttribute("class", "show");
    // start timer and display questions
    timerEl.textContent = timeLeft;
    startTimer();
    displayQuestions();
});


