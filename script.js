/*************************
 * THEME TOGGLE (UNCHANGED)
 *************************/
const toggle = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggle.textContent = "☀️";
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggle.textContent = "🌙";
  }
});

/*************************
 * CURSOR SNAKE BACKGROUND
 *************************/
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Mouse position
const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Snake settings
const segments = [];
const segmentCount = 25;
const segmentSpacing = 6;
const smoothness = 0.25;

// Initialize snake
for (let i = 0; i < segmentCount; i++) {
  segments.push({ x: mouse.x, y: mouse.y });
}

function animateSnake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Head follows cursor
  segments[0].x += (mouse.x - segments[0].x) * smoothness;
  segments[0].y += (mouse.y - segments[0].y) * smoothness;

  // Body follows head
  for (let i = 1; i < segments.length; i++) {
    const dx = segments[i - 1].x - segments[i].x;
    const dy = segments[i - 1].y - segments[i].y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > segmentSpacing) {
      segments[i].x += dx * 0.15;
      segments[i].y += dy * 0.15;
    }
  }

  // Draw snake
  ctx.beginPath();
  ctx.moveTo(segments[0].x, segments[0].y);

  for (let i = 1; i < segments.length; i++) {
    ctx.lineTo(segments[i].x, segments[i].y);
  }

  ctx.strokeStyle = "rgba(0, 150, 255, 0.35)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();

  requestAnimationFrame(animateSnake);
}

animateSnake();
