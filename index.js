let initialText =
  "This is an advanced Artificial Inteligence robot speaking. Created by our friend Lucian. This can be Skynet in the future!";

const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset");
const textInput = document.getElementById("text");
const speedInput = document.getElementById("speed");
const repeat = document.getElementById("repeat");
const output = document.getElementById("output");
let currentCharacter;

playButton.addEventListener("click", () => {
  for (let i = 1; i <= repeat.value; i++) {
    if (textInput.value) {
      playText(textInput.value);
      output.innerHTML = textInput.value;
    } else {
      playText(initialText);
      output.innerHTML = initialText;
    }
  }
});

speedInput.addEventListener("input", () => {
  stopText();
  playText(utterance.text.substring(currentCharacter));
});

const utterance = new SpeechSynthesisUtterance();

utterance.addEventListener("end", () => {
  textInput.disabled = false;
});

utterance.addEventListener("boundary", (e) => {
  currentCharacter = e.charIndex;
});

const playText = (text) => {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }
  utterance.text = text;
  utterance.rate = speedInput.value || 1;
  textInput.disabled = true;
  speechSynthesis.speak(utterance);
};

const pauseText = () => {
  if (speechSynthesis.speaking) speechSynthesis.pause();
};

const stopText = () => {
  speechSynthesis.resume();
  speechSynthesis.cancel();
};

pauseButton.addEventListener("click", pauseText);
stopButton.addEventListener("click", stopText);
resetButton.addEventListener("click", () => {
  window.location.reload(true);
});
