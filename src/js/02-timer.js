import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetime = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let timerValue;
let timerValueMs;

const timeLength = e => {
  if (timerValue[e] < 10) {
    return `0${timerValue[e]}`;
  } else {
    return timerValue[e];
  }
};

const updateDate = () => {
  timerValue = convertMs(timerValueMs);

  days.textContent = timeLength('days');
  hours.textContent = timeLength('hours');
  minutes.textContent = timeLength('minutes');
  seconds.textContent = timeLength('seconds');
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() >= new Date().getTime()) {
      btnStart.disabled = false;
      timerValueMs = selectedDates[0].getTime() - new Date().getTime();
      updateDate();
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(datetime, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btnStart.disabled = true;
btnStart.addEventListener('click', () => {
  btnStart.disabled = true;

  const timerId = setInterval(() => {
    timerValueMs = timerValueMs - 1000;
    updateDate();
  }, 1000);
  setTimeout(() => {
    clearInterval(timerId);
    btnStart.disabled = false;
  }, timerValueMs);
});
