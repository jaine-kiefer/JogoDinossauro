const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;
const intervalTime = 1000/60; // ajuste paliativo
const dinosaureSpeed = 17;
const cactusSpeedPerSecond = 160; // pixels por segundo
const cactusSpeed = cactusSpeedPerSecond / intervalTime; 

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

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= dinosaureSpeed;
          dino.style.transform = `translateY(-${position}px)`;
        }
      }, intervalTime);
    } else {
      // Subindo
      position += dinosaureSpeed;
      dino.style.transform = `translateY(-${position}px)`;
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
  cactus.style.transform = `translateX(${cactusPosition}px`;

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
      cactusPosition -= cactusSpeed;
      cactus.style.transform = `translateX(${cactusPosition}px`;
    }
  }, intervalTime);
}

createCactus();
document.addEventListener('keydown', handleKeyUp);
document.getElementById('restart').addEventListener('click', restartGame);