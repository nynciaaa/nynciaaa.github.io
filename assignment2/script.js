document.addEventListener("DOMContentLoaded", function () {
  // Get all the elements we need from the HTML
  const audio = document.getElementById("relaxAudio");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const playPauseIcon = document.getElementById("playPauseIcon");
  const prevButton = document.getElementById("prevTrack");
  const nextButton = document.getElementById("nextTrack");
  const volumeSlider = document.getElementById("volumeSlider");
  const volumeIcon = document.getElementById("volumeIcon");
  const progressBar = document.getElementById("audioProgress");
  const currentTimeDisplay = document.getElementById("currentTime");
  const durationDisplay = document.getElementById("duration");
  const loginButton = document.querySelector(".login-button");

  // The audio information
  const songTitle = "Ambient Waves";
  const songFile = "erokia_ambient-wave-56-msfxp7-78.mp3";
  const albumCoverImage = "album cover.jpg";

  // images sources for icon
  const playIcon = "icons8-play-90.png";
  const pauseIcon = "icons8-pause-90.png";
  const volumeOnIcon = "icons8-audio-90.png";
  const volumeOffIcon = "icons8-no-audio-90.png";

  // Set the initial volume
  audio.volume = 0.7;

  // Add click listeners to our buttons
  playPauseBtn.addEventListener("click", playOrPauseSong);
  prevButton.addEventListener("click", restartSong);
  nextButton.addEventListener("click", function () {
    // For simplicity, we'll just restart the song when next is clicked
    audio.currentTime = 0;
    audio.play();
    updatePlayButton(false); // Show pause icon
  });

  // Add change listener to volume slider
  volumeSlider.addEventListener("input", function () {
    audio.volume = volumeSlider.value;

    // Update the volume icon
    if (volumeSlider.value == 0) {
      volumeIcon.src = volumeOffIcon;
    } else {
      volumeIcon.src = volumeOnIcon;
    }
  });

  // Add click listener to volume icon to mute/unmute
  volumeIcon.addEventListener("click", function () {
    if (audio.muted) {
      // Unmute the audio
      audio.muted = false;
      volumeIcon.src = volumeOnIcon;
    } else {
      // Mute the audio
      audio.muted = true;
      volumeIcon.src = volumeOffIcon;
    }
  });

  // Update progress bar as song plays
  audio.addEventListener("timeupdate", updateProgress);

  // Update duration display when song loads
  audio.addEventListener("loadedmetadata", function () {
    durationDisplay.textContent = formatTime(audio.duration);
  });

  // Click on progress bar to skip to that part of the song
  document
    .querySelector(".progress-bar")
    .addEventListener("click", function (e) {
      // Get the width of the progress bar
      const width = this.clientWidth;
      // Get the click position
      const clickPosition = e.offsetX;
      // Calculate the percentage of the bar clicked
      const percent = clickPosition / width;
      // Set the song time to that percentage
      audio.currentTime = percent * audio.duration;
    });

  // Login button placeholder function
  loginButton.addEventListener("click", function () {
    alert("Login feature would go here!");
  });

  // Function to play or pause the song
  function playOrPauseSong() {
    if (audio.paused) {
      // If paused, play the song
      audio.play();
      updatePlayButton(false); // Show pause icon
    } else {
      // If playing, pause the song
      audio.pause();
      updatePlayButton(true); // Show play icon
    }
  }

  // Function to restart the song or go back to beginning
  function restartSong() {
    audio.currentTime = 0;
    updateProgress();
  }

  // Function to update the play/pause button
  function updatePlayButton(isPlayIcon) {
    if (isPlayIcon) {
      playPauseIcon.src = playIcon;
      playPauseIcon.alt = "Play";
    } else {
      playPauseIcon.src = pauseIcon;
      playPauseIcon.alt = "Pause";
    }
  }

  // Function to update the progress bar
  function updateProgress() {
    if (audio.duration) {
      // Calculate percentage played
      const percent = (audio.currentTime / audio.duration) * 100;
      // Update progress bar width
      progressBar.style.width = percent + "%";
      // Update current time display
      currentTimeDisplay.textContent = formatTime(audio.currentTime);
    }
  }

  // Function to format time as MM:SS
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Add leading zero if needed
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  // When song ends, reset to beginning
  audio.addEventListener("ended", function () {
    audio.currentTime = 0;
    updatePlayButton(true); // Show play icon
  });
});
