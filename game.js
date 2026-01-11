let canvas;
let world;
let keyboard = new Keys();
let sounds = new Sounds();
let isKeyDown = {};
let gameTasks = [];
let gamePaused = false;
let music = localStorage.getItem("music") === "true";

window.addEventListener("keydown", (e) => {
  if (!isKeyDown[e.code]) {
    if (e.code === "Space") keyboard.JUMP_ONCE = true;
    if (e.code === "KeyD") keyboard.THROW_ONCE = true;
    if (e.code === "ArrowLeft") keyboard.LEFT = true;
    if (e.code === "ArrowRight") keyboard.RIGHT = true;
  }
  isKeyDown[e.code] = true;
});

window.addEventListener("keyup", (e) => {
  isKeyDown[e.code] = false;
  if (e.code === "ArrowLeft") keyboard.LEFT = false;
  if (e.code === "ArrowRight") keyboard.RIGHT = false;
});

function init() {
  if (music) {
    document.getElementById("music").classList.remove("music-off");
    document.getElementById("music").classList.add("music-on");
    sounds.MUSIC.play();
  } else {
    document.getElementById("music").classList.add("music-off");
    document.getElementById("music").classList.remove("music-on");
  }
}

function startGame() {
  document.getElementById("startScreen").classList.add("d-none");
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, sounds);
  world.startGame();
  document.getElementsByClassName("menu")[0].classList.add("d-none");
}

setInterval(() => {
  if (gamePaused) return;
  gameTasks.forEach((task) => {
    let now = Date.now();
    if (now - task.lastRun >= task.interval) {
      task.action();
      task.lastRun = now;
    }
  });
}, 1000 / 120);

function addGameTask(owner, action, interval) {
  gameTasks.push({
    owner: owner,
    action: action,
    interval: interval,
    lastRun: 0,
  });
}

function removeTasksOfObject(owner) {
  gameTasks = gameTasks.filter((task) => task.owner !== owner);
}

function toggleMusic() {
  music = !music;
  if (music) {
    sounds.MUSIC.play();
  } else {
    sounds.MUSIC.stop();
  }
  localStorage.setItem("music", music);
  init();
}
