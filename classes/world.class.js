class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  bossStatusBar = new BossStatusBar();
  bottleStatusBar = new BottleStatusBar();
  coinsStatusBar = new CoinsStatusBar();
  throwableObjects = [];
  hasSplashed = false;

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
    setInterval(() => {
      this.checkCollision();
      this.checkCoinCollisions();
      this.checkThrowObject();
      this.bottleCollision();
    }, 1000 / 30);
  }

  checkThrowObject() {
    if (this.keyboard.THROW_ONCE && !this.character.isDead()) {
      let offsetX = this.character.otherDirection ? -10 : 75;
      let bottle = new ThrowableObject(
        this.character.x + offsetX,
        this.character.y + 120,
        this.character.otherDirection
      );
      this.throwableObjects.push(bottle);
      this.keyboard.THROW_ONCE = false;
    }
  }

checkCollision() {
  this.level.enemies.forEach((enemy) => {
    if (this.character.isColliding(enemy)) {
      
      // BOSS-Logik
      if (enemy instanceof Boss) {
        if (!this.character.isHurt() && !this.character.isDead()) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      } 
      // HÜHNER-Logik
      else {
        this.handleChickenCollision(enemy);
      }
    }
  });
}

// Hilfsfunktion zur besseren Übersicht
handleChickenCollision(enemy) {
  if (this.character.isAboveGround() && this.character.speedY < 0 && !enemy.isDead) {
    enemy.isDead = true;
    this.character.speedY = 12;
    sounds.DEAD.play();
    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      if (index > -1) this.level.enemies.splice(index, 1);
    }, 500);
  } else if (!enemy.isDead) {
    if (!this.character.isHurt() && !this.character.isDead()) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    }
  }
}

bottleCollision() {
  this.throwableObjects.forEach((bottle) => {
    this.level.enemies.forEach((enemy) => {
      if (bottle.isColliding(enemy) && !bottle.hasSplashed) {
        
        if (enemy instanceof Boss) {
          bottle.splash(); // Flasche zerspringt
          enemy.hit();    // Boss verliert Energie
          this.bossStatusBar.setPercentage(enemy.energy);
        } 
        else if (!enemy.isDead) { // Normales Huhn
          bottle.splash();
          enemy.isDead = true;
          sounds.DEAD.play();
          setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) this.level.enemies.splice(index, 1);
          }, 500);
        }
      }
    });
  });
}

checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
            // 1. Punkt im Charakter hinzufügen (optional, falls du dort eine Variable hast)
            this.character.collectCoin(); 
            
            sounds.COIN.play();

            // 3. Statusbar aktualisieren
            // Wir nehmen an, 10 Münzen = 100%. Also jede Münze gibt 10%
            this.coinsStatusBar.setPercentage(this.character.coinsCount);

            // 4. Münze aus dem Level entfernen
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
      let modifier = cloud.speedModifier || 0.25;
      this.ctx.translate(this.camera_x * modifier, 0);
      this.addToMap(cloud);
      this.ctx.translate(-this.camera_x * modifier, 0);
    });

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusBar);
    this.addToMap(this.bossStatusBar);
    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.coinsStatusBar);

    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    self = this; // draw wird immer wieder aufgerufen
    requestAnimationFrame(function () {
      self.draw(); // this funktioniert hier nicht daher self
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
   /*  mo.drawFrame(this.ctx); */ /* Frames character and chicken */

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
}
