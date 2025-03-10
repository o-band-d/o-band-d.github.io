const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");

canvas.width = 400;
canvas.height = 400;

const box = 20; // Snake's size
let snake, food, dx, dy, score, gameInterval;

function initGame() {
  snake = [{ x: 200, y: 200 }];
  dx = box;
  dy = 0;
  score = 0;

  spawnFood();

  restartBtn.style.display = "none"; // Hide restart button
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 100);
}

function spawnFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
  };
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowUp" && dy === 0) { dx = 0; dy = -box; }
  else if (event.key === "ArrowDown" && dy === 0) { dx = 0; dy = box; }
  else if (event.key === "ArrowLeft" && dx === 0) { dx = -box; dy = 0; }
  else if (event.key === "ArrowRight" && dx === 0) { dx = box; dy = 0; }
}

function update() {
  let newHead = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Check collisions with walls
  if (newHead.x < 0 || newHead.y < 0 || newHead.x >= canvas.width || newHead.y >= canvas.height) {
    gameOver();
    return;
  }

  // Check collision with itself
  for (let segment of snake) {
    if (newHead.x === segment.x && newHead.y === segment.y) {
      gameOver();
      return;
    }
  }

  // Check if snake eats food
  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    spawnFood();
  } else {
    snake.pop(); // Remove the tail
  }

  snake.unshift(newHead); // Add new head to the snake
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, box, box));

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
}

function gameLoop() {
  update();
  draw();
}

function gameOver() {
  clearInterval(gameInterval);
  restartBtn.style.display = "block";
}

function restartGame() {
  initGame();
}

initGame(); // Start the game
