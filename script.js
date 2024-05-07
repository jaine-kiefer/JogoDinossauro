const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;
const intervalTime = 1000/60; // ajuste paliativo

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping && !isGameOver) {
      jump();
    }
  }
}

function restartGame() {
  isGameOver = false;
  document.getElementById('overlay').classList.remove('visible');
}

function jump() {
  isJumping = true;
  const speed = 20;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= speed;
          dino.style.bottom = position + 'px';
        }
      }, intervalTime);
    } else {
      // Subindo
      position += speed;
      dino.style.bottom = position + 'px';
    }
  }, intervalTime);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  setTimeout(createCactus, randomTime);

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      background.removeChild(cactus);
      document.getElementById('overlay').classList.add('visible');
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, intervalTime);
}

createCactus();
document.addEventListener('keydown', handleKeyUp);
document.getElementById('restart').addEventListener('click', restartGame);