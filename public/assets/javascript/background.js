const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleArray;
const png = document.getElementById("burgerImg");

function Particle(x, y, directionX, directionY, size, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
}
Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};

Particle.prototype.updateParticle = function() {
  if (this.x + this.size > canvas.width || this.x - this.size < 0) {
    this.directionX = -this.directionX;
  }
  if (this.y + this.size > canvas.height || this.y - this.size < 0) {
    this.directionY = -this.directionY;
  }
  this.x += this.directionX;
  this.y += this.directionY;
  this.draw();
};

function init() {
  particleArray = [];
  for (let i = 0; i < 20; i++) {
    let size = Math.random() * 20 + 5;
    let x = Math.random() * (innerWidth - size * 2);
    let y = Math.random() * (innerHeight - size * 2);
    let directionX = Math.random() * 2 - 0.2;
    let directionY = Math.random() * 2 - 0.2;
    let color = "#f3e84f";

    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function beginAnimation() {
  requestAnimationFrame(beginAnimation);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let j = 0; j < particleArray.length; j++) {
    particleArray[j].updateParticle();
  }
}

init();
beginAnimation();

window.addEventListener("resize", function() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});
