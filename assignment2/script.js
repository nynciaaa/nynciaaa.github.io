let countdownInterval;

document.getElementById("startButton").addEventListener("click", () => {
  // Show the timer adjustment controls after START button is clicked
  document.getElementById("timerSetup").style.display = "block";
  document.getElementById("startButton").style.display = "none";
});

document.getElementById("startTimerButton").addEventListener("click", () => {
  // Get the hours, minutes, and seconds values from the input fields
  let hours = parseInt(document.getElementById("hours").value) || 0;
  let minutes = parseInt(document.getElementById("minutes").value) || 0;
  let seconds = parseInt(document.getElementById("seconds").value) || 0;

  // Convert to total seconds (for accurate countdown)
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;

  // Hide the setup section and show the countdown
  document.getElementById("timerSetup").style.display = "none";
  document.getElementById("countdown").style.display = "block";

  // Display the initial time on the page
  document.getElementById("timeDisplay").textContent = formatTime(totalSeconds);

  // ▶️ Start relaxing audio
  const audio = document.getElementById("relaxAudio");
  audio.currentTime = 0;
  audio.play();

  // Start the countdown
  countdownInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(countdownInterval); // Stop the timer
      document.getElementById("countdown").style.display = "none"; // Hide countdown
      document.getElementById("timesUpButton").style.display = "block"; // Show TIMES UP!

      // ⏹️ Stop audio
      audio.pause();
      audio.currentTime = 0;
    } else {
      totalSeconds--;
      document.getElementById("timeDisplay").textContent =
        formatTime(totalSeconds);
    }
  }, 1000);
});

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const sec = (seconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${sec}`;
}

// Function to reset the timer when "TIMES UP!" is clicked
function resetTimer() {
  // Hide the "TIMES UP!" button and reset the display
  document.getElementById("timesUpButton").style.display = "none";
  document.getElementById("countdown").style.display = "none";
  document.getElementById("startButton").style.display = "inline-block";

  // ⏹️ Stop and reset audio
  const audio = document.getElementById("relaxAudio");
  audio.pause();
  audio.currentTime = 0;
}
