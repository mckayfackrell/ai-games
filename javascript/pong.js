// Initialize the canvas and game objects
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: 3,
  dy: -3,
  radius: 10,
};
const paddleWidth = 10;
const paddleHeight = 50;
let playerPaddle = { x: 20, y: canvas.height / 2 - paddleHeight / 2 };
let computerPaddle = {
  x: canvas.width - 30,
  y: canvas.height / 2 - paddleHeight / 2,
};
let playerScore = 0;
let computerScore = 0;

// Update the position of the ball and paddles
function update() {
  // Move the ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Bounce the ball off the top and bottom walls
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.dy = -ball.dy;
  }

  // Check for a collision with the player's paddle
  if (
    ball.x - ball.radius < playerPaddle.x + paddleWidth &&
    ball.y > playerPaddle.y &&
    ball.y < playerPaddle.y + paddleHeight
  ) {
    ball.dx = -ball.dx;
  }

  // Check for a collision with the computer's paddle
  if (
    ball.x + ball.radius > computerPaddle.x &&
    ball.y > computerPaddle.y &&
    ball.y < computerPaddle.y + paddleHeight
  ) {
    ball.dx = -ball.dx;
  }

  // Check for a point scored by the player
  if (ball.x - ball.radius < 0) {
    computerScore++;
    document.getElementById("comp-score").innerHTML =
      "Computer: " + computerScore;
    resetBall();
  }

  // Check for a point scored by the computer
  if (ball.x + ball.radius > canvas.width) {
    playerScore++;
    document.getElementById("player-score").innerHTML =
      "Player: " + playerScore;
    resetBall();
  }

  // Move the computer's paddle
  if (ball.y < computerPaddle.y + paddleHeight / 2) {
    computerPaddle.y -= 5;
  } else {
    computerPaddle.y += 5;
  }
}

// Add event listeners to the up and down buttons
const upBtn = document.getElementById("up-btn");
const downBtn = document.getElementById("down-btn");

upBtn.addEventListener("click", function () {
  if (playerPaddle.y > 0) {
    playerPaddle.y -= 30; // Move paddle up
  }
});

downBtn.addEventListener("click", function () {
  if (playerPaddle.y + paddleHeight < canvas.height) {
    playerPaddle.y += 30; // Move paddle down
  }
});

// Draw the game objects on the canvas
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();

  // Draw the player's paddle
  ctx.fillRect(playerPaddle.x, playerPaddle.y, paddleWidth, paddleHeight);

  // Draw the computer's paddle
  ctx.fillRect(computerPaddle.x, computerPaddle.y, paddleWidth, paddleHeight);
}

// Reset the ball to the center of the screen
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx;
}

// Start a new game
function newGame() {
  playerScore = 0;
  computerScore = 0;
  resetBall();
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp" && playerPaddle.y > 0) {
    playerPaddle.y -= 30; // Move paddle up
  } else if (
    event.key === "ArrowDown" &&
    playerPaddle.y + paddleHeight < canvas.height
  ) {
    playerPaddle.y += 30; // Move paddle down
  }
});

// Run the game loop
function gameLoop() {
  update();
  draw();
}

setInterval(gameLoop, 20); // Run the game loop 50 times per second

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowUp" || event.code === "ArrowDown") {
    event.preventDefault();
    if (event.code === "ArrowUp") {
      // Call function to move paddle up
      movePlayerPaddleUp();
    } else if (event.code === "ArrowDown") {
      // Call function to move paddle down
      movePlayerPaddleDown();
    }
  }
});
