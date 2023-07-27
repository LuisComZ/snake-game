const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const audio = new Audio("../src/assets/audio.mp3")

const size = 30
const snake = [{ x: 300, y: 300 }]

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function randomPosition() {
  const number = randomNumber(0, canvas.width - size)
  return Math.round(number / 30) * 30
}

function randomColor() {
  const red = randomNumber(0, 255)
  const green = randomNumber(0, 255)
  const blue = randomNumber(0, 255)

  return `rgb(${red}, ${green}, ${blue})`
}

const food = {
  x: randomPosition(),
  y: randomPosition(),
  color: randomColor(),
}

let direction
let loopId

function drawFood() {
  const { x, y, color } = food

  ctx.shadowColor = color
  ctx.shadowBlur = 16
  ctx.fillStyle = food.color
  ctx.fillRect(x, y, size, size)
  ctx.shadowBlur = 0
}

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

function checkEat() {
  const head = snake[snake.length - 1]

  if (head.x === food.x && head.y === food.y) {
    snake.push(head)
    audio.play()

    let x = randomPosition()
    let y = randomPosition()

    while (snake.find((position) => position.x == x && position.y == y)) {
      x = randomPosition()
      y = randomPosition()
    }

    food.x = x
    food.y = y
    food.color = randomColor()
  }
}

function gameLoop() {
  clearInterval(loopId)

  ctx.clearRect(0, 0, 600, 600)
  drawGrid()
  drawFood()
  moveSnake()
  drawSnake()
  checkEat()

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
