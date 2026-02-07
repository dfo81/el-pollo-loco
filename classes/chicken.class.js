/**
 * Represents a standard chicken enemy.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  y = 350;
  width = 82.66;
  height = 81;
  offset = { top: 20, bottom: 0, left: 0, right: 0 };
  IMAGES_WALKING = [
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];
  IMAGE_DEAD = 'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

  /**
   * Creates an instance of Chicken.
   * @param {number} x - The initial horizontal position.
   */
  constructor(x) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.isDead = false;
    this.x = x;
    this.speed = 0.25 + Math.random() * 0.2;
  }

  /**
   * Initiates the chicken's movement and animation loops.
   */
  animate() {
    addGameTask(this, () => this.handleMovement(), 1000 / 60);
    addGameTask(this, () => this.handleVisuals(), 120);
  }

  /**
   * Handles horizontal movement and respawning.
   */
  handleMovement() {
    if (!this.isDead) {
      this.moveLeft();
      if (this.x < -200) {
        this.x = 3000 + Math.random() * 1000;
      }
    }
  }

  /**
   * Handles the switching of walking or death images.
   */
  handleVisuals() {
    if (this.isDead) {
      this.loadImage(this.IMAGE_DEAD);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }
}