class DrawablaObject {
  img;
  imageCache = {};
  currentImage = 0;
  opacity = 1;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "white";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
