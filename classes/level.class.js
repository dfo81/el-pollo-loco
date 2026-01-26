/**
 * Represents a game level containing all interactive and decorative objects.
 */
class Level {
  /** @type {MovableObject[]} - Array of enemies like Chickens, Chicks, and the Boss. */
  enemies;

  /** @type {Cloud[]} - Array of decorative cloud objects. */
  clouds;

  /** @type {Background[]} - Array of parallax background layers. */
  backgrounds;

  /** @type {Coins[]} - Array of collectible coins. */
  coins;

  /** @type {Bottle[]} - Array of collectible bottles on the ground. */
  bottles;

  /** @type {number} - The x-coordinate where the level officially ends. */
  level_end_x = 3500;

  /**
   * Creates an instance of a Level.
   * @param {MovableObject[]} enemies - List of enemies for this level.
   * @param {Cloud[]} clouds - List of clouds for the sky.
   * @param {Background[]} backgrounds - List of background layers.
   * @param {Coins[]} coins - List of all coins in the level.
   * @param {Bottle[]} bottles - List of all bottles on the ground.
   */
  constructor(enemies, clouds, backgrounds, coins, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgrounds = backgrounds;
    this.coins = coins;
    this.bottles = bottles;
  }
}