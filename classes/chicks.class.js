class Chicks extends MovableObject {
  width = 50;
  height = 50;
  offset = {
    top: 5,
    bottom: 0,
    left: 0,
    right: 0,
  };
  IMAGES_WALKING = [
    'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
  ];

  IMAGE_DEAD = 'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';

  
  constructor(x) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.groundLevel = 370;
    this.y = 370;
    this.isDead = false;
    this.x = x;
    this.speed = 0.5 + Math.random() * 0.2;
    this.applyGravity();
  }

  animate() {
    addGameTask(this, () => {
      if (!this.isDead) {
        this.moveLeft();
        if (this.x < -200) {
          this.x = 3000 + Math.random() * 100; 
        }
      }
    }, 1000 / 60);

    addGameTask(this, () => {
        if (!this.isDead && !this.isAboveGround()) {
            if (Math.random() > 0.7) { 
                this.speedY = 10 + Math.random() * 2; 
            }
        }
    }, 1000);

    addGameTask(this, () => {
      if (this.isDead) {
        this.loadImage(this.IMAGE_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 120);
  }
}