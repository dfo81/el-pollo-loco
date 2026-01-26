/**
 * Represents the main playable character "Pepe".
 * @extends MovableObject
 */
class Character extends MovableObject {
  x = 50;
  y = 20;
  height = 300;
  width = 152.5;
  speed = 3.5;
  offset = { top: 150, bottom: 20, left: 50, right: 50 };
  energy = 100;
  coinsCount = 0;
  bottleCount = 0;
  deathTimer = 0;

  /** @type {string[]} */
  IMAGES_WALKING = ["assets/img/2_character_pepe/2_walk/W-21.png", "assets/img/2_character_pepe/2_walk/W-22.png", "assets/img/2_character_pepe/2_walk/W-23.png", "assets/img/2_character_pepe/2_walk/W-24.png", "assets/img/2_character_pepe/2_walk/W-25.png", "assets/img/2_character_pepe/2_walk/W-26.png"];
  /** @type {string[]} */
  IMAGES_IDLE = ["assets/img/2_character_pepe/1_idle/idle/I-1.png", "assets/img/2_character_pepe/1_idle/idle/I-2.png", "assets/img/2_character_pepe/1_idle/idle/I-3.png", "assets/img/2_character_pepe/1_idle/idle/I-4.png", "assets/img/2_character_pepe/1_idle/idle/I-5.png", "assets/img/2_character_pepe/1_idle/idle/I-6.png", "assets/img/2_character_pepe/1_idle/idle/I-7.png", "assets/img/2_character_pepe/1_idle/idle/I-8.png", "assets/img/2_character_pepe/1_idle/idle/I-9.png", "assets/img/2_character_pepe/1_idle/idle/I-10.png"];
  /** @type {string[]} */
  IMAGES_LONG_IDLE = ["assets/img/2_character_pepe/1_idle/long_idle/I-11.png", "assets/img/2_character_pepe/1_idle/long_idle/I-12.png", "assets/img/2_character_pepe/1_idle/long_idle/I-13.png", "assets/img/2_character_pepe/1_idle/long_idle/I-14.png", "assets/img/2_character_pepe/1_idle/long_idle/I-15.png", "assets/img/2_character_pepe/1_idle/long_idle/I-16.png", "assets/img/2_character_pepe/1_idle/long_idle/I-17.png", "assets/img/2_character_pepe/1_idle/long_idle/I-18.png", "assets/img/2_character_pepe/1_idle/long_idle/I-19.png", "assets/img/2_character_pepe/1_idle/long_idle/I-20.png"];
  /** @type {string[]} */
  IMAGES_JUMPING = ["assets/img/2_character_pepe/3_jump/J-31.png", "assets/img/2_character_pepe/3_jump/J-32.png", "assets/img/2_character_pepe/3_jump/J-33.png", "assets/img/2_character_pepe/3_jump/J-34.png", "assets/img/2_character_pepe/3_jump/J-35.png", "assets/img/2_character_pepe/3_jump/J-36.png", "assets/img/2_character_pepe/3_jump/J-37.png", "assets/img/2_character_pepe/3_jump/J-38.png", "assets/img/2_character_pepe/3_jump/J-39.png"];
  /** @type {string[]} */
  IMAGES_DEAD = ["assets/img/2_character_pepe/5_dead/D-51.png", "assets/img/2_character_pepe/5_dead/D-52.png", "assets/img/2_character_pepe/5_dead/D-53.png", "assets/img/2_character_pepe/5_dead/D-54.png", "assets/img/2_character_pepe/5_dead/D-55.png", "assets/img/2_character_pepe/5_dead/D-56.png", "assets/img/2_character_pepe/5_dead/D-57.png"];
  /** @type {string[]} */
  IMAGES_HURT = ["assets/img/2_character_pepe/4_hurt/H-41.png", "assets/img/2_character_pepe/4_hurt/H-42.png", "assets/img/2_character_pepe/4_hurt/H-43.png"];

  /**
   * Initializes Pepe, loads all image sets and starts gravity.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadAllImages();
    this.lastKeyPress = new Date().getTime();
    this.applyGravity();
  }

  /**
   * Preloads all animation image sequences into the cache.
   */
  loadAllImages() {
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
  }

  /**
   * Initiates the character's core logic and movement intervals.
   */
  start() {
    this.animate();
    this.moving();
  }

