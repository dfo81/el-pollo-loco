/**
 * Represents a collectible coin with a spinning animation.
 * @extends MovableObject
 */
class Coins extends MovableObject {
  /** @type {number} */
  height = 100;
  /** @type {number} */
  width = 100;

  /**
   * Collision offset to refine the coin's hitbox.
   * @type {{top: number, bottom: number, left: number, right: number}}
   */
  offset = {
    top: 0,
    bottom: 0,
    left: 30,
    right: 30
  };

  /** @type {string[]} */
  IMAGES_COINS = [
    'assets/img/8_coin/coin_1.png',
    'assets/img/8_coin/coin_2.png'
  ];

  /**
   * Creates an instance of Coins.
   * @param {number} x - The horizontal position.
   * @param {number} y - The vertical position.
   */
  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
    this.currentImage = Math.floor(Math.random() * this.IMAGES_COINS.length);
    this.animate();
  }

  /**
   * Starts the coin's spinning animation.
   */
  animate() {

      addGameTask(this, () => {
        this.playAnimation(this.IMAGES_COINS);
      }, 200); // 200ms Intervall für eine flüssige Drehung
  }
}

/**
 * Creates an array of coins arranged in various random patterns.
 * @param {number} totalPatterns - The number of patterns to generate across the level.
 * @returns {Coins[]} An array containing all generated coin instances.
 */
function createCoinsLevel(totalPatterns) {
  const allCoins = [];
  for (let i = 0; i < totalPatterns; i++) {
    const x = 200 + (i * 400);
    const type = Math.random();

    if (type < 0.33) {
      allCoins.push(...createCoinRow(x, 300, 4));
    } else if (type < 0.66) {
      allCoins.push(...createCoinBlock(x, 150, 2, 1));
    } else {
      allCoins.push(...createCoinDiagonal(x, 350, 4, -1));
    }
  }
  return allCoins;
}

/**
 * Creates a horizontal row of coins.
 * @param {number} startX - The starting X coordinate.
 * @param {number} startY - The Y coordinate for the row.
 * @param {number} count - Number of coins in the row.
 * @returns {Coins[]}
 */
function createCoinRow(startX, startY, count) {
  const row = [];
  for (let i = 0; i < count; i++) {
    row.push(new Coins(startX + (i * 60), startY));
  }
  return row;
}

/**
 * Creates a diagonal line of coins.
 * @param {number} startX - The starting X coordinate.
 * @param {number} startY - The starting Y coordinate.
 * @param {number} count - Number of coins in the diagonal.
 * @param {number} [directionY=-1] - Direction of the diagonal (-1 for up, 1 for down).
 * @returns {Coins[]}
 */
function createCoinDiagonal(startX, startY, count, directionY = -1) {
  const diag = [];
  for (let i = 0; i < count; i++) {
    diag.push(new Coins(startX + (i * 60), startY + (i * 40 * directionY)));
  }
  return diag;
}

/**
 * Creates a rectangular block of coins.
 * @param {number} startX - The starting X coordinate.
 * @param {number} startY - The starting Y coordinate.
 * @param {number} columns - Number of columns.
 * @param {number} rows - Number of rows.
 * @returns {Coins[]}
 */
function createCoinBlock(startX, startY, columns, rows) {
  const block = [];
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows; r++) {
      block.push(new Coins(startX + (c * 60), startY + (r * 60)));
    }
  }
  return block;
}