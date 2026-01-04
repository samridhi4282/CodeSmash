let level = "";
let score = 0;
let index = 0;
let leaderboard = [];

const questions = {
  easy: [
    { q: "Output of: 2 + 3?", a: "5" },
    { q: "Keyword to define function?", a: "def" },
    { q: "Data type of 10?", a: "int" },
    { q: "Comment symbol?", a: "#" },
    { q: "len('hi')?", a: "2" }
  ],
  medium: [
    { q: "10 // 3 output?", a: "3" },
    { q: "input() returns?", a: "str" },
    { q: "Exception keyword?", a: "try" },
    { q: "len([1,2,3])?", a: "3" },
    { q: "Which collection in python does not allow duplicate values?", a: "set" }
  ],
  hard: [
    { q: "type([])?", a: "list" },
    { q: "Generator keyword?", a: "yield" },
    { q: "bool(0)?", a: "false" },
    { q: "len({'a':1,'b':2})?", a: "2" },
    { q: "Unpacking symbol?", a: "*" }
  ]
};

function startGame(selectedLevel) {
  level = selectedLevel;
  score = 0;
  index = 0;

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  loadQuestion();
}

function loadQuestion() {
  document.getElementById("question").innerText =
    questions[level][index].q;
}

function submitAnswer() {
  const userAns = document.getElementById("answer").value.trim().toLowerCase();
  const correctAns = questions[level][index].a;

  if (userAns === correctAns) {
    score++;
    document.getElementById("feedback").innerText = "✅ Correct!";
  } else {
    document.getElementById("feedback").innerText = `❌ Wrong! The correct answer is: ${correctAns}`;
  }

  document.getElementById("answer").value = "";
  index++;

  setTimeout(() => {
    document.getElementById("feedback").innerText = "";
    if (index < questions[level].length) {
      loadQuestion();
    } else {
      endGame();
    }
  }, 2000);
}

function endGame() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  let xp = score * (level === "easy" ? 10 : level === "medium" ? 15 : 25);
  document.getElementById("scoreText").innerText =
    `Score: ${score}/5 | XP Earned: ${xp}`;

  const playerName = prompt("Enter your name for the leaderboard:");
  updateLeaderboard(playerName, xp);
}

function updateLeaderboard(name, xp) {
  leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name, xp });
  leaderboard.sort((a, b) => b.xp - a.xp);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function showLeaderboard() {
  flipCard();
  setTimeout(() => {
    document.getElementById("result").classList.add("hidden");
    document.getElementById("leaderboard").classList.remove("hidden");

    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = "";
    leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.forEach(player => {
      const li = document.createElement("li");
      li.innerText = `${player.name} - ${player.xp} XP`;
      leaderboardList.appendChild(li);
    });
  }, 500);
}

function flipCard() {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.classList.toggle("flipped");
}
