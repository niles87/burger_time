const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let imgArray;
const png = document.getElementById("burgerImg");

function Img(x, y, directionX, directionY, width, height) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.width = width;
  this.height = height;
}
Img.prototype.drawImg = function() {
  ctx.drawImage(png, this.x, this.y, this.width, this.height);
};

Img.prototype.updateImg = function() {
  if (this.x + this.width > canvas.width || this.x - this.width < -200) {
    this.directionX = -this.directionX;
  }
  if (this.y + this.height > canvas.height || this.y - this.height < -120) {
    this.directionY = -this.directionY;
  }
  this.x += this.directionX;
  this.y += this.directionY;
  this.drawImg();
};

function init() {
  imgArray = [];
  for (let i = 0; i < 1; i++) {
    let width = 200;
    let height = width * 0.6;
    let x = Math.random() * (innerWidth - width * 2);
    let y = Math.random() * (innerHeight - height * 2);
    let directionX = (Math.random() - 0.5) * 5;
    let directionY = (Math.random() - 0.5) * 5;

    imgArray.push(new Img(x, y, directionX, directionY, width, height));
  }
}

function beginAnimation() {
  requestAnimationFrame(beginAnimation);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let j = 0; j < imgArray.length; j++) {
    imgArray[j].updateImg();
  }
}

init();
beginAnimation();

window.addEventListener("resize", function() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});