  /**
   * Updates coin count with a maximum limit of 100.
   */
  collectCoin() {
    this.coinsCount = Math.min(this.coinsCount + 5, 100);
  }

  /**
   * Updates bottle inventory with a maximum limit of 100.
   */
  collectBottle() {
    this.bottleCount = Math.min(this.bottleCount + 10, 100);
  }

  /**
   * Reduces bottle inventory by a fixed amount.
   */
  throwBottle() {
    this.bottleCount = Math.max(this.bottleCount - 10, 0);
  }

  /**
   * Sets up the task for choosing the correct animation frame based on state.
   */
  animate() {
    addGameTask(this, () => {
      if (!this.world?.keyboard) return;
      this.handleStateAnimations();
    }, 15);
  }

  /**
   * Orchestrates which animation set to play based on character status.
   */
  handleStateAnimations() {
    if (this.isDead()) {
      this.playDeathAnimation();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT, 5);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING, 10);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING, 15);
    } else {
      this.playIdleAnimations();
    }
  }

  /**
   * Plays the death sequence and handles the character falling off screen.
   */
  playDeathAnimation() {
    this.playAnimation(this.IMAGES_DEAD, 5);
    this.speedY = 0;
    this.acceleration = 0;
    this.deathTimer++;
    if (this.deathTimer > 20) this.y += 5;
  }

  /**
   * Switches between short and long idle animations based on inactivity.
   */
  playIdleAnimations() {
    let timer = new Date().getTime() - this.lastKeyPress;
    if (timer > 10000) {
      this.playAnimation(this.IMAGES_LONG_IDLE, 5);
    } else {
      this.playAnimation(this.IMAGES_IDLE, 5);
    }
  }

  /**
   * Executes hit logic and applies knockback if the character survives.
   */
  hit() {
    super.hit();
    this.resetIdleTimer();
    if (!this.isDead()) {
      this.speedY = 10;
      this.applyKnockback();
    }
  }

  /**
   * Calculates and applies a horizontal knockback effect when damaged.
   */
  applyKnockback() {
    let knockbackSpeed = this.otherDirection ? 15 : -15;
    let count = 0;
    let moveInterval = setInterval(() => {
      if (this.x + knockbackSpeed > 50) this.x += knockbackSpeed;
      count++;
      if (count > 5 || this.x < 0) clearInterval(moveInterval);
    }, 15);
  }

  /**
   * Sets up the task for handling movement input and camera updates.
   */
  moving() {
    addGameTask(this, () => {
      if (!this.world?.keyboard) return;
      this.manageWalkingSound();
      this.handleMovementInput();
      this.handleJumpInput();
      this.world.camera_x = -this.x + 50;
    }, 15);
  }

  /**
   * Processes horizontal movement inputs.
   */
  handleMovementInput() {
    if (this.canMoveRight()) {
      this.moveRight();
      this.otherDirection = false;
      this.resetIdleTimer();
    }
    if (this.canMoveLeft()) {
      this.moveLeft();
      this.otherDirection = true;
      this.resetIdleTimer();
    }
  }

  /**
   * Validates if movement to the right is possible.
   * @returns {boolean}
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && 
           this.x < this.world.level.level_end_x && 
           !this.isDead();
  }

  /**
   * Validates if movement to the left is possible.
   * @returns {boolean}
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && 
           this.x > 55 && 
           !this.isDead();
  }

  /**
   * Processes jump input and resets necessary state flags.
   */
  handleJumpInput() {
    if (this.world.keyboard.JUMP_ONCE) {
      if (!this.isAboveGround() && !this.isDead()) {
        this.jump();
      }
      this.world.keyboard.JUMP_ONCE = false;
      this.resetIdleTimer();
    }
  }

  /**
   * Manages walking sound triggers based on movement and game state.
   */
  manageWalkingSound() {
    if (!sounds?.WALK || !this.world) return;
    let isMoving = this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    let isWalking = isMoving && !this.isAboveGround() && !this.isDead() && 
                    !gamePaused && !this.world.gameWon;

    if (isWalking) sounds.WALK.play();
    else sounds.WALK.pause();
  }

  /**
   * Resets the interaction timer used for idle animation switching.
   */
  resetIdleTimer() {
    this.lastKeyPress = new Date().getTime();
  }
}