/**
 * The World class represents the main game engine, handling rendering, 
 * collisions, and game state transitions.
 */
class World {
  /** @type {Character} */
  character = new Character();
  /** @type {Level} */
  level = level1;
  /** @type {HTMLCanvasElement} */
  canvas;
  /** @type {CanvasRenderingContext2D} */
  ctx;
  /** @type {Keys} */
  keyboard;
  /** @type {number} - Horizontal camera offset. */
  camera_x = 0;

  statusBar;
  bossStatusBar;
  bottleStatusBar;
  coinsStatusBar;
    
  /** @type {boolean} */
  bossFirstContact = false;
  /** @type {boolean} */
  scaredSoundPlayed = false;
  /** @type {boolean} */
  gameWon = false;
  
  /** @type {ThrowableObject[]} */
  throwableObjects = [];
  /** @type {number} - Timestamp of the last thrown bottle. */
  lastThrow = 0;

  /**
   * Initializes the world, sets up the canvas context and starts the game loops.
   * @param {HTMLCanvasElement} canvas - The game canvas.
   * @param {Keys} keyboard - The input controller.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    /** @type {StatusBar} */
  this.statusBar = new StatusBar('health', 10, 0, 100);
  /** @type {BossStatusBar} */
  this.bossStatusBar = new StatusBar('boss', 690, 5, 100);
  /** @type {BottleStatusBar} */
  this.bottleStatusBar = new StatusBar('bottle', 10, 30, 0);
  /** @type {CoinsStatusBar} */
  this.coinsStatusBar = new StatusBar('coin', 10, 60, 0);
    this.collisionManager = new CollisionManager(this);
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Provides references of the world to entities for cross-communication.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Main logic loop running at a fixed interval (approx. 60 FPS).
   */
  run() {
    addGameTask(this, () => {
      this.collisionManager.checkAll();
      this.checkThrowObject();
      this.checkMeetBoss();
      this.checkGameOver();
    }, 15);
  }

  /**
   * Starts animations for the character and all enemies in the level.
   */
  startGame() {
    this.character.start();
    this.level.enemies.forEach((enemy) => {
      enemy.animate();
    });
    this.level.coins.forEach((coin) => {
      coin.animate();
    });
  }

  /**
   * Checks if the throw key is pressed and validates timing/bottle count.
   */
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

  /**
   * Creates a ThrowableObject and updates the character's inventory.
   * @param {number} currentTime - Timestamp of the throw action.
   */
  executeThrow(currentTime) {
    let offsetX = this.character.otherDirection ? -10 : 75;
    let bottle = new ThrowableObject(
      this.character.x + offsetX, 
      this.character.y + 100, 
      this.character.otherDirection
    );
    this.throwableObjects.push(bottle);
    this.character.throwBottle();
    this.bottleStatusBar.setPercentage(this.character.bottleCount);
    this.lastThrow = currentTime;
  }

  /**
   * Main rendering loop. Handles layers in correct drawing order.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawBackgroundLayers();
    this.drawWorldObjects();
    this.drawStatusBars();
    this.drawCharacterLayer();

    requestAnimationFrame(() => this.draw());
  }

  /**
   * Draws parallax backgrounds and clouds.
   */
  drawBackgroundLayers() {
    this.level.backgrounds.forEach((bg) => this.drawWithModifier(bg, bg.speedModifier));
    this.level.clouds.forEach((cloud) => this.drawWithModifier(cloud, cloud.speedModifier || 0.5));
  }

  /**
   * Draws all entities that move with the camera (Enemies, Coins, Bottles).
   */
  drawWorldObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws fixed UI elements (Status Bars).
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.coinsStatusBar);
    if (this.bossFirstContact) {
      this.addToMap(this.bossStatusBar);
    }
  }

  /**
   * Draws the character, affected by camera movement.
   */
  drawCharacterLayer() {
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Helper to draw objects with a specific speed modifier for parallax effects.
   * @param {DrawableObject} obj 
   * @param {number} modifier 
   */
  drawWithModifier(obj, modifier) {
    this.ctx.translate(this.camera_x * modifier, 0);
    this.addToMap(obj);
    this.ctx.translate(-this.camera_x * modifier, 0);
  }

  /**
   * Helper function to add multiple objects to the map.
   * @param {DrawableObject[]} objects 
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Handles individual object drawing, including image flipping for direction.
   * @param {MovableObject} mo 
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Mirrors the context for objects facing left.
   * @param {MovableObject} mo 
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    mo.x = mo.x * -1;
    this.ctx.scale(-1, 1);
  }

  /**
   * Restores the context after drawing a mirrored object.
   * @param {MovableObject} mo 
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Monitors distance between character and boss to trigger the fight.
   */
  checkMeetBoss() {
    if (gamePaused) return;
    let boss = this.level.enemies.find((e) => e instanceof Boss);
    if (boss) {
      let distance = boss.x - this.character.x;
      if (distance < 720) {
        this.triggerBossFight();
      }
    }
  }

  /**
   * Transitions from level music to boss music.
   */
  triggerBossFight() {
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
  }

  /**
   * Checks if victory or defeat conditions are met.
   */
  checkGameOver() {
    let boss = this.level.enemies.find((e) => e instanceof Boss);
    if (boss && boss.y > 200 && !this.gameWon) {
      this.executeWinSequence();
    }
    if (this.character.energy <= 0 && this.character.y > 350 && !this.gameWon) {
      this.executeLoseSequence();
    }
  }

  /**
   * Halts the game and shows the win screen.
   */
  executeWinSequence() {
    this.gameWon = true;
    gamePaused = true;
    stopSounds();
    this.level.enemies.forEach(enemy => {
      enemy.speed = 0; 
    });
    if (sounds.WIN) sounds.WIN.play();
    document.getElementById('winScreen').classList.remove('d-none');
    document.getElementById('menu').classList.remove('d-none');
  }

  /**
   * Halts the game and shows the lose screen.
   */
  executeLoseSequence() {
    if (gamePaused) return; 
    this.gameWon = false; 
    gamePaused = true;
    stopSounds();
    if (sounds.LOSE) sounds.LOSE.play();
    document.getElementById('menu').classList.remove('d-none');
    document.getElementById('loseScreen').classList.remove('d-none');
  }
}

/**
 * Global helper function to stop all ongoing environmental sounds.
 */
function stopSounds() {
  if (sounds) {
    sounds.BOSS_MUSIC.stop();
    sounds.MUSIC.stop();
    sounds.SCARED_BOSS.stop();
    sounds.WALK.stop();
  }
}