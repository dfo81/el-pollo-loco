class MovableObject extends DrawablaObject {
  otherDirection = false;
  speedY = 0;
  acceleration = 0.75;
  offset = {
    top: 0,
    bottom: 20,
    left: 20,
    right: 20,
  };
  lastHit = 0;
  lastAnimationTime = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 130;
    }
  }
 
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    return timepassed < 750;
  }

  isDead() {
    return this.energy == 0;
  }

  moveLeft() {
    this.x -= this.speed;
  }
  moveRight() {
    this.x += this.speed;
   }

  playAnimation(images, fps) {
    let now = Date.now();
    let frameDuration = 1000 / fps;
    if (now - this.lastAnimationTime < frameDuration) {
      return; 
    }
    this.lastAnimationTime = now;
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 15;
  }
}
