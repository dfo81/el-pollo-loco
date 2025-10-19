class ThrowableObject extends MovableObject {
    height = 72;
    width = 72;


    constructor(x, y) {
        super().loadImage("./img/7.Marcadores/Icono/Botella.png");
        this.x = x;
        this.y = y;
        this.trow();
    }

    trow(){
        this.speedY = 17.5;
        this.applyGravity();
        setInterval(() => {
            this.x += 25;
        }, 25);
    }
}