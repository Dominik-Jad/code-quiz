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

