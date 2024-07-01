let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;
let lapCounter = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function startStop() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(updateTime, 10); // Update every 10 milliseconds
    running = true;
    startStopBtn.textContent = "Stop";
    lapBtn.disabled = false;
    resetBtn.disabled = false;
  } else {
    clearInterval(tInterval);
    savedTime = difference;
    running = false;
    startStopBtn.textContent = "Start";
  }
}

function reset() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  savedTime = 0;
  display.textContent = "00:00:00:000";
  startStopBtn.textContent = "Start";
  lapBtn.disabled = true;
  resetBtn.disabled = true;
  laps.innerHTML = "";
  lapCounter = 0;
}

function lap() {
  lapCounter++;
  const li = document.createElement("li");
  li.textContent = `Lap ${lapCounter}: ${display.textContent}`;
  laps.appendChild(li);
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime + (savedTime || 0);

  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((difference % 1000) / 10);

  display.textContent = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds
    .toString()
    .padStart(2, "0")}`;
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);

// Initialize buttons
lapBtn.disabled = true;
resetBtn.disabled = true;
