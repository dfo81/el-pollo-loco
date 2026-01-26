/**
 * Represents the final boss enemy with state-driven behavior and animations.
 * @extends MovableObject
 */
class Boss extends MovableObject {
  x = 2800;
  y = 50;
  width = 489;
  height = 418;
  speed = 5;
  energy = 100;
  offset = { top: 150, bottom: 100, left: 80, right: 80 };
  animationTick = 0;
  stateTimer = 0;
  currentMode = "NONE";

  /** @type {string[]} */
  IMAGES_BOSS_WALK = ["assets/img/4_enemie_boss_chicken/1_walk/G1.png", "assets/img/4_enemie_boss_chicken/1_walk/G2.png", "assets/img/4_enemie_boss_chicken/1_walk/G3.png", "assets/img/4_enemie_boss_chicken/1_walk/G4.png"];
  /** @type {string[]} */
  IMAGES_BOSS_ALERT = ["assets/img/4_enemie_boss_chicken/2_alert/G5.png", "assets/img/4_enemie_boss_chicken/2_alert/G6.png", "assets/img/4_enemie_boss_chicken/2_alert/G7.png", "assets/img/4_enemie_boss_chicken/2_alert/G8.png", "assets/img/4_enemie_boss_chicken/2_alert/G9.png", "assets/img/4_enemie_boss_chicken/2_alert/G10.png", "assets/img/4_enemie_boss_chicken/2_alert/G11.png", "assets/img/4_enemie_boss_chicken/2_alert/G12.png"];
  /** @type {string[]} */
  IMAGES_BOSS_ATTACK = ["assets/img/4_enemie_boss_chicken/3_attack/G13.png", "assets/img/4_enemie_boss_chicken/3_attack/G14.png", "assets/img/4_enemie_boss_chicken/3_attack/G15.png", "assets/img/4_enemie_boss_chicken/3_attack/G16.png", "assets/img/4_enemie_boss_chicken/3_attack/G17.png", "assets/img/4_enemie_boss_chicken/3_attack/G18.png", "assets/img/4_enemie_boss_chicken/3_attack/G19.png", "assets/img/4_enemie_boss_chicken/3_attack/G20.png"];
  /** @type {string[]} */
  IMAGES_BOSS_HURT = ["assets/img/4_enemie_boss_chicken/4_hurt/G21.png", "assets/img/4_enemie_boss_chicken/4_hurt/G22.png", "assets/img/4_enemie_boss_chicken/4_hurt/G23.png"];
  /** @type {string[]} */
  IMAGES_BOSS_DEAD = ["assets/img/4_enemie_boss_chicken/5_dead/G24.png", "assets/img/4_enemie_boss_chicken/5_dead/G25.png", "assets/img/4_enemie_boss_chicken/5_dead/G26.png"];

  constructor() {
    super().loadImage(this.IMAGES_BOSS_ALERT[0]);
    this.loadImages(this.IMAGES_BOSS_WALK);
    this.loadImages(this.IMAGES_BOSS_ALERT);
    this.loadImages(this.IMAGES_BOSS_ATTACK);
    this.loadImages(this.IMAGES_BOSS_HURT);
    this.loadImages(this.IMAGES_BOSS_DEAD);
    this.animate();
  }

  /**
   * Main animation loop.
   */
  animate() {
    addGameTask(this, () => {
      if (this.isDead()) return this.playDeadAnimation();
      if (this.isHurt()) return this.handleAnimation(this.IMAGES_BOSS_HURT, 200);
      this.handleNormalBehavior();
    }, 100);
  }

  /**
   * Orchestrates the boss behavior states based on the state timer.
   */
  handleNormalBehavior() {
    if (!this.world?.bossFirstContact) return this.handleAnimation(this.IMAGES_BOSS_ALERT, 200);
    this.stateTimer += 100;
    if (this.stateTimer < 1000) {
      this.updateMode('ALERT');
      this.handleAnimation(this.IMAGES_BOSS_ALERT, 200);
    } else if (this.stateTimer < 4000) {
      this.executeWalkPhase();
    } else if (this.stateTimer < 6000) {
      this.executeAttackPhase();
    } else {
      this.stateTimer = 1000;
    }
  }

  /**
   * Moves the boss left if Pepe hasn't been reached yet.
   */
  executeWalkPhase() {
    this.updateMode('WALK');
    if (this.isToTheRightOfCharacter()) {
      this.moveLeft();
    }
    this.handleAnimation(this.IMAGES_BOSS_WALK, 200);
  }

  /**
   * Executes a faster move/jump towards the player.
   */
  executeAttackPhase() {
    if (this.currentMode !== 'ATTACK') {
      this.updateMode('ATTACK');
      this.speedY = 50;
    }
    if (this.isToTheRightOfCharacter()) {
      this.x -= 20;
    }
    this.handleAnimation(this.IMAGES_BOSS_ATTACK, 50);
  }

  /**
   * Checks if the boss is still to the right of Pepe.
   * @returns {boolean}
   */
  isToTheRightOfCharacter() {
    return this.x > this.world.character.x + 20;
  }

  /**
   * Throttles animation playback.
   * @param {string[]} images 
   * @param {number} delay 
   */
  handleAnimation(images, delay) {
    this.animationTick += 100;
    if (this.animationTick >= delay) {
      this.playAnimation(images);
      this.animationTick = 0;
    }
  }

  /**
   * Switches behavior mode.
   * @param {string} nextMode 
   */
  updateMode(nextMode) {
    if (this.currentMode !== nextMode) {
      this.imgIndex = 0;
      this.animationTick = 0;
      this.currentMode = nextMode;
    }
  }

  /**
   * Death sequence.
   */
  playDeadAnimation() {
    sounds.SCARED_BOSS.stop();
    sounds.BOSS_MUSIC.stop();
    this.handleAnimation(this.IMAGES_BOSS_DEAD, 500);
    this.y += 15;
  }
}