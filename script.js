const dinoElement = document.querySelector('.dino');
const backgroundElement = document.querySelector('.background');

// estados
let isJumping = false;
let isGameOver = false;
let positionY = 0;

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

function handleClickOnBackground(event) {
  if (!isJumping && !isGameOver) {
    jump();
  }
}

function restartGame() {
  isGameOver = false;
  document.getElementById('overlay').classList.remove('visible');
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (positionY >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (positionY <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          positionY -= dinosaureSpeed;
          dinoElement.style.transform = `translateY(-${positionY}px)`;
        }
      }, intervalTime);
    } else {
      // Subindo
      positionY += dinosaureSpeed;
      dinoElement.style.transform = `translateY(-${positionY}px)`;
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
  backgroundElement.appendChild(cactus);
  cactus.style.transform = `translateX(${cactusPosition}px`;

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      backgroundElement.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && positionY < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      backgroundElement.removeChild(cactus);
      document.getElementById('overlay').classList.add('visible');
    } else {
      cactusPosition -= cactusSpeed;
      cactus.style.transform = `translateX(${cactusPosition}px`;
    }
  }, intervalTime);
}

createCactus();
document.addEventListener('keydown', handleKeyUp);
document.body.addEventListener('click', handleClickOnBackground);
document.getElementById('restart').addEventListener('click', restartGame);