const app = document.getElementById("app");

const images = [
  { file: "img01.png", year: 2007, desc: "Description for image 1." },
  { file: "img02.png", year: 2010, desc: "Description for image 2." },
  { file: "img03.png", year: 2012, desc: "Description for image 3." },
  { file: "img04.png", year: 2014, desc: "Description for image 4." },
  { file: "img05.png", year: 2016, desc: "Description for image 5." },
  { file: "img06.png", year: 2017, desc: "Description for image 6." },
  { file: "img07.png", year: 2018, desc: "Description for image 7." },
  { file: "img08.png", year: 2019, desc: "Description for image 8." },
  { file: "img09.png", year: 2021, desc: "Description for image 9." },
  { file: "img10.png", year: 2023, desc: "Description for image 10." }
];

let currentIndex = 0;
let totalScore = 0;

function showTitleScreen() {
  app.innerHTML = `
    <h1>Timeguessr</h1>
    <button onclick="startGame()">Play</button>
  `;
}

function startGame() {
  currentIndex = 0;
  totalScore = 0;
  showGuessScreen();
}

function showGuessScreen() {
  const img = images[currentIndex];
  app.innerHTML = `
    <h2>Image ${currentIndex + 1} of ${images.length}</h2>
    <img src="images/${img.file}" alt="Guess Image">
    <div id="year-display">Year: 2015</div>
    <input type="range" min="2005" max="2025" value="2015" id="year-slider">
    <br><br>
    <button onclick="submitGuess()">Submit</button>
  `;

  const slider = document.getElementById("year-slider");
  const yearDisplay = document.getElementById("year-display");
  slider.addEventListener("input", () => {
    yearDisplay.textContent = `Year: ${slider.value}`;
  });
}

function submitGuess() {
  const slider = document.getElementById("year-slider");
  const guess = parseInt(slider.value);
  const img = images[currentIndex];
  const diff = Math.abs(guess - img.year);

  let points = 0;
  if (diff === 0) points = 5000;
  else if (diff === 1) points = 3000;
  else if (diff === 2) points = 1500;
  else if (diff === 3) points = 500;

  totalScore += points;

  app.innerHTML = `
    <h2>Result</h2>
    <img src="images/${img.file}" alt="Result Image">
    <p>Correct year: <strong>${img.year}</strong></p>
    <p>${img.desc}</p>
    <p>You guessed: ${guess}</p>
    <p>Points earned: ${points}</p>
    <button onclick="nextImage()">Next</button>
  `;
}

function nextImage() {
  currentIndex++;
  if (currentIndex < images.length) {
    showGuessScreen();
  } else {
    showFinalResults();
  }
}

function showFinalResults() {
  app.innerHTML = `
    <h2>Game Over</h2>
    <p class="score">Total Score: ${totalScore}</p>
    <button onclick="showTitleScreen()">Play Again</button>
  `;
}

showTitleScreen();
