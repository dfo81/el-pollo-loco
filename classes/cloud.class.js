class Cloud extends MovableObject {
    y = Math.random() * 100;   
    height = 180;
    width = 300;
    speed = Math.random() * 0.5; 

    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.moveLeft(this.speed);
        this.x = x + Math.random() * 500;
    }
}