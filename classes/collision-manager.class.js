/**
 * Handles all collision detection and resulting actions for the game world.
 */
class CollisionManager {
  /**
   * @param {World} world - Reference to the game world to access entities and state.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Main entry point to run all collision checks.
   */
  checkAll() {
    this.checkEnemyCollisions();
    this.checkItemCollisions();
    this.checkProjectileCollisions();
  }

  /**
   * Checks collisions between the character and all enemies.
   */
  checkEnemyCollisions() {
    this.world.level.enemies.forEach((enemy) => {
      if (this.world.character.isColliding(enemy)) {
        if (enemy instanceof Boss) {
          this.handleBossCollision();
        } else {
          this.handleChickenCollision(enemy);
        }
      }
    });
  }

  /**
   * Checks for collisions with collectible items (bottles and coins).
   */
  checkItemCollisions() {
    this.checkCoinCollisions();
    this.checkPickBottle();
  }

  /**
   * Checks for collisions between thrown projectiles and enemies.
   */
  checkProjectileCollisions() {
    this.world.throwableObjects.forEach((bottle) => {
      this.world.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !bottle.hasSplashed) {
          if (enemy instanceof Boss) {
            bottle.splash();
            enemy.hit();
            this.world.bossStatusBar.setPercentage(enemy.energy);
          } else if (!enemy.isDead) {
            bottle.splash();
            this.executeEnemyKill(enemy, false);
          }
        }
      });
    });
  }

  /**
   * Handles character getting hit by the Boss.
   * @private
   */
  handleBossCollision() {
    if (!this.world.character.isHurt() && !this.world.character.isDead()) {
      this.world.character.hit();
      this.world.statusBar.setPercentage(this.world.character.energy);
    }
  }

  /**
   * Handles character jumping on or running into standard enemies.
   * @param {Chicken|Chicks} enemy 
   * @private
   */
  handleChickenCollision(enemy) {
    const char = this.world.character;
    if (char.isAboveGround() && char.speedY <= 0 && !enemy.isDead) {
      this.executeEnemyKill(enemy, true);
    } else if (!enemy.isDead && !char.isAboveGround()) {
      if (!char.isHurt() && !char.isDead()) {
        char.hit();
        this.world.statusBar.setPercentage(char.energy);
      }
    }
  }

  /**
   * Finalizes an enemy kill, plays sounds and removes it from the world.
   * @param {MovableObject} enemy 
   * @param {boolean} shouldJump - If true, the character bounces off.
   */
  executeEnemyKill(enemy, shouldJump) {
    enemy.isDead = true;
    if (shouldJump) {
      this.world.character.speedY = 12;
    }
    
    if (enemy instanceof Chicks) {
      sounds.CHICK_DEAD.play();
    } else {
      sounds.DEAD.play();
    }

    setTimeout(() => {
      let index = this.world.level.enemies.indexOf(enemy);
      if (index > -1) {
        this.world.level.enemies.splice(index, 1);
      }
    }, 500);
  }

  /**
   * Checks for coin collection.
   * @private
   */
  checkCoinCollisions() {
    this.world.level.coins.forEach((coin, index) => {
      if (this.world.character.isColliding(coin)) {
        this.world.character.collectCoin();
        sounds.COIN.play();
        this.world.coinsStatusBar.setPercentage(this.world.character.coinsCount);
        this.world.level.coins.splice(index, 1);
      }
    });
  }

  /**
   * Checks for bottle pickup.
   * @private
   */
  checkPickBottle() {
    this.world.level.bottles.forEach((bottle, index) => {
      if (this.world.character.isColliding(bottle)) {
        if (this.world.character.bottleCount < 100) {
          this.world.character.collectBottle();
          this.world.level.bottles.splice(index, 1);
          this.world.bottleStatusBar.setPercentage(this.world.character.bottleCount);
          sounds.BOTTLE.play();
        }
      }
    });
  }
}