let canvas, world;
let keyboard = new Keys();
let sounds = new Sounds();
let gameTasks = [];
let gamePaused = true;
let music = localStorage.getItem("music") === "true";

function init() {
  updateMusicUI();
  updateMusicState();
  bindTouchEvents();
}

function updateMusicState() {
  sounds.MUSIC.stop();
  sounds.BOSS_MUSIC.stop();
  if (!music) return;
  if (world && world.bossFirstContact) {
    sounds.BOSS_MUSIC.play();
  } else {
    sounds.MUSIC.play();
  }
}

function updateMusicUI() {
  const musicBtn = document.getElementById("music");
  if (!musicBtn) return;
  musicBtn.classList.toggle("music-on", music);
  musicBtn.classList.toggle("music-off", !music);
}

function startGame() {
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("playButtons").classList.remove("d-none");
  document.querySelector(".menu").classList.add("d-none");
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, sounds);
  gamePaused = false;
}

function toggleMusic() {
  music = !music;
  localStorage.setItem("music", music);
  updateMusicUI();
  updateMusicState();
}

function toggleFullscreen() {
  const container = document.getElementById("game");
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(err => console.error("Fullscreen Error:", err));
  } else {
    document.exitFullscreen();
  }
}

window.addEventListener("keydown", (e) => {
  const keyMap = {
    "Space": "JUMP_ONCE",
    "KeyD": "THROW_ONCE",
    "ArrowLeft": "LEFT",
    "ArrowRight": "RIGHT"
  };

  if (keyMap[e.code]) keyboard[keyMap[e.code]] = true;
  if (e.code === "KeyF") toggleFullscreen();
  if (e.code === "KeyS") toggleMusic();
});

window.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft") keyboard.LEFT = false;
  if (e.code === "ArrowRight") keyboard.RIGHT = false;
});

function bindTouchEvents() {
  const controls = {
    "btnLeft": "LEFT",
    "btnRight": "RIGHT",
    "btnJump": "JUMP_ONCE",
    "btnThrow": "THROW_ONCE"
  };

  Object.entries(controls).forEach(([id, key]) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("touchstart", (e) => { e.preventDefault(); keyboard[key] = true; });
    btn.addEventListener("touchend", (e) => { e.preventDefault(); keyboard[key] = false; });
  });
}

setInterval(() => {
  if (gamePaused) return;
  const now = Date.now();
  gameTasks.forEach(task => {
    if (now - task.lastRun >= task.interval) {
      task.action();
      task.lastRun = now;
    }
  });
}, 1000 / 120);

function addGameTask(owner, action, interval) {
  gameTasks.push({ owner, action, interval, lastRun: 0 });
}

function removeTasksOfObject(owner) {
  gameTasks = gameTasks.filter(task => task.owner !== owner);
}

const checkOrientation = () => gamePaused = window.innerHeight > window.innerWidth;
window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);