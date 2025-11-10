// Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");

// Array
const words = [
  "dependent",
  "dog",
  "superficial",
  "admit",
  "juice",
  "javascript",
  "developer",
  "airplane",
  "great",
  "fun",
  "manipulate",
  "cat",
  "transition",
  "school",
  "computer",
  "programming",
  "drag",
  "loving",
  "north",
];

//Initializing word
let randomWord;

//Initializing score
let score = 0;

//Initializing time
let time = 10;


// Set difficulty (load from localStorage or default to 'medium')

let difficulty = localStorage.getItem("difficulty") !== null 
  ? localStorage.getItem("difficulty") 
  : "medium";

// Set the difficulty dropdown value

difficultySelect.value = difficulty;

// Focus input on start
text.focus();


// PART 1 

// Function to add random word to DOM

function addWordToDOM() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  word.innerHTML = randomWord;
}

// Function to update score

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Event listener for typing

text.addEventListener("input", (e) => {
  const insertedText = e.target.value.trim();

  if (insertedText === randomWord) {
    updateScore();
    addWordToDOM();

    // Increase time based on difficulty

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    // Clear input field
    e.target.value = "";
  }
});


//  PART 2 

// Function to update time

const timeInterval = setInterval(updateTime, 1000);

function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time <= 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// Function to show game over screen

function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Restart</button>
  `;
  endgameEl.style.display = "flex";
}

