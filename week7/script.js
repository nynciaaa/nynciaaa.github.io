const airportAudio = document.querySelector("#airport-audio");
console.log(airportAudio);

//------------------------------------------------------------------------
// fetch the play button
const playButton = document.querySelector("#play-button");
console.log(playButton);

// listen to click events on the button
playButton.addEventListener("click", playAudio);

// function to play the audio
function playAudio() {
  airportAudio.play();
}

//-------------------------------------------------------------
const popSound = document.querySelector("#pop-sound");
console.log(popSound);

const popButton = document.querySelector("#pop-button");
console.log(popButton);

// listen to click events on the pop button
popButton.addEventListener("click", popAudio);

// function to play the pop sound
function popAudio() {
  popSound.play();
}
