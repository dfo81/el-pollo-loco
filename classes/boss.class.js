class Boss extends MovableObject {
  x = 2600;
  y = 50;
  width = 489;
  height = 418;
  speed = 5;
  energy = 100;
  offset = { top: 150, bottom: 100, left: 80, right: 80 };
  animationTick = 0;
  stateTimer = 0;
  currentMode = "NONE";

  IMAGES_BOSS_WALK = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_BOSS_ALERT = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_BOSS_ATTACK = [
    "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_BOSS_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_BOSS_DEAD = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_BOSS_ALERT[0]);
    this.loadImages(this.IMAGES_BOSS_WALK);
    this.loadImages(this.IMAGES_BOSS_ALERT);
    this.loadImages(this.IMAGES_BOSS_ATTACK);
    this.loadImages(this.IMAGES_BOSS_HURT);
    this.loadImages(this.IMAGES_BOSS_DEAD);
    this.animate();
  }

  animate() {
    addGameTask(this, () => {
      if (this.isDead()) {
        this.playDeadAnimation();
      } else if (this.isHurt()) {
        this.handleAnimation(this.IMAGES_BOSS_HURT, 200);
      } else {
        this.handleNormalBehavior();
      }
    }, 100); 
  }

  handleNormalBehavior() {
    if (this.world && this.world.bossFirstContact) {
      this.stateTimer += 100;

      if (this.stateTimer < 1000) {
        this.updateMode('ALERT');
        this.handleAnimation(this.IMAGES_BOSS_ALERT, 200);
      } else if (this.stateTimer < 4000) {
        this.updateMode('WALK');
        this.moveLeft();
        this.handleAnimation(this.IMAGES_BOSS_WALK, 200); // 100ms wirkt flüssiger
      } else if (this.stateTimer < 6000) {
        this.executeAttackPhase();
      } else {
        this.stateTimer = 1000;
      }
    } else {
      this.handleAnimation(this.IMAGES_BOSS_ALERT, 200);
    }
  }

  executeAttackPhase() {
    // 1. Beim Start der Attacke EINMAL springen
    if (this.currentMode !== 'ATTACK') {
      this.updateMode('ATTACK');
      this.speedY = 50; // Sprunghöhe
    }

    // 2. Während er in der Luft ist, springt er weit nach links
    this.x -= 20; // Der "Sprung nach vorne" Effekt

    this.handleAnimation(this.IMAGES_BOSS_ATTACK, 50);
  }

  handleAnimation(images, delay) {
    this.animationTick += 100; 
    if (this.animationTick >= delay) {
      this.playAnimation(images);
      this.animationTick = 0; 
    }
  }

  updateMode(nextMode) {
    if (this.currentMode !== nextMode) {
      this.imgIndex = 0; 
      this.animationTick = 0; // Tick resetten für sofortigen Start
      this.currentMode = nextMode;
    }
  }

  playDeadAnimation() {
    sounds.SCARED_BOSS.stop();
    sounds.BOSS_MUSIC.stop();
    this.handleAnimation(this.IMAGES_BOSS_DEAD, 500);
    this.y += 15; // Schnelleres Absinken
  }
}

