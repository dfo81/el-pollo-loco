class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  // Statusleisten
  statusBar = new StatusBar();
  bossStatusBar = new BossStatusBar();
  bottleStatusBar = new BottleStatusBar();
  coinsStatusBar = new CoinsStatusBar();

  // Flags & Arrays
  bossFirstContact = false;
  scaredSoundPlayed = false;
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.character.start();
    this.level.enemies.forEach((enemy) => {
      if (enemy.animate) enemy.animate();
    });
  }

  run() {
    addGameTask(
      this,
      () => {
        this.checkCollisions();
        this.checkEnvironment();
        this.checkMeetBoss();
      },
      15,
    );
  }

  // --- LOGIK GRUPPIERUNGEN ---

  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkItemCollisions();
    this.checkBottleImpacts();
  }

  checkEnvironment() {
    if (this.keyboard.THROW_ONCE) this.checkThrowObject();
  }

  // --- SPEZIFISCHE PRÜFUNGEN ---

  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead && !(enemy instanceof Boss)) return;

      if (this.character.isColliding(enemy)) {
        if (enemy instanceof Boss) {
          this.handleBossCollision();
        } else {
          this.handleChickenCollision(enemy);
        }
      }
    });
  }

  handleChickenCollision(enemy) {
    // Jump-Kill: Pepe fällt (speedY <= 0) und ist in der Luft
    if (this.character.isAboveGround() && this.character.speedY <= 0) {
      this.executeEnemyKill(enemy);
    } else {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  handleBossCollision() {
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
  }

  executeEnemyKill(enemy) {
    enemy.isDead = true;
    this.character.speedY = 12; // Bounce-Effekt
    const killSound = enemy instanceof Chicks ? sounds.CHICK_DEAD : sounds.DEAD;
    killSound.play();

    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      if (index > -1) this.level.enemies.splice(index, 1);
    }, 500);
  }

  checkItemCollisions() {
    // Coins
    this.level.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoin();
        sounds.COIN.play();
        this.coinsStatusBar.setPercentage(this.character.coinsCount);
        this.level.coins.splice(i, 1);
      }
    });

    // Bottles
    this.level.bottles.forEach((bottle, i) => {
      if (this.character.isColliding(bottle) && this.character.bottleCount < 100) {
        this.character.collectBottle();
        sounds.BOTTLE.play();
        this.bottleStatusBar.setPercentage(this.character.bottleCount);
        this.level.bottles.splice(i, 1);
      }
    });
  }

  checkBottleImpacts() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !bottle.hasSplashed && !enemy.isDead) {
          bottle.splash();
          if (enemy instanceof Boss) {
            enemy.hit();
            this.bossStatusBar.setPercentage(enemy.energy);
          } else {
            this.executeEnemyKill(enemy);
          }
        }
      });
    });
  }

  checkThrowObject() {
    if (this.character.bottleCount >= 10 && !this.character.isDead()) {
      let offsetX = this.character.otherDirection ? -10 : 75;
      let bottle = new ThrowableObject(this.character.x + offsetX, this.character.y + 120, this.character.otherDirection);
      this.throwableObjects.push(bottle);
      this.character.throwBottle();
      this.bottleStatusBar.setPercentage(this.character.bottleCount);
    }
    this.keyboard.THROW_ONCE = false;
  }

  checkMeetBoss() {
    if (gamePaused) return;
    const isInBossArea = this.character.x > 1900;

    if (isInBossArea) {
      if (!this.scaredSoundPlayed) {
        this.scaredSoundPlayed = true;
        sounds.SCARED_BOSS.play();
      }
      if (!this.bossFirstContact) {
        this.bossFirstContact = true;
        updateMusicState(); // Nutzt die neue zentrale Funktion aus deiner game.js!
      }
    } else if (this.character.x < 1800) {
      this.scaredSoundPlayed = false;
    }
  }

  // --- DRAWING ---

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Hintergrund (Parallax)
    this.drawParallaxLayer(this.level.backgrounds);
    this.drawParallaxLayer(this.level.clouds, 0.5);

    // Spielobjekte
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    // UI (Fixiert)
    this.drawUI();

    requestAnimationFrame(() => this.draw());
  }

  drawUI() {
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.coinsStatusBar);
    if (this.bossFirstContact) this.addToMap(this.bossStatusBar);
  }

  drawParallaxLayer(objects, modifierOverride = null) {
    objects.forEach((obj) => {
      let m = modifierOverride || obj.speedModifier || 1;
      this.ctx.translate(this.camera_x * m, 0);
      this.addToMap(obj);
      this.ctx.translate(-this.camera_x * m, 0);
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => this.addToMap(obj));
  }

  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    mo.x *= -1;
    this.ctx.scale(-1, 1);
  }

  flipImageBack(mo) {
    mo.x *= -1;
    this.ctx.restore();
  }
}
