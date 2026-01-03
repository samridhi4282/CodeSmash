let level = "";
let score = 0;
let index = 0;

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
    document.getElementById("feedback").innerText = "❌ Wrong!";
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
  }, 800);
}

function endGame() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  let xp = score * (level === "easy" ? 10 : level === "medium" ? 15 : 25);
  document.getElementById("scoreText").innerText =
    `Score: ${score}/5 | XP Earned: ${xp}`;
}