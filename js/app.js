
// Click a button or object to earn points so that I can increase my score.
// See my current
// See a countdown timer so that I know how much time is left

// Variables
let timeLeft = 10;
let score = 0;
let gameStarted = false;
let gameFinished = false;
let interval = null;

// HTML DOM

const button = document.getElementById("button1")
const scoreDisplay = document.getElementById("scoreDisplay")
const timerDisplay = document.getElementById("timer")
const nameSection = document.getElementById("nameSection");

// UI Functions & Events
button.addEventListener("click", (e) => {
  handleClick();
})



// Functions
function increaseScore() {
  score++;
  scoreDisplay.innerText = score;
}

function countdown () {
  timeLeft--;
  timerDisplay.innerText = "Timer: " + timeLeft;
  if (timeLeft <= 0) endGame();
}

function startGame() {
  gameStarted = true;
  interval = setInterval(countdown, 1000);
}

function handleClick() {
    if (gameFinished) return;

    if (!gameStarted) {
      startGame();
    }
  increaseScore();
  }


function endGame() {
    clearInterval(interval);
    gameFinished = true;
    button.style.display = "none";
    nameSection.style.display = "block";
  }

  function resetGame() {
    timeLeft = 60;
    score = 0;
    gameStarted = false;
    gameFinished = false;
    clearInterval(interval);
    interval = null;
    timerDisplay.innerText = '10';
    scoreDisplay.innerText = '0';
    button.disabled = false;
  }

