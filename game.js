/**
 * Main game control and input handling module.
 * Handles keyboard input, game lifecycle, audio, fullscreen,
 * orientation handling and the global game task engine.
 */

/** @type {HTMLCanvasElement|null} Canvas element used for rendering */
let canvas;

/** @type {World|null} Current game world instance */
let world;

/** @type {Keys} Keyboard input state container */
let keyboard = new Keys();

/** @type {Sounds} Global sound registry */
let sounds = new Sounds();

/**
 * Tracks keydown state to prevent repeated triggers.
 * @type {Object<string, boolean>}
 */
let isKeyDown = {};

/**
 * Registered game engine tasks.
 * @type {Array<{owner: object, action: Function, interval: number, lastRun: number}>}
 */
let gameTasks = [];

/** @type {boolean} Indicates whether the game is currently paused */
let gamePaused = true;

/** @type {boolean} Indicates whether the game has been started */
let gameRunning = false;

/** @type {boolean} Indicates whether music is enabled */
let music = localStorage.getItem("music") === "true";

/**
 * Global keydown listener.
 * Prevents repeated triggers while a key is held.
 */
window.addEventListener("keydown", (e) => {
  if (!isKeyDown[e.code]) handleKeyDown(e.code);
  isKeyDown[e.code] = true;
});

/**
 * Routes key codes to specific game actions.
 * Ignores input if the game is not running or already won.
 *
 * @param {string} code - Keyboard event code (e.g. "ArrowLeft", "Space")
 */
function handleKeyDown(code) {
  if (!world || !gameRunning) return;

  if (!world.gameWon) {
    if (code === "Space") keyboard.JUMP_ONCE = true;
    if (code === "KeyD") keyboard.THROW_ONCE = true;
    if (code === "ArrowLeft") keyboard.LEFT = true;
    if (code === "ArrowRight") keyboard.RIGHT = true;
    if (code === "KeyF") toggleFullscreen();
    if (code === "KeyS") toggleSound();
    if (code === "KeyP") togglePause();
    if (code === "KeyL") showLyrics();
  }
}

/**
 * Global keyup listener.
 * Resets movement keys when released.
 */
window.addEventListener("keyup", (e) => {
  isKeyDown[e.code] = false;
  if (e.code === "ArrowLeft") keyboard.LEFT = false;
  if (e.code === "ArrowRight") keyboard.RIGHT = false;
});

/**
 * Initializes UI state and binds mobile touch controls.
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
 * Starts a new game session.
 * Initializes the level, world and audio.
 */
function startGame() {
  gameRunning = true;
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
 * Toggles music on/off and persists the setting.
 */
function toggleSound() {
  music = !music;
  localStorage.setItem("music", music);

  if (!music) {
    stopAllGameSounds();
  } else if (!gamePaused && world) {
    const track = world.bossFirstContact
      ? sounds.BOSS_MUSIC
      : sounds.MUSIC;
    track.play();
  }
  init();
}

/**
 * Stops all currently playing sounds.
 */
function stopAllGameSounds() {
  Object.keys(sounds).forEach((key) => {
    const sound = sounds[key];
    if (sound && typeof sound.stop === "function") {
      sound.stop();
    }
  });
}

/**
 * Toggles fullscreen mode for the game container.
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
 * Global game engine loop.
 * Executes registered tasks at their defined intervals.
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
 * Registers a recurring task in the game engine.
 *
 * @param {object} owner - Object owning the task
 * @param {Function} action - Function to execute
 * @param {number} interval - Interval in milliseconds
 */
function addGameTask(owner, action, interval) {
  gameTasks.push({ owner, action, interval, lastRun: 0 });
}

/**
 * Removes all tasks belonging to a specific owner.
 *
 * @param {object} owner - Task owner
 */
function removeTasksOfObject(owner) {
  gameTasks = gameTasks.filter((task) => task.owner !== owner);
}

/**
 * Binds touch controls for mobile input.
 */
function bindTouchEvents() {
  /**
   * Helper for binding touch buttons.
   * @param {string} id - Button element ID
   * @param {string} key - Keyboard state key
   */
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
 * Pauses the game if the device is in portrait orientation.
 */
function checkOrientation() {
  if (gameRunning) {
    gamePaused = window.innerHeight > window.innerWidth;
  }
}

/**
 * Hides all overlay screens and shows in-game UI.
 */
function hideAllOverlays() {
  const overlays = ["startScreen", "winScreen", "loseScreen", "lyrics", "menu"];
  overlays.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("d-none");
  });
  document.getElementById("playButtons")?.classList.remove("d-none");
}

/**
 * Resets global game state variables.
 */
function resetGameState() {
  gamePaused = false;
  gameTasks = [];
}

/**
 * Displays the lyrics overlay.
 */
function showLyrics() {
  document.getElementById("lyrics").classList.remove("d-none");
}

/**
 * Toggles pause state and manages background music.
 */
function togglePause() {
  gamePaused = !gamePaused;

  if (gamePaused) {
    stopAllGameSounds();
  } else if (music) {
    const track = world?.bossFirstContact
      ? sounds.BOSS_MUSIC
      : sounds.MUSIC;
    track.play();
  }

  document
    .getElementById("btnPause")
    ?.classList.toggle("gamePaused", gamePaused);
}

/**
 * Displays the impressum screen.
 */
function impressum() {
  document.getElementById("impressum").classList.remove("d-none");
  document.getElementById("menu").classList.add("d-none");
}

/**
 * Hides overlays and restores the menu depending on game state.
 */
function hide() {
  document.getElementById("impressum").classList.add("d-none");
  document.getElementById("lyrics").classList.add("d-none");

  if (!gameRunning || gamePaused) {
    document.getElementById("menu").classList.remove("d-none");
  } else {
    document.getElementById("menu").classList.add("d-none");
  }
}