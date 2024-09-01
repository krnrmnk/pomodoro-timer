const pomodoroTime = document.querySelector('#pomodoro-time');
const startButton = document.querySelector('#start');

let time = 25 * 60;
let countdown;
let isPomodoro = true;

function updateTime() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secondsStr = seconds < 10 ? '0' + seconds : seconds;
    pomodoroTime.textContent = `${minutesStr}:${secondsStr}`;
}

function startCountdown() {
    countdown = setInterval(() => {
        time--;
        updateTime();
        if (time === 0) {
            resetTimer();
        }
    }, 100);
}

function resetTimer() {
    clearInterval(countdown);
    startButton.textContent = 'Start';
    if (isPomodoro) {
        time = 25 * 60;
    } else {
        time = 5 * 60;
    }
    updateTime();
}

function switchMode() {
    isPomodoro = !isPomodoro;
    if (isPomodoro) {
        time = 1500;
    } else {
        time = 300;
    }
    clearInterval(countdown);
    updateTime();
    startButton.textContent = 'Start';
}

startButton.addEventListener('click', () => {
    if (startButton.textContent === 'Start') {
        startButton.textContent = 'Stop';
        startCountdown();
    } else {
        startButton.textContent = 'Start';
        clearInterval(countdown);
    }
});

document.querySelector('#pomodoro').addEventListener('click', () => {
    switchMode();
});

document.querySelector('#break').addEventListener('click', () => {
    switchMode();
});

document.querySelector('#reset').addEventListener('click', () => {
    resetTimer();
});