const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const block = {
  x: Math.floor(Math.random() * (canvas.width - 20)),
  y: Math.floor(Math.random() * (canvas.height - 20)),
  width: 20,
  height: 20,
  speedX: 1,
  speedY: 1,
};

function drawBlock() {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(
    block.x + block.width / 2,
    block.y + block.height / 2,
    block.width / 2,
    0,
    2 * Math.PI
  );
  ctx.stroke();
}

function newGame() {
  block.x = Math.floor(Math.random() * (canvas.width - 20));
  block.y = Math.floor(Math.random() * (canvas.height - 20));

  const scores = document.querySelectorAll(".score");
  for (let i = 0; i < scores.length; i++) {
    scores[i].textContent = "0";
  }
}

// Call newGame to reset the game before starting the game loop
newGame();
gameLoop();

function moveBlock() {
  block.x += block.speedX;
  block.y += block.speedY;
  if (block.x < 0 || block.x + block.width > canvas.width) {
    block.speedX = -block.speedX;
  }
  if (block.y < 0 || block.y + block.height > canvas.height) {
    block.speedY = -block.speedY;
  }
}

function detectCollisions() {
  if (block.x < 1 && block.y < 1) {
    const score = document.getElementById("top-left-score");
    score.textContent = parseInt(score.textContent) + 1;
  } else if (block.x + block.width > canvas.width - 1 && block.y < 1) {
    const score = document.getElementById("top-right-score");
    score.textContent = parseInt(score.textContent) + 1;
  } else if (block.x < 1 && block.y + block.height > canvas.height - 1) {
    const score = document.getElementById("bottom-left-score");
    score.textContent = parseInt(score.textContent) + 1;
  } else if (
    block.x + block.width > canvas.width - 1 &&
    block.y + block.height > canvas.height - 1
  ) {
    const score = document.getElementById("bottom-right-score");
    score.textContent = parseInt(score.textContent) + 1;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveBlock();
  detectCollisions();
  drawBlock();
  setTimeout(gameLoop, 10); // call gameLoop again after a delay
}

gameLoop(); // start the game loop
