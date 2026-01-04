class ThrowableObject extends MovableObject {
  height = 80;
  width = 80;
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

  constructor(x, y, otherDirection) {
    super().loadImage(this.IMAGES_BOTTLE[0]);
    this.loadImages(this.IMAGES_BOTTLE);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.throw(x, y);
  }

  throw() {
    this.speedY = 15;
    sounds.THROW.play();
    this.applyGravity();
    this.accelerationInterval = setInterval(() => {
      if (this.otherDirection) {
        this.x -= 15; // nach links werfen
      } else {
        this.x += 15; // nach rechts werfen
      }
    }, 15);
    this.rotationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 75);
  }

  splash() {
    if (this.hasSplashed) return;
    this.hasSplashed = true;
    sounds.SPLASH.play();
    this.speedY = 0;
    clearInterval(this.accelerationInterval);
    clearInterval(this.rotationInterval);

    this.loadImage(this.IMAGES_SPLASH[0]);
    this.splashFrameCount = 0;

    this.splashInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
      this.splashFrameCount++;

      if (this.splashFrameCount >= this.IMAGES_SPLASH.length) {
        clearInterval(this.splashInterval);
        this.opacity = 0;
      }
    }, 50);
  }
}
