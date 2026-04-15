
// Click a button or object to earn points so that I can increase my score.
// See my current
// See a countdown timer so that I know how much time is left

// Variables

let score = 0;

// HTML DOM

const button = document.getElementById("button1")
const scoreDisplay = document.getElementById("scoreDisplay")

// UI Functions
button.addEventListener("click", (e) => {
  increaseScore();
  button.innerText = score + " + once more";
})


// Functions
function increaseScore() {
  score++;
  scoreDisplay.innerText = score;
}
function setIntervall() {
  
}
