/**
 * Represents the main playable character "Pepe".
 * @extends MovableObject
 */
class Character extends MovableObject {
  /** @type {number} */
  x = 50;

  /** @type {number} */
  y = 20;

  /** @type {number} */
  height = 300;

  /** @type {number} */
  width = 152.5;

  /** @type {number} */
  speed = 3.5;

  /** @type {{top:number, bottom:number, left:number, right:number}} */
  offset = { top: 150, bottom: 20, left: 50, right: 50 };

  /** @type {number} */
  energy = 100;

  /** @type {number} */
  coinsCount = 0;

  /** @type {number} */
  bottleCount = 0;

  /** @type {number} */
  deathTimer = 0;

  /** @type {number} */
  animationFrameIndex = 0;

  /** @type {string[]} */
  IMAGES_WALKING = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png"
  ];

  /** @type {string[]} */
  IMAGES_IDLE = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png"
  ];

  /** @type {string[]} */
  IMAGES_LONG_IDLE = [
    "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-20.png"
  ];

  /** @type {string[]} */
  IMAGES_JUMPING = [
    "assets/img/2_character_pepe/3_jump/J-31.png",
    "assets/img/2_character_pepe/3_jump/J-32.png",
    "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-39.png"
  ];

  /** @type {string[]} */
  IMAGES_DEAD = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
    "assets/img/2_character_pepe/5_dead/D-57.png"
  ];

  /** @type {string[]} */
  IMAGES_HURT = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png"
  ];

  /**
   * Creates a new character instance and initializes animations and gravity.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadAllImages();
    this.lastKeyPress = Date.now();
    this.applyGravity();
  }

  /**
   * Preloads all animation image sequences.
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
   * Starts movement and animation loops.
   */
  start() {
    this.animate();
    this.moving();
  }

  /**
   * Increases coin count up to a maximum of 100.
   */
  collectCoin() {
    this.coinsCount = Math.min(this.coinsCount + 5, 100);
  }

  /**
   * Increases bottle count up to a maximum of 100.
   */
  collectBottle() {
    this.bottleCount = Math.min(this.bottleCount + 10, 100);
  }

  /**
   * Reduces bottle count by a fixed amount.
   */
  throwBottle() {
    this.bottleCount = Math.max(this.bottleCount - 10, 0);
  }

  /**
   * Handles animation state updates.
   */
  animate() {
    addGameTask(this, () => {
      if (!this.world?.keyboard) return;
      this.handleStateAnimations();
    }, 15);
  }

  /**
   * Selects and plays animations based on character state.
   */
  handleStateAnimations() {
    if (this.isDead()) {
      this.playDeathAnimation();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT, 5);
    } else if (this.isAboveGround()) {
      this.handleJumpAnimation();
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING, 12);
    } else {
      this.playIdleAnimations();
    }
  }

  /**
   * Plays the death animation and applies falling behavior.
   */
  playDeathAnimation() {
    this.playAnimation(this.IMAGES_DEAD, 5);
    this.speedY = 0;
    this.acceleration = 0;
    this.deathTimer++;
    if (this.deathTimer > 20) this.y += 5;
  }

  /**
   * Plays idle or long idle animations depending on inactivity duration.
   */
  playIdleAnimations() {
    const timer = Date.now() - this.lastKeyPress;
    this.playAnimation(timer > 10000 ? this.IMAGES_LONG_IDLE : this.IMAGES_IDLE, 5);
  }

  /**
   * Applies damage logic and knockback if still alive.
   */
  hit() {
  super.hit();
  this.resetIdleTimer();
  if (this.world?.statusBar) {
    this.world.statusBar.setPercentage(this.energy);
  }
  if (!this.isDead()) {
    this.speedY = 10;
    this.applyKnockback();
  }
}

  /**
   * Applies a horizontal knockback effect.
   */
  applyKnockback() {
    const knockbackSpeed = this.otherDirection ? 15 : -15;
    let count = 0;
    const interval = setInterval(() => {
      if (this.x + knockbackSpeed > 50) this.x += knockbackSpeed;
      count++;
      if (count > 5 || this.x < 0) clearInterval(interval);
    }, 15);
  }

  /**
   * Handles movement input and camera updates.
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
   * Handles horizontal movement input.
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
   * Checks if the character can move right.
   * @returns {boolean}
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT &&
           this.x < this.world.level.level_end_x &&
           !this.isDead();
  }

  /**
   * Checks if the character can move left.
   * @returns {boolean}
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT &&
           this.x > 55 &&
           !this.isDead();
  }

  /**
   * Handles jump input.
   */
  handleJumpInput() {
    if (this.world.keyboard.JUMP_ONCE) {
      const canJump = !this.isAboveGround() && !this.isDead();
      this.world.keyboard.JUMP_ONCE = false;
      if (canJump) {
        this.currentImage = 0;
        this.executeJump();
        this.resetIdleTimer();
      }
    }
  }

  /**
   * Executes the jump after a short delay.
   */
  executeJump() {
    if (!this.isDead()) {
      this.speedY = 20;
      sounds?.JUMP?.play();
    }
  }

  /**
   * Controls jump animation behavior while airborne.
   */
  handleJumpAnimation() {
    if (this.isAboveGround()) {
      if (this.speedY > 0 || this.currentImage < 6) {
        if (this.currentImage < 6) {
          this.playAnimation(this.IMAGES_JUMPING, 15);
        } else {
          this.img = this.imageCache[this.IMAGES_JUMPING[5]];
        }
      } else {
        this.playAnimation(this.IMAGES_JUMPING.slice(6), 10);
        if (this.currentImage >= this.IMAGES_JUMPING.length) {
          this.img = this.imageCache[this.IMAGES_JUMPING[8]];
        }
      }
    }
  }

  /**
   * Manages walking sound playback.
   */
  manageWalkingSound() {
    if (!sounds?.WALK || !this.world) return;
    const moving = this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    const walking = moving && !this.isAboveGround() && !this.isDead() && !gamePaused && !this.world.gameWon;
    walking ? sounds.WALK.play() : sounds.WALK.pause();
  }

  /**
   * Resets the idle timer.
   */
  resetIdleTimer() {
    this.lastKeyPress = Date.now();
  }
}