interface Ball {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
}

let canvas = document.querySelector("canvas") as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let balls: Ball[] = [];
const gravity: number = 0.5;
const bounce: number = 0.7;
let count: number = 0;
const xFriction: number = 0.1;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const createBall = (x: number, y: number): Ball => {
  return {
    x: x,
    y: y,
    radius: Math.round(Math.random() * 5) * 10 + 10,
    vx: Math.random() * 10 - 5,
    vy: Math.random() * -7,
    color: "rgb(209, 209, 209)",
  };
};

window.addEventListener("click", (event: MouseEvent) => {
  if (count < 15) {
    let ball = createBall(event.clientX, event.clientY);
    balls.push(ball);
    if (!interval) {
      interval = setInterval(draw, 1000 / 35);
    }
    count += 1;
  }
});
ctx.fillStyle = "rgb(209, 209, 209)";
ctx.font = "bold 48px sans-serif";
ctx.fillText("Click on the screen to create new balls", 350, 100);
const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();

    ballMovement(ball);
  });
};

const ballMovement = (ball: Ball) => {
  ball.x += ball.vx;
  ball.y += ball.vy;
  ball.vy += gravity;

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.vx *= -1;
  }
  if (ball.y + ball.radius > canvas.height) {
    ball.y = canvas.height - ball.radius;
    ball.vy *= -bounce;
    if (ball.vy < 0 && ball.vy > -2.1) {
      ball.vy = 0;
    }
    if (Math.abs(ball.vx) < 1.1) {
      ball.vx = 0;
    }
    applyFriction(ball);
  }
};

const applyFriction = (ball: Ball) => {
  if (ball.vx > 0) {
    ball.vx -= xFriction;
    if (ball.vx < 0) ball.vx = 0;
  }
  if (ball.vx < 0) {
    ball.vx += xFriction;
    if (ball.vx > 0) ball.vx = 0;
  }
};

let interval: NodeJS.Timer | undefined;
