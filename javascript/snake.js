var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var blockSize = 10;
var widthInBlocks = canvas.width / blockSize;
var heightInBlocks = canvas.height / blockSize;
var score = 0;
var intervalId;
var snake;
var apple;

function init() {
  snake = new Snake();
  apple = new Apple();
  apple.draw();
  intervalId = setInterval(gameLoop, 100);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();
  snake.draw();
  apple.draw();
  drawScore();
  if (snake.checkCollision()) {
    gameOver();
  }
}

function drawScore() {
  // Update the <p> tag with the score value
  document.getElementById("score").innerHTML = "Score: " + score;
}

function gameOver() {
  clearInterval(intervalId);
  ctx.font = "40px Arial";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}

function Snake() {
  this.segments = [
    [6, 4],
    [5, 4],
    [4, 4],
  ];
  this.direction = "right";
  this.nextDirection = "right";
  this.draw = function () {
    for (var i = 0; i < this.segments.length; i++) {
      drawBlock(ctx, this.segments[i]);
    }
  };
  this.move = function () {
    var head = this.segments[0].slice();
    this.direction = this.nextDirection;
    switch (this.direction) {
      case "right":
        head[0]++;
        break;
      case "down":
        head[1]++;
        break;
      case "left":
        head[0]--;
        break;
      case "up":
        head[1]--;
        break;
    }
    this.segments.unshift(head);
    if (this.checkCollision()) {
      gameOver();
    }
    if (head[0] === apple.position[0] && head[1] === apple.position[1]) {
      score++;
      apple.move();
    } else {
      this.segments.pop();
    }
  };
  this.checkCollision = function () {
    var head = this.segments[0];
    var body = this.segments.slice(1);
    var wallCollision =
      head[0] < 0 ||
      head[0] >= widthInBlocks ||
      head[1] < 0 ||
      head[1] >= heightInBlocks;
    var selfCollision = false;
    for (var i = 0; i < body.length; i++) {
      if (head[0] === body[i][0] && head[1] === body[i][1]) {
        selfCollision = true;
        break;
      }
    }
    return wallCollision || selfCollision;
  };
  this.setDirection = function (newDirection) {
    if (this.direction === "up" && newDirection === "down") {
      return;
    } else if (this.direction === "right" && newDirection === "left") {
      return;
    } else if (this.direction === "down" && newDirection === "up") {
      return;
    } else if (this.direction === "left" && newDirection === "right") {
      return;
    }
    this.nextDirection = newDirection;
  };
}
function Apple() {
  this.position = [
    Math.floor(Math.random() * (widthInBlocks - 1)),
    Math.floor(Math.random() * (heightInBlocks - 1)),
  ];
  this.draw = function () {
    drawCircle(ctx, this.position);
  };
  this.move = function () {
    this.position = [
      Math.floor(Math.random() * (widthInBlocks - 1)),
      Math.floor(Math.random() * (heightInBlocks - 1)),
    ];
  };
}

function drawBlock(ctx, position) {
  var x = position[0] * blockSize;
  var y = position[1] * blockSize;
  ctx.fillRect(x, y, blockSize, blockSize);
}

function drawCircle(ctx, position) {
  var x = position[0] * blockSize + blockSize / 2;
  var y = position[1] * blockSize + blockSize / 2;
  ctx.beginPath();
  ctx.arc(x, y, blockSize / 2, 0, Math.PI * 2, false);
  ctx.fill();
}

document.addEventListener("keydown", function (event) {
  var key = event.keyCode;
  var newDirection;
  switch (key) {
    case 37:
      newDirection = "left";
      break;
    case 38:
      newDirection = "up";
      break;
    case 39:
      newDirection = "right";
      break;
    case 40:
      newDirection = "down";
      break;
    default:
      return;
  }
  snake.setDirection(newDirection);
});

init();

function newGame() {
  clearInterval(intervalId);
  score = 0;
  snake = new Snake();
  apple = new Apple();
  apple.draw();
  intervalId = setInterval(gameLoop, 100);
}

// Add event listener for keydown event
document.addEventListener("keydown", function (event) {
  // Check if the pressed key is an arrow key
  if (event.keyCode >= 37 && event.keyCode <= 40) {
    // Prevent default behavior of arrow keys (scrolling the page)
    event.preventDefault();
    // Call the setDirection method of the snake object with the corresponding direction
    if (event.keyCode === 37) {
      snake.setDirection("left");
    } else if (event.keyCode === 38) {
      snake.setDirection("up");
    } else if (event.keyCode === 39) {
      snake.setDirection("right");
    } else if (event.keyCode === 40) {
      snake.setDirection("down");
    }
  }
});
