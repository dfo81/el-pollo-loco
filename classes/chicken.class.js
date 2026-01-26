/**
 * Represents a standard chicken enemy.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  /** @type {number} */
  y = 350;
  /** @type {number} */
  width = 82.66;
  /** @type {number} */
  height = 81;
  /** @type {{top: number, bottom: number, left: number, right: number}} */
  offset = {
    top: 20,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /** @type {string[]} */
  IMAGES_WALKING = [
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];

  /** @type {string} */
  IMAGE_DEAD = 'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

  /**
   * Creates an instance of Chicken.
   * @param {number} x - The initial horizontal position.
   */
  constructor(x) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    /** @type {boolean} */
    this.isDead = false;
    this.x = x;
    /** @type {number} */
    this.speed = 0.25 + Math.random() * 0.2;
  }

  /**
   * Initiates the chicken's movement and animation loops.
   * Handles both the movement to the left and the switching of walking/death frames.
   */
  animate() {
    addGameTask(this, () => {
      if (!this.isDead) {
        this.moveLeft();
        if (this.x < -200) {
          this.x = 3000 + Math.random() * 1000; 
        }
      }
    }, 1000 / 60);

    addGameTask(this, () => {
      if (this.isDead) {
        this.loadImage(this.IMAGE_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 120);
  }
}