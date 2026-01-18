class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  bossStatusBar = new BossStatusBar();
  bossFirstContact = false;
  scaredSoundPlayed = false;
  bottleStatusBar = new BottleStatusBar();
  coinsStatusBar = new CoinsStatusBar();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    addGameTask(
      this,
      () => {
        this.checkCollision();
        this.checkCoinCollisions();
        this.checkThrowObject();
        this.checkPickBottle();
        this.bottleCollision();
        this.checkMeetBoss();
      },
      15
    );
  }

  startGame() {
    this.character.start();
    this.level.enemies.forEach((enemy) => {
      enemy.animate();
    });
  }

  checkThrowObject() {
    if (this.keyboard.THROW_ONCE) {
      if (this.character.bottleCount >= 10 && !this.character.isDead()) {
        let offsetX = this.character.otherDirection ? -10 : 75;
        let bottle = new ThrowableObject(
          this.character.x + offsetX,
          this.character.y + 120,
          this.character.otherDirection
        );
        this.throwableObjects.push(bottle);
        this.character.throwBottle();
        this.bottleStatusBar.setPercentage(this.character.bottleCount);
      }
      this.keyboard.THROW_ONCE = false;
    }
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (enemy instanceof Boss) {
          this.handleBossCollision();
        } else {
          this.handleChickenCollision(enemy);
        }
      }
    });
  }

  handleBossCollision() {
    if (!this.character.isHurt() && !this.character.isDead()) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  handleChickenCollision(enemy) {
    if (this.character.isAboveGround() && this.character.speedY <= 0 && !enemy.isDead) {
      this.executeEnemyKill(enemy);
    } else if (!enemy.isDead && !this.character.isAboveGround()) {
      if (!this.character.isHurt() && !this.character.isDead()) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    }
  }

  executeEnemyKill(enemy) {
    enemy.isDead = true;
    this.character.speedY = 12;
    if (enemy instanceof Chicks) {
      sounds.CHICK_DEAD.play();
    } else {
      sounds.DEAD.play();
    }
    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      if (index > -1) {
        this.level.enemies.splice(index, 1);
      }
    }, 500);
  }

  bottleCollision() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !bottle.hasSplashed) {
          if (enemy instanceof Boss) {
            bottle.splash();
            enemy.hit();
            this.bossStatusBar.setPercentage(enemy.energy);
          } else if (!enemy.isDead) {
            bottle.splash();
            this.executeEnemyKill(enemy);
          }
        }
      });
    });
  }

  checkPickBottle() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        if (this.character.bottleCount < 100) {
          this.character.collectBottle();
          this.level.bottles.splice(index, 1);
          this.bottleStatusBar.setPercentage(this.character.bottleCount);
          sounds.BOTTLE.play();
        }
      }
    });
  }

  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoin();
        sounds.COIN.play();
        this.coinsStatusBar.setPercentage(this.character.coinsCount);
        this.level.coins.splice(index, 1);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.level.backgrounds.forEach((bg) => {
      this.ctx.translate(this.camera_x * bg.speedModifier, 0);
      this.addToMap(bg);
      this.ctx.translate(-this.camera_x * bg.speedModifier, 0);
    });

    this.level.clouds.forEach((cloud) => {
      let modifier = cloud.speedModifier || 0.5;
      this.ctx.translate(this.camera_x * modifier, 0);
      this.addToMap(cloud);
      this.ctx.translate(-this.camera_x * modifier, 0);
    });

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusBar);
    if (this.bossFirstContact) {
      this.addToMap(this.bossStatusBar);
    }
    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.coinsStatusBar);

    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    mo.x = mo.x * -1;
    this.ctx.scale(-1, 1);
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  checkMeetBoss() {
    if (gamePaused) return;

    if (this.character.x > 1900) {
      if (!this.scaredSoundPlayed) {
        this.scaredSoundPlayed = true;
        sounds.SCARED_BOSS.play();
      }
      if (!this.bossFirstContact) {
        this.bossFirstContact = true;
        sounds.MUSIC.stop();
        if (music) {
          sounds.BOSS_MUSIC.play();
        }
      }
    } else {
      if (this.character.x < 1800) {
        sounds.SCARED_BOSS.pause();
        this.scaredSoundPlayed = false;
      }
    }
  }
}