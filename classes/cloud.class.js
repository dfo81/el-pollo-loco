class Cloud extends MovableObject {
    y = Math.random() * 100;   
    height = 180;
    width = 300;

    constructor(imgPath, x, speedModifier) {
        super().loadImage(imgPath);
        this.x = x + Math.random() * 500;
        this.speedModifier = speedModifier || 0.25;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}

function createCloudLevel(count) {
    let clouds = [];
    for (let i = 0; i < count; i++) {
        let x = Math.random() * 2500; 
        let speed = 0.2 + Math.random() * 0.6; 
        let imgIndex = (i % 2) + 1;
        
        clouds.push(
            new Cloud(`assets/img/5_background/layers/4_clouds/${imgIndex}.png`, x, speed)
        );
    }
    return clouds;
}