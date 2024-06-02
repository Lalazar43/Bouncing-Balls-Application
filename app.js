var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var balls = [];
var gravity = 0.5;
var bounce = 0.7;
var count = 0;
var xFriction = 0.1;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var createBall = function (x, y) {
  return {
    x: x,
    y: y,
    radius: Math.round(Math.random() * 5) * 10 + 10,
    vx: Math.random() * 10 - 5,
    vy: Math.random() * -7,
    color: "rgb(209, 209, 209)",
  };
};
window.addEventListener("click", function (event) {
  if (count < 15) {
    var ball = createBall(event.clientX, event.clientY);
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
var draw = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach(function (ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
    ballMovement(ball);
  });
};
var ballMovement = function (ball) {
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
var applyFriction = function (ball) {
  if (ball.vx > 0) {
    ball.vx -= xFriction;
    if (ball.vx < 0) ball.vx = 0;
  }
  if (ball.vx < 0) {
    ball.vx += xFriction;
    if (ball.vx > 0) ball.vx = 0;
  }
};
var interval;
