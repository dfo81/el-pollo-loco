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
      console.log(this.character.isAboveGround(), this.character.y) ;
      
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
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy) && !this.character.isHurt()) {
        if (this.character.isAboveGround() && this.character.speedY < 0 && !(enemy instanceof Boss)) {
          this.character.speedY = 12;
          sounds.DEAD.play();
          this.level.enemies.splice(index, 1);
        } else {
          this.character.hit();
          sounds.HURT.play();          
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  bottleCollision() {
    this.throwableObjects.forEach((to) => {    
      this.level.enemies.forEach((enemy, index) => {
        if (to.isColliding(enemy) && !to.hasSplashed) {
          to.splash();
          if (enemy instanceof Boss) {
            enemy.hit();
            this.bossStatusBar.setPercentage(enemy.energy);
          } else {
            sounds.DEAD.play();
            this.level.enemies.splice(index, 1);
          }
        }
      });
    });
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
    mo.drawFrame(this.ctx);

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
