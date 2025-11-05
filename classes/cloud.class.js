class Cloud extends MovableObject {
    y = Math.random() * 100;   
    height = 180;
    width = 300;
    speed = Math.random() * 0.5; 

    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.x = x + Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}