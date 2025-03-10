const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: Math.floor(Math.random() * (canvas.width / box)) * box, 
             y: Math.floor(Math.random() * (canvas.height / box)) * box };
let dx = box, dy = 0;
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowUp" && dy === 0) { dx = 0; dy = -box; }
  else if (event.key === "ArrowDown" && dy === 0) { dx = 0; dy = box; }
  else if (event.key === "ArrowLeft" && dx === 0) { dx = -box; dy = 0; }
  else if (event.key === "ArrowRight" && dx === 0) { dx = box; dy = 0; }
}

function update() {
  let newHead = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Collision with walls
  if (newHead.x < 0 || newHead.y < 0 || newHead.x >= canvas.width || newHead.y >= canvas.height) {
    alert("Game Over! Score: " + score);
    document.location.reload();
  }

  // Collision with itself
  for (let segment of snake) {
    if (newHead.x === segment.x && newHead.y === segment.y) {
      alert("Game Over! Score: " + score);
      document.location.reload();
    }
  }

  // Eat food
  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    food = { x: Math.floor(Math.random() * (canvas.width / box)) * box, 
             y: Math.floor(Math.random() * (canvas.height / box)) * box };
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
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

setInterval(gameLoop, 100);
