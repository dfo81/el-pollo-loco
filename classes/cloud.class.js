class Cloud extends MovableObject {
  y = 50;
  height = 216;
  width = 384;
  speed = 0.1;

  constructor() {
    super().loadImage("./img/5.Fondo/Capas/4.nubes/1.png");
    this.x = Math.random() * 500;
    this.moveLeft();
  }
}
