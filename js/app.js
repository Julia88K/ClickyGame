
// Click a button or object to earn points so that I can increase my score.
// See my current
// See a countdown timer so that I know how much time is left

// Variables
let timeLeft = 60;
let score = 0;
let gameStarted = false;
let gameFinished = false;
let interval = null;

// HTML DOM
const button = document.getElementById("button1")
const scoreDisplay = document.getElementById("scoreDisplay")
const timerDisplay = document.getElementById("timer")
const nameSection = document.getElementById("nameSection");
const button2 = document.getElementById("button2")
const scoreboard = document.getElementById("scoreBoard")
const message = document.getElementById("statusMessage")
const button3 = document.getElementById("button3")

// UI Functions & Events
button.addEventListener("click", (e) => {
  handleClick();
})
button2.addEventListener("click", (e) => {
  newGame();
})

button3.addEventListener("click", () => {
  resetGame();
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
    timerDisplay.innerText = '60';
    scoreDisplay.innerText = '0';
    button.style.display = "block";
    button.disabled = false;
    nameSection.style.display = "none";
    button3.style.display = "none";
    message.style.display = "none";
    scoreboard.style.display = "none";
  }

async function submitHighScore() {
  const name = document.getElementById("nameInput").value;
  const response = await fetch("https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/", {
    method: "POST",
    body: JSON.stringify({name: name, score: score}),
  });
  document.getElementById("statusMessage").style.display = "block";
  console.log(response);
}

const newGame = async () => {
  await submitHighScore();
  await new Promise(resolve => setTimeout(resolve, 2000));
  await getScoreBoardData();
  button3.style.display = "block";
}

function getScoreBoardData() {
    const url = "https://script.google.com/macros/s/AKfycbys5aEPMvNCutyhNYYCcQcCjzsi2UtqNspmKyCH-AicJxJbCJMrAoT0LUaYaXhTWA8n/exec";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Scoreboard data:', data);
        scoreboard.innerHTML = "";
        scoreboard.style.display = "block";
        button3.style.display = "block";

        data
          .sort((a, b) => Number(b.score) - Number(a.score))
          .slice (0,10)
          .forEach((player, index) => {
          const row = document.createElement("p");
          row.innerText = `Row ${index + 1}: Name: ${player.name}, Score: ${player.score}`;
          scoreboard.appendChild(row)
        });
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }
