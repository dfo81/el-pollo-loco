class Background extends MovableObject {
  height = 480;
  width = 720;
  y = 0;
  constructor(imgPath, x) {
    super().loadImage(imgPath);
    this.x = x;
  }
}
