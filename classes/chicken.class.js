class Chicken extends MovableObject {
  y = 350;
  width = 82.66;
  height = 81;
  offset = {
    top: 0,
    bottom: 10,
    left: 0,
    right: 0,
  };
  IMAGES_WALKING = [
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];

  IMAGE_DEAD = 'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

  
  constructor(x) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.isDead = false;
    this.x = x;
    this.speed = 0.25 + Math.random() * 0.2;
    this.animate();
  }

  animate() {
    this.moveInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
        if (this.x < -200) {
          this.x = 3000 + Math.random() * 1000; 
        }
      }
    }, 1000 / 60);
    this.animationInterval = setInterval(() => {
      if (this.isDead) {
        this.loadImage(this.IMAGE_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 120);
  }
}

function createEnemyLevel(count) {
    let enemies = [new Boss()]; 
    for (let i = 0; i < count; i++) {
        let x = 800 + (i * 400) + (Math.random() * 200); 
        enemies.push(new Chicken(x));
    }
    return enemies;
}