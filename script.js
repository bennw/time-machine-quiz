const app = document.getElementById("app");

const images = [
  { file: "https://drive.usercontent.google.com/uc?id=1zhuMjuSQaZo-nyZIQazdkNhO28gHAGL_&export=view", year: 2023, desc: "Vietnam",   descx: "Landmark 81, Ho Chi Minh City, 3 Jun <strong>2023</strong>" },
  { file: "https://drive.usercontent.google.com/uc?id=1ioSs24vwZ-oFwx7kMo7Miy5P6V1pqFUp&export=view", year: 2019, desc: "Tekapo", 	  descx: "Lake Tekapo and the Church of the Good Shepherd, <strong>3 Aug 2019</strong>" },
  { file: "https://drive.usercontent.google.com/uc?id=1Tk5_lEeCswsRAeUkjSh1_59s133Chun1&export=view", year: 2008, desc: "USJ", 	  descx: "Universal Studios Japan visit during band trip, <strong>Jun 2008</strong>" },
  { file: "https://drive.usercontent.google.com/uc?id=1iosHKNvPvIN8-_2OwuwKpAgKRoyXZTKW&export=view", year: 2011, desc: "USS", 	  descx: "USS grand opening, <strong>29 May 2011</strong>" },
  { file: "https://drive.usercontent.google.com/uc?id=1eihHVuCUFBOvgwDaVkobyGqUnMUYqcY7&export=view", year: 2019, desc: "Pokemon",   descx: "Newly opened Pokemon Centre at Changi Jewel, <strong>14 Apr 2019</strong>" },
  { file: "https://drive.usercontent.google.com/uc?id=182J8HHwRfg-NEZogFPxPzZbM5K2j-RXT&export=view", year: 2019, desc: "NY band",   descx: "NY alumni band concert, <strong>2 Jun 2019</strong>" },
  { file: "https://drive.usercontent.google.com/uc?id=1kqPXIax8s1TJ1hVrq2X0J8w1as3_MvFt&export=view", year: 2014, desc: "Da Capo",   descx: "Da Capo IX, <strong>27 Oct 2014</strong>" },
  { file: "https://drive.usercontent.google.com/uc?id=1irpwPojVEnUr_g8NsCXYHx31VrF6ogSK&export=view", year: 2009, desc: "Coda", 	  descx: "Coda V exco, <strong>9 Aug 2009</strong>" },
  { file: "https://drive.usercontent.google.com/uc?id=1OFhAuavzoUSEl2Aw-Dh9BvYvucESnUUz&export=view", year: 2018, desc: "Hong Kong", descx: "Hong Kong trip, <strong>6 May 2018</strong>" },
  { file: "img10.png", year: 2025, desc: "???", 	  descx: "???" }
];

let currentIndex = 0;
let totalScore = 0;
let results = []; // store each round result

function showTitleScreen() {
  app.innerHTML = `
    <h1>TIMEGU35SR</h1>
    <button onclick="startGame()">Play</button>
  `;
}

function startGame() {
  currentIndex = 0;
  totalScore = 0;
  results = [];
  showGuessScreen();
}

function showGuessScreen() {
  const img = images[currentIndex];
  app.innerHTML = `
    <h2>Image ${currentIndex + 1} of ${images.length}</h2>
    <img src="${img.file}" alt="Guess Image">
    <div id="year-display">Year: 2012</div>
	<br>
    <input type="range" min="2000" max="2025" value="2012" id="year-slider">
    <br><br><br><br>
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
  else if (diff === 1) points = 4000;
  else if (diff === 2) points = 3000;
  else if (diff === 3) points = 2000;
  else if (diff === 4) points = 1000;

  totalScore += points;
  results.push({
    desc: img.desc,
    guess: guess,
    answer: img.year,
    points: points
  });

  // color interpolation (0 → red, 5000 → green)
  const hue = (points / 5000) * 120; 
  const color = `hsl(${hue}, 80%, 40%)`;

  app.innerHTML = `
    <h2>Result</h2>
    <img src="images/${img.file}" alt="Result Image">
    <p>${img.descx}</p>
    <div class="result-grid">
	  <div><strong>Your guess:</strong></div>
	  <div>${guess}</div>
	  <div><strong>Correct:</strong></div>
	  <div>${img.year}</div>
	  <div><strong>Points:</strong></div>
	  <div><span style="color:${color}">${points}</span></div>
    </div><br>
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
  let tableRows = results.map(r => {
    const hue = (r.points / 5000) * 120; // 0=red, 5000=green
    const color = `hsl(${hue}, 80%, 40%)`;
    return `
      <tr>
        <td>${r.desc}</td>
        <td>${r.guess}</td>
        <td>${r.answer}</td>
        <td><span style="color:${color}">${r.points}</span></td>
      </tr>
    `;
  }).join("");
  app.innerHTML = `
    <h2>Summary</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="margin: 0 auto; border-collapse: collapse;">
      <thead>
        <tr>
          <th>Desc</th>
          <th>Guess</th>
          <th>Answer</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
    <p class="score">Total Score: <strong>${totalScore}</strong></p>
    <button onclick="showTitleScreen()">Play Again</button>
  `;
}

showTitleScreen();
