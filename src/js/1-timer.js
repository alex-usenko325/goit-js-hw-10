import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: {
    weekdays: {
      shorthand: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'], // Two-letter weekday abbreviations
      longhand: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
  },
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
      userSelectedDate = null;
    } else {
      startButton.disabled = false; // Activate button if valid date
      userSelectedDate = selectedDate;
      iziToast.success({
        title: 'Success',
        message: 'You have selected a valid date',
        position: 'topRight',
      });
    }
  },
};

// Initialize flatpickr
flatpickr(datetimePicker, options);

startButton.addEventListener('click', () => {
  if (userSelectedDate) {
    startButton.disabled = true;
    datetimePicker.disabled = true;
    startCountdown(userSelectedDate);
  }
});

function startCountdown(endDate) {
  clearInterval(timerInterval);

  function updateTime() {
    const now = new Date();
    const timeLeft = endDate - now;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay(0, 0, 0, 0);
      iziToast.info({
        title: "Time's up!",
        message: 'The countdown has ended.',
        position: 'topRight',
      });
      startButton.disabled = false; // Re-enable button after countdown ends
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimerDisplay(days, hours, minutes, seconds);
  }

  updateTime();
  timerInterval = setInterval(updateTime, 1000);
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
