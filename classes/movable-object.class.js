class MovableObject extends DrawableObject {
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  groundLevel = 130;
  currentImage = 0;
  lastHit = 0;
  lastAnimationTime = 0;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  applyGravity() {
    addGameTask(this, () => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        if (!(this instanceof ThrowableObject)) {
          this.y = this.groundLevel;
          this.speedY = 0;
        }
      }
    }, 15);
  }

  isAboveGround() {
  if (this instanceof ThrowableObject) {
    return true;
  } else if (this instanceof Character && this.isDying && this.energy <= 0) {
    // Er fällt erst durch den Boden, wenn die Pause vorbei ist (energy ist dann 0)
    return true;
  } else {
    return this.y < this.groundLevel;
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
    sounds.HURT.play();
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
      this.speedY = 25;
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
    if (!this.isAboveGround()) {
      this.speedY = 20;
      sounds.JUMP.play();
      sounds.WALK.stop();
    }
  }
}
