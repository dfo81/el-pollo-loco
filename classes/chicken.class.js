class Chicken extends MovableObject {
  x = 100 + Math.random() * 500;
  y = 365;
  width = 62;
  height = 60.75;
  speed = 0.35 + Math.random();
  IMAGES_WALKING = [
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];
  
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
    this.moveLeft(this.speed);
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 120);
  }
}
