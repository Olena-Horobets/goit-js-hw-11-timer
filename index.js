class CountdownTimer {
  constructor(selector, date, onTick) {
    this.selector = selector;
    this.targetDate = new Date(date);
    this.onTick = onTick;
  }

  getTimeLeft() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();

      const deltaTime = this.targetDate - currentTime;
      const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);

      this.onTick({ days, hours, mins, secs });
    }, 1000);
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
}

const birthdayTimer = new CountdownTimer(
  "#timer-1",
  "Oct 19, 2021",
  updateClockFaceW
);

const bdRefs = {
  timer: document.querySelector(birthdayTimer.selector),

  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};
const timeValues = bdRefs.timer.querySelectorAll("span[data-value]");

function updateClockFaceW({ days, hours, mins, secs }) {
  bdRefs.days.textContent = days;
  bdRefs.hours.textContent = hours;
  bdRefs.mins.textContent = mins;
  bdRefs.secs.textContent = secs;
}

console.log(birthdayTimer.getTimeLeft());
