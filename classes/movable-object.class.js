class MovableObject {
  img;
  imageCache = {};
  currentImage = 0;
  otherDirection = false;
  x = 0;

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
  
   moveLeft(speed) {
        setInterval(() => {
            this.x -= 0.1 + speed;
        }, 1000 / 30);
    }
}
