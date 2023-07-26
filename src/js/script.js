const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30
const snake = [
  {x: 200, y: 200},
  {x: 230, y: 200},
]

let direction

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
    snake.push({x: head.x + size, y: head.y})
  } else if (direction === "left") {
    snake.push({x: head.x - size, y: head.y})
  } else if (direction === "down") {
    snake.push({x: head.x, y: head.y + size})
  } else if (direction === "up") {
    snake.push({x: head.x, y: head.y - size})
  }

  snake.shift()
}

setInterval(function () {
  ctx.clearRect(0, 0, 600, 600)

  moveSnake()
  drawSnake()
}, 300)
