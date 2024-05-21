const toggleSound = { soundOn: true };

const soundOnElement = document.getElementById("sound-on");

const soundOffElement = document.getElementById("sound-off");

function toggleSoundOn(ev) {
  ev.target.classList.add("removed");
  soundOffElement.classList.remove("removed");
  toggleSound.soundOn = false;
}

function toggleSoundOff(ev) {
  ev.target.classList.add("removed");
  soundOnElement.classList.remove("removed");
  toggleSound.soundOn = true;
}

soundOnElement.addEventListener("click", toggleSoundOn);
soundOffElement.addEventListener("click", toggleSoundOff);

export default toggleSound;
