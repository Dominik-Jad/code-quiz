var clearEl = document.querySelector("#clear");
var highScoresEl = document.querySelector("#highscores");
var clearEl = document.querySelector("#clear");

// function to display high scores
function displayScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores"));

    // if there are no high scores, display message
    if (!highScores) {
        highScoresEl.textContent = "No high scores to display.";
        return;
    }
    for (var i = 0; i < highScores.length; i++) {
        var score = document.createElement("li");
        score.textContent = `${highScores[i].initials} - ${highScores[i].score}`;
        highScoresEl.appendChild(score);
    }
}

// when page is loaded display high scores
displayScores();

// function to clear high scores