// element variables
var clearEl = document.querySelector("#clear");
var highScoresEl = document.querySelector("#highscores");

// function to display high scores
function displayScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores"));

    // if there are no high scores, display message
    if (!highScores) {
        highScoresEl.textContent = "No high scores to display.";
        return;
    }
    // loop through high scores and display them 
    for (var i = 0; i < highScores.length; i++) {
        // create list item for each high score
        var score = document.createElement("li");
        score.textContent = `${highScores[i].initials} - ${highScores[i].score}`;
        highScoresEl.appendChild(score);
    }
}

// when page is loaded display high scores
displayScores();

// function to clear high scores
clearEl.addEventListener("click", function () {
    // clear high scores from local storage
    localStorage.removeItem("highScores");
    // reload page
    window.location.reload();
});