const body = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let startId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const onClick = () => {
  startId = setInterval(() => {
    body.setAttribute('style', `background-color:${getRandomHexColor()}`);
  }, 1000);
  btnStart.removeEventListener('click', onClick);
};

btnStart.addEventListener('click', onClick);

btnStop.addEventListener('click', () => {
  clearInterval(startId);
  btnStart.addEventListener('click', onClick);
});
