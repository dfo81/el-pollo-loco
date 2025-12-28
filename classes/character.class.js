class Character extends MovableObject {
  x = 50;
  y = 20;
  height = 300;
  width = 152.5;
  speed = 5;
   offset = {
    top: 150,
    bottom: 20,
    left: 50,
    right: 50,
  };
  IMAGES_WALKING = [
    "/assets/img/2_character_pepe/2_walk/W-21.png",
    "/assets/img/2_character_pepe/2_walk/W-22.png",
    "/assets/img/2_character_pepe/2_walk/W-23.png",
    "/assets/img/2_character_pepe/2_walk/W-24.png",
    "/assets/img/2_character_pepe/2_walk/W-25.png",
    "/assets/img/2_character_pepe/2_walk/W-26.png",
  ];
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
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_JUMPING = [
    "assets/img/2_character_pepe/3_jump/J-31.png",
    "assets/img/2_character_pepe/3_jump/J-32.png",
    "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_DEAD = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
    "assets/img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_HURT = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];
  world;
  energy = 100;
  jumpIntervalRunning = false;
  coinsCount = 0;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
    this.moving();
  }

  collectCoin() {
    this.coinsCount += 5;
    if (this.coinsCount > 100) {
      this.coinsCount = 100;
    }
  }

  animate() {
    setInterval(() => {
      if (!this.world || !this.world.keyboard) return;
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD, 5);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT, 5);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING, 10);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING, 15);
      } else {
        this.playAnimation(this.IMAGES_IDLE, 5);
      }
    }, 1000 / 30);
  }

  moving() {
    setInterval(() => {
      this.manageWalkingSound();
      if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x &&
        !this.isDead()
      ) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.x > 55 && !this.isDead()) {
        this.moveLeft();
        this.otherDirection = true;
      }

      if (
        this.world.keyboard.JUMP_ONCE &&
        !this.isAboveGround() &&
        !this.isDead()
      ) {
        this.jump();
        this.world.keyboard.JUMP_ONCE = false;
      }
      this.world.camera_x = -this.x + 50;
    }, 1000 / 30);
  }

  manageWalkingSound() {
    if (!sounds || !sounds.WALK) return;

    let isMovingOnGround =
      (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
      !this.isAboveGround() &&
      !this.isDead();
    if (isMovingOnGround) {
      if (sounds.WALK.audio.paused) {
        sounds.WALK.play();
      }
    } else {
      sounds.WALK.stop();
    }
  }
}
