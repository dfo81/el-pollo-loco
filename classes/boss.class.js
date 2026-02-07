/**
 * Represents the final boss enemy with state-driven behavior.
 * @extends MovableObject
 */
class Boss extends MovableObject {
  x = 2800;
  y = 50;
  width = 489;
  height = 418;
  speed = 5;
  energy = 100;
  offset = { top: 150, bottom: 100, left: 30, right: 30 };
  stateTimer = 0;
  currentMode = "NONE";
  groundLevel = 40;
  isRetreating = false;

  IMAGES_BOSS_WALK = ["assets/img/4_enemie_boss_chicken/1_walk/G1.png", "assets/img/4_enemie_boss_chicken/1_walk/G2.png", "assets/img/4_enemie_boss_chicken/1_walk/G3.png", "assets/img/4_enemie_boss_chicken/1_walk/G4.png"];
  IMAGES_BOSS_ALERT = ["assets/img/4_enemie_boss_chicken/2_alert/G5.png", "assets/img/4_enemie_boss_chicken/2_alert/G6.png", "assets/img/4_enemie_boss_chicken/2_alert/G7.png", "assets/img/4_enemie_boss_chicken/2_alert/G8.png", "assets/img/4_enemie_boss_chicken/2_alert/G9.png", "assets/img/4_enemie_boss_chicken/2_alert/G10.png", "assets/img/4_enemie_boss_chicken/2_alert/G11.png", "assets/img/4_enemie_boss_chicken/2_alert/G12.png"];
  IMAGES_BOSS_ATTACK = ["assets/img/4_enemie_boss_chicken/3_attack/G13.png", "assets/img/4_enemie_boss_chicken/3_attack/G14.png", "assets/img/4_enemie_boss_chicken/3_attack/G15.png", "assets/img/4_enemie_boss_chicken/3_attack/G16.png", "assets/img/4_enemie_boss_chicken/3_attack/G17.png", "assets/img/4_enemie_boss_chicken/3_attack/G18.png", "assets/img/4_enemie_boss_chicken/3_attack/G19.png", "assets/img/4_enemie_boss_chicken/3_attack/G20.png"];
  IMAGES_BOSS_HURT = ["assets/img/4_enemie_boss_chicken/4_hurt/G21.png", "assets/img/4_enemie_boss_chicken/4_hurt/G22.png", "assets/img/4_enemie_boss_chicken/4_hurt/G23.png"];
  IMAGES_BOSS_DEAD = ["assets/img/4_enemie_boss_chicken/5_dead/G24.png", "assets/img/4_enemie_boss_chicken/5_dead/G25.png", "assets/img/4_enemie_boss_chicken/5_dead/G26.png"];

  /**
   * Initializes boss assets and starts behavior tasks.
   */
  constructor() {
    super();
    this.loadBossImages();
    this.loadImage(this.IMAGES_BOSS_ALERT[0]);
    this.applyGravity();
    this.animate();
  }

  /**
   * Loads all animation sequences for the boss.
   */
  loadBossImages() {
    this.loadImages(this.IMAGES_BOSS_WALK);
    this.loadImages(this.IMAGES_BOSS_ALERT);
    this.loadImages(this.IMAGES_BOSS_ATTACK);
    this.loadImages(this.IMAGES_BOSS_HURT);
    this.loadImages(this.IMAGES_BOSS_DEAD);
  }

  /**
   * Starts the main animation and behavior loop.
   */
  animate() {
    addGameTask(this, () => {
      if (this.isDead()) return this.playDeadSequence();
      if (this.isHurt()) return this.playAnimation(this.IMAGES_BOSS_HURT, 25);
      this.handleNormalBehavior();
    }, 20);
  }

  /**
   * Orchestrates behavior based on character distance and state.
   */
  handleNormalBehavior() {
    if (!this.world?.bossFirstContact) return this.playAnimation(this.IMAGES_BOSS_ALERT, 10);
    if (this.isRetreating) return this.executeRetreat();
    let dist = this.x - this.world.character.x;
    if (dist <= 200 && dist > 0 && this.currentMode !== 'ATTACK') {
      this.stateTimer = 4000;
      this.executeAttackPhase();
    } else {
      this.runStateTimer();
    }
  }

  /**
   * Processes the walk phase logic and movement.
   */
  executeWalkPhase() {
    this.updateMode('WALK');
    let dist = this.x - this.world.character.x;
    if (dist > 150) this.moveLeft();
    else if (dist < 120) this.x += 2;
    this.playAnimation(this.IMAGES_BOSS_WALK, 10);
  }

  /**
   * Handles attack movement and collision detection.
   */
  executeAttackPhase() {
    this.updateMode('ATTACK');
    this.x -= 18;
    this.playAnimation(this.IMAGES_BOSS_ATTACK, 20);
    if (this.isColliding(this.world.character)) {
      this.world.character.hit();
      this.isRetreating = true;
    }
  }

  /**
   * Manages the retreat movement after a collision.
   */
  executeRetreat() {
    this.updateMode('WALK');
    this.x += 15;
    if (!this.isAboveGround()) this.speedY = 15;
    this.playAnimation(this.IMAGES_BOSS_WALK, 15);
    if (this.x - this.world.character.x > 350) {
      this.isRetreating = false;
      this.stateTimer = 0;
    }
  }

  /**
   * Switches the boss mode and resets animation index.
   * @param {string} nextMode - The mode to switch to.
   */
  updateMode(nextMode) {
    if (this.currentMode !== nextMode) {
      this.currentImage = 0;
      this.currentMode = nextMode;
    }
  }

  /**
   * Handles the death animation and falling sequence.
   */
  playDeadSequence() {
    sounds.SCARED_BOSS.stop();
    sounds.BOSS_MUSIC.stop();
    if (this.currentImage < this.IMAGES_BOSS_DEAD.length) {
      this.playAnimation(this.IMAGES_BOSS_DEAD, 5);
    } else {
      this.y += 20;
      let i = this.IMAGES_BOSS_DEAD.length - 1;
      this.img = this.imageCache[this.IMAGES_BOSS_DEAD[i]];
    }
  }

  /**
   * Cycles through behavior states based on a timer.
   */
  runStateTimer() {
    this.stateTimer += 20;
    if (this.stateTimer < 1000) {
      this.updateMode('ALERT');
      this.playAnimation(this.IMAGES_BOSS_ALERT, 10);
    } else if (this.stateTimer < 4000) {
      this.executeWalkPhase();
    } else if (this.stateTimer < 7000) {
      this.executeAttackPhase();
    } else {
      this.stateTimer = 1000;
    }
  }
}