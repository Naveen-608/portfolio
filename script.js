/* ==================================
   FINITE REALISTIC CURSOR SNAKE
================================== */

const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

/* ---------- CANVAS ---------- */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ---------- CURSOR ---------- */
const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

/* ---------- CONFIG ---------- */
const SEGMENTS = 35;          // ✅ finite length
const SEGMENT_LENGTH = 10;    // ✅ fixed spacing
const HEAD_LERP = 0.25;       // responsiveness
const MAX_WIDTH = 6;

/* ---------- SNAKE DATA ---------- */
const snake = [];
for (let i = 0; i < SEGMENTS; i++) {
  snake.push({
    x: mouse.x,
    y: mouse.y,
  });
}

let time = 0;

/* ---------- MAIN LOOP ---------- */
function animateSnake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  time += 0.04;

  /* ---- HEAD (tight follow) ---- */
  snake[0].x += (mouse.x - snake[0].x) * HEAD_LERP;
  snake[0].y += (mouse.y - snake[0].y) * HEAD_LERP;

  /* ---- BODY (hard distance constraint) ---- */
  for (let i = 1; i < snake.length; i++) {
    const prev = snake[i - 1];
    const cur = snake[i];

    let dx = cur.x - prev.x;
    let dy = cur.y - prev.y;
    let dist = Math.hypot(dx, dy) || 0.0001;

    const angle = Math.atan2(dy, dx);

    // lock distance
    cur.x = prev.x + Math.cos(angle) * SEGMENT_LENGTH;
    cur.y = prev.y + Math.sin(angle) * SEGMENT_LENGTH;

    /* subtle slither */
    const wave = Math.sin(time - i * 0.4) * 0.6;
    cur.x += Math.cos(angle + Math.PI / 2) * wave;
    cur.y += Math.sin(angle + Math.PI / 2) * wave;
  }

  /* ---- DRAW ---- */
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let i = 0; i < snake.length - 1; i++) {
    const p1 = snake[i];
    const p2 = snake[i + 1];

    const t = i / snake.length;
    ctx.lineWidth = MAX_WIDTH * (1 - t) + 1;
    ctx.strokeStyle = `rgba(56, 189, 248, ${0.5 - t * 0.3})`;

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  requestAnimationFrame(animateSnake);
}

requestAnimationFrame(animateSnake);
