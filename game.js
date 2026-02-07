/** @type {HTMLCanvasElement} */
let canvas;
/** @type {World} */
let world;
/** @type {Keys} */
let keyboard = new Keys();
/** @type {Sounds} */
let sounds = new Sounds();
/** @type {Object<string, boolean>} */
let isKeyDown = {};
/** @type {Array<{owner: object, action: function, interval: number, lastRun: number}>} */
let gameTasks = [];
/** @type {boolean} */
let gamePaused = true;
/** @type {boolean} */
let music = localStorage.getItem("music") === "true";

window.addEventListener("keydown", (e) => {
  if (!isKeyDown[e.code]) handleKeyDown(e.code);
  isKeyDown[e.code] = true;
});

/**
 * Routes key codes to specific actions and updates state.
 * @param {string} code 
 */
function handleKeyDown(code) {
  if (code === "Space") keyboard.JUMP_ONCE = true;
  if (code === "KeyD") keyboard.THROW_ONCE = true;
  if (code === "ArrowLeft") keyboard.LEFT = true;
  if (code === "ArrowRight") keyboard.RIGHT = true;
  if (code === "KeyF") toggleFullscreen();
  if (code === "KeyS") toggleSound();
  if (code === "KeyP") togglePause();
  if (code === "KeyL") showLyrics();
}

window.addEventListener("keyup", (e) => {
  isKeyDown[e.code] = false;
  if (e.code === "ArrowLeft") keyboard.LEFT = false;
  if (e.code === "ArrowRight") keyboard.RIGHT = false;
});

/**
 * Updates music button appearance and binds touch events.
 */
function init() {
  const musicBtn = document.getElementById("music");
  if (musicBtn) {
    musicBtn.classList.toggle("music-on", music);
    musicBtn.classList.toggle("music-off", !music);
  }
  bindTouchEvents();
}

/**
 * Initializes world and starts gameplay.
 */
function startGame() {
  hideAllOverlays();
  removeTasksOfObject(world);
  initLevel();
  resetGameState();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, sounds);
  world.startGame();
  if (music) sounds.MUSIC.playFromStart();
}

/**
 * Persists sound setting and updates audio state.
 */
function toggleSound() {
  music = !music;
  localStorage.setItem("music", music);
  if (!music) {
    stopAllGameSounds();
  } else if (!gamePaused && world) {
    const track = world.bossFirstContact ? sounds.BOSS_MUSIC : sounds.MUSIC;
    track.play();
  }
  init();
}

/**
 * Halts every active sound in the registry.
 */
function stopAllGameSounds() {
  Object.keys(sounds).forEach(key => {
    const sound = sounds[key];
    if (sound && typeof sound.stop === 'function') {
      sound.stop();
    }
  });
}

/**
 * Handles canvas fullscreen toggle.
 */
function toggleFullscreen() {
  const container = document.getElementById("game");
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch((err) => console.warn(err));
  } else {
    document.exitFullscreen();
  }
}

/**
 * Global engine interval processing registered tasks.
 */
setInterval(() => {
  if (gamePaused) return;
  gameTasks.forEach((task) => {
    const now = performance.now();
    if (now - task.lastRun >= task.interval) {
      task.action();
      task.lastRun = now;
    }
  });
}, 1000 / 60);

/**
 * Queues a task for the engine.
 */
function addGameTask(owner, action, interval) {
  gameTasks.push({ owner, action, interval, lastRun: 0 });
}

/**
 * Clears tasks associated with an owner.
 */
function removeTasksOfObject(owner) {
  gameTasks = gameTasks.filter((task) => task.owner !== owner);
}

/**
 * Binds mobile touch listeners to movement keys.
 */
function bindTouchEvents() {
  const bindBtn = (id, key) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("touchstart", (e) => { e.preventDefault(); keyboard[key] = true; });
    btn.addEventListener("touchend", (e) => { e.preventDefault(); keyboard[key] = false; });
  };
  bindBtn("btnLeft", "LEFT");
  bindBtn("btnRight", "RIGHT");
  bindBtn("btnJump", "JUMP_ONCE");
  bindBtn("btnThrow", "THROW_ONCE");
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);

/**
 * Pauses game if screen is in portrait.
 */
function checkOrientation() {
  gamePaused = window.innerHeight > window.innerWidth;
}

/**
 * Hides UI overlays and shows play buttons.
 */
function hideAllOverlays() {
  const overlays = ["startScreen", "winScreen", "loseScreen", "lyrics", "menu"];
  overlays.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("d-none");
  });
  document.getElementById("playButtons")?.classList.remove("d-none");
}

/**
 * Resets engine state variables.
 */
function resetGameState() {
  gamePaused = false;
  gameTasks = [];
}

/**
 * Toggles lyrics UI and game pause state.
 */
function showLyrics() {
  const lyrics = document.getElementById("lyrics");
  if (!lyrics) return;
  lyrics.classList.toggle("d-none");
  const pauseBtn = document.getElementById("btnPause");
  if (pauseBtn) pauseBtn.style.visibility = lyrics.classList.contains("d-none") ? "visible" : "hidden";
  if (world) togglePause();
}

/**
 * Switches pause state and manages environmental audio.
 */
function togglePause() {
  gamePaused = !gamePaused;
  if (gamePaused) {
    stopAllGameSounds();
  } else if (music) {
    const track = world?.bossFirstContact ? sounds.BOSS_MUSIC : sounds.MUSIC;
    track.play();
  }
  document.getElementById("btnPause")?.classList.toggle("gamePaused", gamePaused);
}