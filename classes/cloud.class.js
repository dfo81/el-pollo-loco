class Cloud extends MovableObject {
    x = Math.random() * 2500;
    y = Math.random() * 100;   
    height = 180;
    width = 300;
    speed = Math.random() * 0.5; 

    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png')
        this.moveLeft(this.speed);
    }
}