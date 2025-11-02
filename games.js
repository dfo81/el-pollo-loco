let canvas;
let world;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);    
}

window.addEventListener('keydown', (e) => {
    if (e == 37) {
        LEFT = true;
    }
        console.log(e);
     
});