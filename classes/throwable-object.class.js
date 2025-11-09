class ThrowableObject extends MovableObject {
    height = 80;
    width = 80;

    constructor(x, y) {
        super().loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.throw(x, y);
    }

    throw() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 15;
        }, 1000 / 60);
    }
}