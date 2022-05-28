import Notiflix from 'notiflix';
const inputDelay = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputAmount = document.querySelector('[name="amount"]');
const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  let position = 0;
  let delay = 0;
  for (let i = 0; i < inputAmount.value; i += 1) {
    position += 1;
    if (i === 0) {
      delay = Number(inputDelay.value);
    } else {
      delay = delay + Number(inputStep.value);
    }

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
