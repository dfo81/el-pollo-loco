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
        let x = Math.random() * 3000; // Verteilt über 3000 Pixel
        let speed = 0.2 + Math.random() * 0.6; // Zufälliger Parallax zwischen 0.2 und 0.8
        let imgIndex = (i % 2) + 1; // Wechselt zwischen 1.png und 2.png
        
        clouds.push(
            new Cloud(`assets/img/5_background/layers/4_clouds/${imgIndex}.png`, x, speed)
        );
    }
    return clouds;
}