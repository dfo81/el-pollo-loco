/**
 * Global variable holding the first level instance.
 * @type {Level}
 */
let level1;

/**
 * Initializes level1 with randomized enemies, clouds, backgrounds, coins, and bottles.
 */
function initLevel() {
  level1 = new Level(
    createEnemyLevel(12),
    createCloudLevel(10),
    createBackgroundLevel(6),
    createCoinsLevel(6),
    createBottleLevel(13)
  );
}

/**
 * Generates enemies including a Boss and a mix of chickens and chicks.
 * @param {number} count - Total standard enemies.
 * @returns {MovableObject[]} Array of enemy instances.
 */
function createEnemyLevel(count) {
  const enemies = [new Boss()];
  for (let i = 0; i < count; i++) {
    const x = 800 + (i * 200) + (Math.random() * 200);
    enemies.push(getRandomEnemy(x));
  }
  return enemies;
}

/**
 * Returns either a Chicken or a Chicks instance based on probability.
 * @param {number} x - Horizontal position.
 * @returns {MovableObject} Randomized enemy.
 */
function getRandomEnemy(x) {
  if (Math.random() > 0.5) {
    return new Chicken(x);
  }
  return new Chicks(x);
}