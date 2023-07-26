const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30
const snake = [{ x: 300, y: 300 }]

let direction
let loopId

function drawSnake() {
  ctx.fillStyle = "#ddd"
  snake.forEach(function (position, index) {
    if (index === snake.length - 1) {
      ctx.fillStyle = "white"
    }

    ctx.fillRect(position.x, position.y, size, size)
  })
}

function moveSnake() {
  if (!direction) return

  const head = snake[snake.length - 1]

  if (direction === "right") {
    snake.push({ x: head.x + size, y: head.y })
  } else if (direction === "left") {
    snake.push({ x: head.x - size, y: head.y })
  } else if (direction === "down") {
    snake.push({ x: head.x, y: head.y + size })
  } else if (direction === "up") {
    snake.push({ x: head.x, y: head.y - size })
  }

  snake.shift()
}

function drawGrid() {
  ctx.lineWidth = 1
  ctx.strokeStyle = "#191919"

  for (let i = 30; i < canvas.width; i += 30) {
    ctx.beginPath()
    ctx.lineTo(i, 0)
    ctx.lineTo(i, 600)
    ctx.stroke()

    ctx.beginPath()
    ctx.lineTo(0, i)
    ctx.lineTo(600, i)
    ctx.stroke()
  }
}

function gameLoop() {
  clearInterval(loopId)

  ctx.clearRect(0, 0, 600, 600)
  drawGrid()
  moveSnake()
  drawSnake()

  loopId = setTimeout(function () {
    gameLoop()
  }, 300)
}

gameLoop()

document.addEventListener("keydown", function ({ key }) {
  if (
    (key == "ArrowRight" && direction != "left") ||
    (key == "d" && direction != "left") ||
    (key == "D" && direction != "left")
  ) {
    direction = "right"
  } else if (
    (key == "ArrowLeft" && direction != "right") ||
    (key == "a" && direction != "right") ||
    (key == "A" && direction != "right")
  ) {
    direction = "left"
  } else if (
    (key == "ArrowDown" && direction != "up") ||
    (key == "s" && direction != "up") ||
    (key == "S" && direction != "up")
  ) {
    direction = "down"
  } else if (
    (key == "ArrowUp" && direction != "down") ||
    (key == "w" && direction != "down") ||
    (key == "W" && direction != "down")
  ) {
    direction = "up"
  }
})
