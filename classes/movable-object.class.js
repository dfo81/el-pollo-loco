class MovableObject {
  img;
  imageCache = {};
  currentImage = 0;

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
  
  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length;
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 120);
  }

   moveLeft(speed) {
        setInterval(() => {
            this.x -= 0.1 + speed;
        }, 1000 / 30);
    }
}
