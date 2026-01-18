let canvas;
let world;
let keyboard = new Keys();
let sounds = new Sounds();
let isKeyDown = {};
let gameTasks = [];
let gamePaused = true;
let music = localStorage.getItem("music") === "true";

window.addEventListener("keydown", (e) => {
  if (!isKeyDown[e.code]) {
    if (e.code === "Space") keyboard.JUMP_ONCE = true;
    if (e.code === "KeyD") keyboard.THROW_ONCE = true;
    if (e.code === "ArrowLeft") keyboard.LEFT = true;
    if (e.code === "ArrowRight") keyboard.RIGHT = true;
    if (e.code === "KeyF") toggleFullscreen();
    if (e.code === "KeyS") toggleMusic();
  }
  isKeyDown[e.code] = true;
});

window.addEventListener("keyup", (e) => {
  isKeyDown[e.code] = false;
  if (e.code === "ArrowLeft") keyboard.LEFT = false;
  if (e.code === "ArrowRight") keyboard.RIGHT = false;
});

function init() {
  bindTouchEvents();
  if (music) {
    musicBtn.classList.add("music-on");
    musicBtn.classList.remove("music-off");
  } else {
    musicBtn.classList.add("music-off");
    musicBtn.classList.remove("music-on");
  }
}

function startGame() {
  document.getElementById("startScreen").classList.add("d-none");
  canvas = document.getElementById("canvas");
  document.getElementById("playButtons").classList.remove("d-none");
  world = new World(canvas, keyboard, sounds);
  world.startGame();
  document.getElementsByClassName("menu")[0].classList.add("d-none");
  gamePaused = false;
}

function pauseGame() {
  gamePaused = true;
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
  localStorage.setItem("music", music);
  if (music) {
    sounds.MUSIC.play();
  } else {
    sounds.MUSIC.stop();
  }
  init();
}

// Prüft beim Laden und bei jeder Größenänderung die Orientierung
window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);

function checkOrientation() {
  // Wenn die Höhe größer als die Breite ist (Portrait)
  if (window.innerHeight > window.innerWidth) {
    gamePaused = true;
  } else {
    gamePaused = false;
  }
}

function toggleFullscreen() {
  let container = document.getElementById("game");
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch((err) => {
      console.log(`Fehler beim Aktivieren des Vollbildmodus: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

function bindTouchEvents() {
    const bindBtn = (id, key) => {
        const btn = document.getElementById(id);
        btn.addEventListener('touchstart', (e) => { e.preventDefault(); keyboard[key] = true; });
        btn.addEventListener('touchend', (e) => { e.preventDefault(); keyboard[key] = false; });
    };

    bindBtn('btnLeft', 'LEFT');
    bindBtn('btnRight', 'RIGHT');
    bindBtn('btnJump', 'JUMP_ONCE');
    bindBtn('btnThrow', 'THROW_ONCE');
}