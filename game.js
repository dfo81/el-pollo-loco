/** @type {HTMLCanvasElement} */
let canvas;
/** @type {World} */
let world;
/** @type {Keys} */
let keyboard = new Keys();
/** @type {Sounds} */
let sounds = new Sounds();
/** @type {Object<string, boolean>} - Tracks current physical key states to prevent repeat triggers. */
let isKeyDown = {};
/** @type {Array<{owner: object, action: function, interval: number, lastRun: number}>} */
let gameTasks = [];
/** @type {boolean} */
let gamePaused = true;
/** @type {boolean} - Persistent music setting from localStorage. */
let music = localStorage.getItem("music") === "true";

/**
 * Event listener for keydown events to update the keyboard state.
 */
window.addEventListener("keydown", (e) => {
  if (!isKeyDown[e.code]) {
    if (e.code === "Space") keyboard.JUMP_ONCE = true;
    if (e.code === "KeyD") keyboard.THROW_ONCE = true;
    if (e.code === "ArrowLeft") keyboard.LEFT = true;
    if (e.code === "ArrowRight") keyboard.RIGHT = true;
    if (e.code === "KeyF") toggleFullscreen();
    if (e.code === "KeyM") toggleMusic();
    if (e.code === "KeyP") togglePause();
    if (e.code === "KeyL") showLyrics();
  }
  isKeyDown[e.code] = true;
});

/**
 * Event listener for keyup events to reset movement keys.
 */
window.addEventListener("keyup", (e) => {
  isKeyDown[e.code] = false;
  if (e.code === "ArrowLeft") keyboard.LEFT = false;
  if (e.code === "ArrowRight") keyboard.RIGHT = false;
});

/**
 * Initializes the game UI states and updates music icons based on stored settings.
 */
function init() {
  const musicBtn = document.getElementById("music");
  if (!musicBtn) return;
  if (music) {
    musicBtn.classList.add("music-on");
    musicBtn.classList.remove("music-off");
  } else {
    musicBtn.classList.add("music-off");
    musicBtn.classList.remove("music-on");
  }
  bindTouchEvents();
}

/**
 * Resets the level, clears tasks, and starts a new world.
 */
function startGame() {
  document.getElementById("lyrics").classList.add("d-none");
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("menu").classList.add("d-none");
  document.getElementById("playButtons").classList.remove("d-none");
  document.getElementById('winScreen').classList.add('d-none');
  document.getElementById('loseScreen').classList.add('d-none');
  removeTasksOfObject(world);

  initLevel();
  gamePaused = false;
  gameTasks = []; 

  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, sounds);
  world.startGame();
  if (music) sounds.MUSIC.playFromStart();
}

/**
 * Toggles the music setting, persists it, and updates current audio playback.
 */
function toggleMusic() {
  music = !music;
  localStorage.setItem("music", music);
  
  if (music && !gamePaused) {
    if (world && world.bossFirstContact) {
      sounds.BOSS_MUSIC.play();
      sounds.MUSIC.stop();
      sounds.SCARED_BOSS.play();
    } else {
      sounds.MUSIC.play();
      sounds.SCARED_BOSS.stop();
    }
  } else {
    sounds.MUSIC.stop();
    sounds.BOSS_MUSIC.stop();
  }
  init();
}

/**
 * Toggles fullscreen mode for the game container.
 */
function toggleFullscreen() {
  const container = document.getElementById("game");
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch((err) => {
      console.warn(`Fullscreen error: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

/**
 * Global interval running at 60 FPS to process registered game tasks.
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
 * Registers a new task to be executed at a specific interval.
 * @param {object} owner - The object responsible for the task.
 * @param {function} action - The logic to execute.
 * @param {number} interval - Timing in milliseconds.
 */
function addGameTask(owner, action, interval) {
  gameTasks.push({
    owner: owner,
    action: action,
    interval: interval,
    lastRun: 0,
  });
}

/**
 * Filters the task array to remove all tasks of a specific owner.
 * @param {object} owner - The object whose tasks should be cleared.
 */
function removeTasksOfObject(owner) {
  gameTasks = gameTasks.filter((task) => task.owner !== owner);
}

/**
 * Sets up touch listeners for mobile control buttons.
 */
function bindTouchEvents() {
  const bindBtn = (id, key) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard[key] = true;
    });
    btn.addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard[key] = false;
    });
  };

  bindBtn("btnLeft", "LEFT");
  bindBtn("btnRight", "RIGHT");
  bindBtn("btnJump", "JUMP_ONCE");
  bindBtn("btnThrow", "THROW_ONCE");
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);

/**
 * Checks screen dimensions and pauses the game if in portrait mode.
 */
function checkOrientation() {
  gamePaused = window.innerHeight > window.innerWidth;
}

/**
 * Helper to hide all menu and info overlays.
 * Uses inline styles to ensure visibility is overridden and classes are sync.
 */
function hideAllOverlays() {
  const overlays = ["startScreen", "winScreen", "loseScreen", "lyrics", "menu"];
  overlays.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add("d-none");
      el.style.display = "none";
    }
  });
  document.getElementById("playButtons").classList.remove("d-none");
}

/**
 * Resets the global game state variables.
 */
function resetGameState() {
  gamePaused = false;
  gameTasks = [];
}

/**
 * Toggles visibility of the lyrics and handles game pause.
 */
function showLyrics() {
  const lyrics = document.getElementById("lyrics");
  const pauseBtn = document.getElementById("btnPause");
  if (!lyrics) return;

  lyrics.classList.toggle("d-none");
  const isOpen = !lyrics.classList.contains("d-none");

  // Pause-Button verstecken/zeigen & Spiel pausieren
  if (pauseBtn) pauseBtn.style.visibility = isOpen ? "hidden" : "visible";
  if (world) togglePause();
}

/**
 * Toggles the global pause state and manages sounds.
 */
function togglePause() {
  gamePaused = !gamePaused;
  if (gamePaused) {
    sounds.MUSIC.stop();
    sounds.BOSS_MUSIC.stop();
    sounds.WALK?.stop();
  } else if (music) {
    world?.bossFirstContact ? sounds.BOSS_MUSIC.play() : sounds.MUSIC.play();
  }
  document.getElementById("btnPause")?.classList.toggle("gamePaused", gamePaused);
}