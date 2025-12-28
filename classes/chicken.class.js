class Chicken extends MovableObject {
  y = 365;
  width = 62;
  height = 60.75;
  offset = {
    top: 10,
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
    this.x = x || 200 + Math.random() * 500;
    this.speed = 0.25 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    // Intervall 1: Bewegung
    this.moveInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    // Intervall 2: Animation
    this.animationInterval = setInterval(() => {
      if (this.isDead) {
        this.loadImage(this.IMAGE_DEAD); // Zeige totes Bild
      } else {
        this.playAnimation(this.IMAGES_WALKING); // Laufe normal
      }
    }, 120);
  }
}

function createEnemyLevel(count) {
    let enemies = [new Boss()]; 
    for (let i = 0; i < count; i++) {
        let x = 600 + Math.random() * 2500; 
        enemies.push(new Chicken(x));
    }
    return enemies;
}