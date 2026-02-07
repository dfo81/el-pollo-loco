/**
 * Represents a small chicken (chick) enemy that can occasionally jump.
 * @extends MovableObject
 */
class Chicks extends MovableObject {
  width = 50;
  height = 50;
  offset = { top: 5, bottom: 0, left: 0, right: 0 };
  IMAGES_WALKING = [
    'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
  ];
  IMAGE_DEAD = 'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';

  /**
   * Creates an instance of Chicks.
   * @param {number} x - The initial horizontal position.
   */
  constructor(x) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.groundLevel = 370;
    this.y = 370;
    this.isDead = false;
    this.x = x;
    this.speed = 0.5 + Math.random() * 0.2;
    this.applyGravity();
  }

  /**
   * Initializes behavior loops: movement, jumping, and animations.
   */
  animate() {
    addGameTask(this, () => this.handleMovement(), 1000 / 60);
    addGameTask(this, () => this.handleJumpLogic(), 1000);
    addGameTask(this, () => this.handleVisuals(), 120);
  }

  /**
   * Manages horizontal movement and respawning logic.
   */
  handleMovement() {
    if (!this.isDead) {
      this.moveLeft();
      if (this.x < -200) {
        this.x = 3000 + Math.random() * 100;
      }
    }
  }

  /**
   * Handles random jumping behavior if on the ground.
   */
  handleJumpLogic() {
    if (!this.isDead && !this.isAboveGround()) {
      if (Math.random() > 0.7) {
        this.speedY = 10 + Math.random() * 2;
      }
    }
  }

  /**
   * Manages the switching between walking and dead images.
   */
  handleVisuals() {
    if (this.isDead) {
      this.loadImage(this.IMAGE_DEAD);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }
}