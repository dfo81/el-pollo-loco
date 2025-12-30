let canvas;
let world;
let keyboard = new Keyboard();
let sounds = new Sounds();
let isKeyDown = {};

function startGame() {
  document.getElementById('startScreen').classList.add('d-none')
  sounds.MUSIC.play();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, sounds);
  world.startGame(); 
}

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
  if (e.code === "ArrowLeft") (keyboard.LEFT = false);
  if (e.code === "ArrowRight") (keyboard.RIGHT = false);
});