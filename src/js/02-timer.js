import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const text = document.querySelector('#datetime-picker')
const timer = document.querySelector('.timer')
const start = document.querySelector('button[data-start]')
const seconds = document.querySelector('span[data-seconds]')
const minutes = document.querySelector('span[data-minutes]')
const hours = document.querySelector('span[data-hours]')
const days = document.querySelector('span[data-days]')

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future")
      start.disabled = true
    } else {
      start.disabled = false
    }
    console.log(selectedDates[0]);
  },
};

flatpickr(text, options)

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0')
}

start.addEventListener('click', () => {
  let timerStart = setInterval(() => {
    let diff = new Date(text.value) - new Date()
    start.disabled = true
    if (diff >= 0) {
      let time = convertMs(diff)
      days.textContent = addLeadingZero(time.days)
      hours.textContent = addLeadingZero(time.hours)
      minutes.textContent = addLeadingZero(time.minutes)
      seconds.textContent = addLeadingZero(time.seconds)
      if (diff <= 5000) {
        timer.style.color = 'red'
      }
    } else {
      Notiflix.Notify.success('Time is over')
      clearInterval(timerStart)
    }
  }, 1000)
})

