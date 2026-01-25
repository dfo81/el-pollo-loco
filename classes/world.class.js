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
  lastThrow = 0;

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
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
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
        this.checkGameOver();
      },
      15,
    );
  }

  startGame() {
    this.character.start();
    this.level.enemies.forEach((enemy) => {
      enemy.animate();
    });
  }

  checkThrowObject() {
    let currentTime = new Date().getTime();
    let timeSinceLastThrow = currentTime - this.lastThrow;

    if (this.keyboard.THROW_ONCE) {
      if (timeSinceLastThrow > 1000) {
        if (this.character.bottleCount > 0 && !this.character.isDead()) {
          this.executeThrow(currentTime);
        }
      }
      this.keyboard.THROW_ONCE = false;
    }
  }

  executeThrow(currentTime) {
    let offsetX = this.character.otherDirection ? -10 : 75;
    let bottle = new ThrowableObject(this.character.x + offsetX, this.character.y + 100, this.character.otherDirection);
    this.throwableObjects.push(bottle);
    this.character.throwBottle();
    this.bottleStatusBar.setPercentage(this.character.bottleCount);
    this.lastThrow = currentTime;
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
      this.executeEnemyKill(enemy, true);
    } else if (!enemy.isDead && !this.character.isAboveGround()) {
      if (!this.character.isHurt() && !this.character.isDead()) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    }
  }

  executeEnemyKill(enemy, shouldJump) {
    enemy.isDead = true;
    if (shouldJump) {
      this.character.speedY = 12;
    }
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
            this.executeEnemyKill(enemy, false);
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

    // Wir suchen den Boss im enemies-Array
    let boss = this.level.enemies.find((e) => e instanceof Boss);

    if (boss) {
      // Distanz berechnen (Boss X minus Pepe X)
      let distance = boss.x - this.character.x;

      if (distance < 600) {
        this.triggerBossFight();
      }
    }
  }

  triggerBossFight() {
    // 1. Sound abspielen (nur einmal triggern)
    if (!this.scaredSoundPlayed) {
      this.scaredSoundPlayed = true;
      sounds.SCARED_BOSS.play();
    }

    // 2. Boss-Modus in der Welt aktivieren
    if (!this.bossFirstContact) {
      this.bossFirstContact = true;
      sounds.MUSIC.stop();
      if (music) {
        sounds.BOSS_MUSIC.play();
      }
    }
  }

  gameWon = false;

  checkGameOver() {
    let boss = this.level.enemies.find((e) => e instanceof Boss);
    if (boss && boss.y > 200 && !this.gameWon) {
      this.executeWinSequence();
    }
    if (this.character.energy <= 0 && this.character.y > 350 && !this.gameWon) {
    this.executeLoseSequence();
  }
  }

  executeWinSequence() {
  this.gameWon = true;
  gamePaused = true;
  this.level.enemies.forEach(enemy => {
      enemy.speed = 0; 
  });
  sounds.BOSS_MUSIC.stop();
  sounds.WIN.play();
  document.getElementById('winScreen').classList.remove('d-none');
}

  executeLoseSequence() {
  if (gamePaused) return; 
  gamePaused = true;
  sounds.BOSS_MUSIC.stop();
  sounds.MUSIC.stop();
  sounds.SCARED_BOSS.stop();
  if (sounds.LOSE) sounds.LOSE.play();
  
  document.getElementById('loseScreen').classList.remove('d-none');
}
}
