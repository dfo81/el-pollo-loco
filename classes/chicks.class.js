/**
 * Represents a small chicken (chick) enemy that can occasionally jump.
 * @extends MovableObject
 */
class Chicks extends MovableObject {
  /** @type {number} */
  width = 50;
  /** @type {number} */
  height = 50;
  
  /** @type {{top: number, bottom: number, left: number, right: number}} */
  offset = {
    top: 5,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /** @type {string[]} */
  IMAGES_WALKING = [
    'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
  ];

  /** @type {string} */
  IMAGE_DEAD = 'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';

  /**
   * Creates an instance of Chicks.
   * @param {number} x - The initial horizontal position.
   */
  constructor(x) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    /** @type {number} */
    this.groundLevel = 370;
    this.y = 370;
    /** @type {boolean} */
    this.isDead = false;
    this.x = x;
    /** @type {number} */
    this.speed = 0.5 + Math.random() * 0.2;
    this.applyGravity();
  }

  /**
   * Initializes behavior loops: movement, random jumping, and animation frames.
   */
  animate() {
    // Basic movement to the left
    addGameTask(this, () => {
      if (!this.isDead) {
        this.moveLeft();
        if (this.x < -200) {
          this.x = 3000 + Math.random() * 100; 
        }
      }
    }, 1000 / 60);

    // Random jump logic (approx. 30% chance every second)
    addGameTask(this, () => {
        if (!this.isDead && !this.isAboveGround()) {
            if (Math.random() > 0.7) { 
                this.speedY = 10 + Math.random() * 2; 
            }
        }
    }, 1000);

    // Visual animation states
    addGameTask(this, () => {
      if (this.isDead) {
        this.loadImage(this.IMAGE_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 120);
  }
}