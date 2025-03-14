const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");

canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake, food, dx, dy, score, gameInterval;
let highScore = localStorage.getItem("highScore") || 0; // Load high score


function initGame() {
  snake = [{ x: 200, y: 200 }];
  dx = box;
  dy = 0;
  score = 0;

  spawnFood();

  restartBtn.style.display = "none"; 
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

  if (newHead.x < 0 || newHead.y < 0 || newHead.x >= canvas.width || newHead.y >= canvas.height ||
      snake.some(segment => newHead.x === segment.x && newHead.y === segment.y)) {
    gameOver();
    return;
  }

  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    spawnFood();
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

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
  ctx.fillText("High Score: " + highScore, 10, 40);
}

function gameLoop() {
  update();
  draw();
}

function gameOver() {
    clearInterval(gameInterval);
    restartBtn.style.display = "block"; 
  
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
  
    document.getElementById("highScoreText").textContent = highScore; // Update button text
  }
  

function restartGame() {
  initGame();
}

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


initGame();

