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
 * Generates an array of enemies for a level, including one Boss and a randomized mix 
 * of standard chickens and chicks.
 * @param {number} count - The number of standard enemies to spawn.
 * @returns {MovableObject[]} An array of enemy instances.
 */
function createEnemyLevel(count) {
  /** @type {MovableObject[]} */
  const enemies = [new Boss()];

  for (let i = 0; i < count; i++) {
    // Calculates a base position plus a random offset to prevent overlapping
    const x = 800 + (i * 200) + (Math.random() * 200);
    
    // 50/50 chance to spawn a normal Chicken or a jumping Chick
    if (Math.random() > 0.5) {
      enemies.push(new Chicken(x));
    } else {
      enemies.push(new Chicks(x));
    }
  }
  return enemies;
}