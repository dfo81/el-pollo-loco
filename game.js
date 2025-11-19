let canvas;
let world;
let keyboard = new Keyboard();
let sounds = new Sounds();
let isKeyDown = {};

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, sounds);
}

window.addEventListener("keydown", (e) => {
  if (!isKeyDown[e.code]) {
    if (e.code === "Space") keyboard.JUMP_ONCE = true;
    if (e.code === "KeyD") keyboard.THROW_ONCE = true;
    if (e.code === "ArrowLeft") (keyboard.LEFT = true), sounds.walk.play();
    if (e.code === "ArrowRight") (keyboard.RIGHT = true), sounds.walk.play();
  }
  isKeyDown[e.code] = true;
});

window.addEventListener("keyup", (e) => {
  isKeyDown[e.code] = false;
  if (e.code === "ArrowLeft") (keyboard.LEFT = false);
  if (e.code === "ArrowRight") (keyboard.RIGHT = false);
  if (!keyboard.LEFT && !keyboard.RIGHT) {
    sounds.walk.stop();
  }
});
