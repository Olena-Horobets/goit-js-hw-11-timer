class CountdownTimer {
  constructor(selector, date, onTick) {
    this.selector = selector;
    this.targetDate = new Date(date);
    this.onTick = onTick;
    this.clockIdx = 0;
  }

  getTimeLeft() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();

      const deltaTime = this.targetDate - currentTime;
      const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);

      this.onTick({ days, hours, mins, secs });

      this.addClockAnimation(clockEls, doNext.bind(this));
    }, 1000);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  addClockAnimation(arr, cb) {
    cb(arr);
  }
}

const birthdayTimer = new CountdownTimer(
  '#timer-1',
  'Oct 19, 2022',
  updateClockFace,
);

const bdRefs = {
  timer: document.querySelector(birthdayTimer.selector),

  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};
const timeValues = bdRefs.timer.querySelectorAll('span[data-value]');

function updateClockFace({ days, hours, mins, secs }) {
  bdRefs.days.textContent = days;
  bdRefs.hours.textContent = hours;
  bdRefs.mins.textContent = mins;
  bdRefs.secs.textContent = secs;
}

birthdayTimer.getTimeLeft();

// Decorative clock
const clockEls = document.querySelectorAll('.clock-el');

function doNext(arr) {
  arr[this.clockIdx].classList.toggle('animate');
  this.clockIdx += 1;

  if (this.clockIdx < arr.length) {
  } else {
    this.clockIdx = 0;
  }
}
