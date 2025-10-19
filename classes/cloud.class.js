class Cloud extends MovableObject {
  height = 216;
  width = 384;
  IMAGES_CLOUD = ["./img/5.Fondo/Capas/4.nubes/1.png", "./img/5.Fondo/Capas/4.nubes/2.png"];
  
  constructor() {
    super();
    let randomImage = this.IMAGES_CLOUD[Math.floor(Math.random() * this.IMAGES_CLOUD.length)];
    this.loadImage(randomImage);
    this.x = Math.random() * 3500;
    this.y = Math.random() * 100; 
    this.speed = 0.15 + Math.random() * 0.2;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
 