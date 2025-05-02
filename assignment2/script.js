// all the elements we need from the HTML
document.addEventListener("DOMContentLoaded", function () {
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
  const playlistItems = document.querySelectorAll(".playlist-items li");
  const folders = document.querySelectorAll(".folder");
  const trackNameDisplay = document.querySelector(".track-name");
  const albumArt = document.getElementById("albumArt");

  // music from playlist/ playlist data structure
  const playlist = [
    {
      title: "Ambient Waves",
      file: "erokia_ambient-wave-56-msfxp7-78.mp3",
      cover: "album cover.jpg",
    },
    {
      title: "Chill Lofi",
      file: "Chill Lofi.wav",
      cover: "lofi.jpg",
    },
    {
      title: "Relaxing Beat",
      file: "768428__lolamoore__relaxing-lo-fi-atmosphere-for-peaceful-moments.mp3",
      cover: "relaxing.jpg",
    },
  ];
  let currentTrackIndex = 0;

  // images sources for icon
  const playIcon = "icons8-play-90.png";
  const pauseIcon = "icons8-pause-90.png";
  const volumeOnIcon = "icons8-audio-90.png";
  const volumeOffIcon = "icons8-no-audio-90.png";
  // intial volume for music
  audio.volume = 0.7;

  loadTrack(currentTrackIndex);

  // click listeners for the buttons
  playPauseBtn.addEventListener("click", playOrPauseSong);
  prevButton.addEventListener("click", prevTrack);
  nextButton.addEventListener("click", nextTrack);

  volumeSlider.addEventListener("input", function () {
    audio.volume = volumeSlider.value;

    // update the volume icon
    if (volumeSlider.value == 0) {
      volumeIcon.src = volumeOffIcon;
    } else {
      volumeIcon.src = volumeOnIcon;
    }
  });

  volumeIcon.addEventListener("click", function () {
    if (audio.muted) {
      // unmute the audio
      audio.muted = false;
      volumeIcon.src = volumeOnIcon;
    } else {
      // mute the audio
      audio.muted = true;
      volumeIcon.src = volumeOffIcon;
    }
  });

  // progress bar for when the song plays
  audio.addEventListener("timeupdate", updateProgress);

  // update duration display when song loads
  audio.addEventListener("loadedmetadata", function () {
    durationDisplay.textContent = formatTime(audio.duration);
  });

  document
    .querySelector(".progress-bar")
    .addEventListener("click", function (e) {
      const width = this.clientWidth;
      const clickPosition = e.offsetX;
      const percent = clickPosition / width;
      audio.currentTime = percent * audio.duration;
    });

  loginButton.addEventListener("click", function () {
    alert("Login feature would go here");
  });

  // the code below adds event listeners to a set of playlist items in the music player application. 
  // it loops through each element in playlistItems
  // this loads the selected track from the playlist
  playlistItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
      playlistItems.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
      loadTrack(index);
      playTrack();
    });
  });

  function loadTrack(index) {
    currentTrackIndex = index;

    audio.src = playlist[index].file;

    trackNameDisplay.textContent = playlist[index].title;

    albumArt.src = playlist[index].cover;

    playlistItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
    progressBar.style.width = "0%";
    currentTimeDisplay.textContent = "00:00";
    audio.load();
  }

  function playTrack() {
    audio.play();
    updatePlayButton(false);
  }

  // Function to pause the track
  function pauseTrack() {
    audio.pause();
    updatePlayButton(true);
  }

  function prevTrack() {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
    } else {
      let prevIndex = currentTrackIndex - 1;
      if (prevIndex < 0) {
        prevIndex = playlist.length - 1;
      }
      loadTrack(prevIndex);
      playTrack();
    }
  }

  function nextTrack() {
    let nextIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(nextIndex);
    playTrack();
  }

  function playOrPauseSong() {
    if (audio.paused) {
      playTrack();
    } else {
      pauseTrack();
    }
  }

  function updatePlayButton(isPlayIcon) {
    if (isPlayIcon) {
      playPauseIcon.src = playIcon;
      playPauseIcon.alt = "Play";
    } else {
      playPauseIcon.src = pauseIcon;
      playPauseIcon.alt = "Pause";
    }
  }

  // function to update the progress bar
  function updateProgress() {
    if (audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = percent + "%";
      currentTimeDisplay.textContent = formatTime(audio.currentTime);
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  // this function converts a total number of seconds into a formatted time string in the format
  // first it takes the  number of seconds as input
  // calculates how many full minutes are in that time (by dividing by 60)
  // calculates the remaining seconds
  // ensures both numbers have two digits by adding leading zeros if needed (using padstart())
  // returns the formatted time string like "04:35"
  // this was used for media players to display audio/video duration and current position

  audio.addEventListener("ended", function () {
    nextTrack();
  });
});
