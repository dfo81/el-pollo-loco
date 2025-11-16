class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  bossStatusBar = new BossStatusBar();
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
      this.checkThrowObject();
      this.bottleCollision();
    }, 100);
  }

  checkThrowObject() {
    if (this.keyboard.THROW_ONCE && !this.character.isDead()) {
      let bottle = new ThrowableObject(
        this.character.x + 75,
        this.character.y + 100,
        this.character.otherDirection
      );
      this.throwableObjects.push(bottle);
      this.keyboard.THROW_ONCE = false;
    }
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  bottleCollision() {
    for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
      let bottle = this.throwableObjects[i];
      for (let j = this.level.enemies.length - 1; j >= 0; j--) {
        let enemy = this.level.enemies[j];
        if (bottle.isColliding(enemy) && !bottle.hasSplashed) {
          clearInterval(bottle.rotationInterval);
          bottle.splash();
          enemy.hit();
        }
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgrounds);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusBar);
    this.addToMap(this.bossStatusBar);

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
