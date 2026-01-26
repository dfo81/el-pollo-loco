/**
 * Extends DrawableObject to include physics, movement, and collision logic.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /** @type {boolean} - Indicates if the object is facing the opposite direction (left). */
  otherDirection = false;
  /** @type {number} - Current vertical speed. */
  speedY = 0;
  /** @type {number} - Rate at which speedY decreases. */
  acceleration = 1;
  /** @type {number} - The y-coordinate representing the floor for this object. */
  groundLevel = 130;
  /** @type {number} - Timestamp of the last successful hit taken. */
  lastHit = 0;
  /** @type {number} - Timestamp used to control animation frame rates. */
  lastAnimationTime = 0;
  /** @type {number} - Current health points. */
  energy = 100;
  
  /** * Boundaries used for fine-tuning collision detection.
   * @type {{top: number, bottom: number, left: number, right: number}} 
   */
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Applies constant downward force to the object if it is not on the ground.
   */
  applyGravity() {
    addGameTask(this, () => {
      if (this.isAboveGround() || this.speedY > 0 || this.energy <= 0) {
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

  /**
   * Checks if the object is currently in the air.
   * @returns {boolean}
   */
  isAboveGround() {
    if (this instanceof Boss) {
      return this.y < 50; // Korrigiert: Boss Logik sollte einen Vergleich zurückgeben
    }
    if (this instanceof ThrowableObject) {
      return true;
    } else if (this instanceof Character && this.energy <= 0) {
      return true;
    } else {
      return this.y < this.groundLevel;
    }
  }

  /**
   * Detects collision with another MovableObject considering the defined offsets.
   * @param {MovableObject} mo - The other object to check against.
   * @returns {boolean}
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces energy and updates the last hit timestamp.
   */
  hit() {
    if (sounds.HURT) sounds.HURT.play();
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
      this.speedY = 25; // Death jump effect
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object was hit recently (within the last 750ms).
   * @returns {boolean}
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    return timepassed < 750;
  }

  /**
   * Checks if the object's energy is zero.
   * @returns {boolean}
   */
  isDead() {
    return this.energy === 0;
  }

  /** Moves the object to the left based on its speed. */
  moveLeft() {
    this.x -= this.speed;
  }

  /** Moves the object to the right based on its speed. */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Cycles through an array of images to create an animation.
   * @param {string[]} images - Array of image paths.
   * @param {number} fps - Desired frames per second.
   */
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

  /**
   * Triggers a jump if the object is on the ground.
   */
  jump() {
    if (!this.isAboveGround()) {
      this.speedY = 20;
      if (sounds.JUMP) sounds.JUMP.play();
      if (sounds.WALK) sounds.WALK.stop();
    }
  }
}