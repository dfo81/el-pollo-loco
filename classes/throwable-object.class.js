/**
 * Represents a bottle thrown by the character, handling physics and splash.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  height = 80;
  width = 80;
  hasSplashed = false;

  IMAGES_BOTTLE = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  IMAGES_SPLASH = [
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates a bottle and starts the throw logic.
   * @param {number} x - Start X position.
   * @param {number} y - Start Y position.
   * @param {boolean} otherDirection - Direction flag.
   */
  constructor(x, y, otherDirection) {
    super().loadImage(this.IMAGES_BOTTLE[0]);
    this.loadImages(this.IMAGES_BOTTLE);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;

    this.otherDirection = otherDirection;
    this.throw();
    this.offset = {
      top: 30,
      bottom: 30,
      left: 15,
      right: 15,
    };
  }

  /**
   * Initiates the throw physics and animations.
   */
  throw() {
    this.speedY = 15;
    if (sounds.THROW) sounds.THROW.play();
    this.applyGravity();
    this.startFlightMovement();
    this.startRotation();
  }

  /**
   * Manages horizontal movement during flight.
   */
  startFlightMovement() {
  this.accelerationInterval = setInterval(() => {
    this.lastX = this.x;
    this.lastY = this.y;
    this.x += this.otherDirection ? -15 : 15;
  }, 15);
}

  /**
   * Starts the rotation animation for the flying bottle.
   */
  startRotation() {
    this.rotationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 75);
  }

  /**
   * Triggers the splash sequence and stops flight logic.
   */
  splash() {
    if (this.hasSplashed) return;
    this.hasSplashed = true;
    this.stopFlightLogic();
    this.playSplashSequence();
  }

  /**
   * Stops sound and flight intervals.
   */
  stopFlightLogic() {
    if (sounds.SPLASH) sounds.SPLASH.play();
    this.speedY = 0;
    clearInterval(this.accelerationInterval);
    clearInterval(this.rotationInterval);
  }

  /**
   * Executes the splash animation frames.
   */
  playSplashSequence() {
    this.loadImage(this.IMAGES_SPLASH[0]);
    this.splashFrameCount = 0;
    this.splashInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
      this.checkSplashEnd();
    }, 50);
  }

  /**
   * Checks if splash animation is finished and hides object.
   */
  checkSplashEnd() {
    this.splashFrameCount++;
    if (this.splashFrameCount >= this.IMAGES_SPLASH.length) {
      clearInterval(this.splashInterval);
      this.opacity = 0;
    }
  }
  
  /**
 * Swept collision check to prevent tunneling.
 * @param {MovableObject} enemy
 * @returns {boolean}
 */
isCollidingSwept(enemy) {
  const minX = Math.min(this.lastX, this.x);
  const maxX = Math.max(this.lastX + this.width, this.x + this.width);

  const minY = Math.min(this.lastY, this.y);
  const maxY = Math.max(this.lastY + this.height, this.y + this.height);

  return (
    maxX > enemy.x + enemy.offset.left &&
    minX < enemy.x + enemy.width - enemy.offset.right &&
    maxY > enemy.y + enemy.offset.top &&
    minY < enemy.y + enemy.height - enemy.offset.bottom
  );
}
}
