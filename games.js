let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    
}

window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.key == ' ') {
         keyboard.JUMP = true;
    }
    if (e.key == 'd') {
        keyboard.THROW = true;
    }            
});

window.addEventListener('keyup', (e) => {
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.key == ' ') {
        keyboard.JUMP = false;
    }
    if (e.key == 'd') {
        keyboard.THROW = false;
    }            
});