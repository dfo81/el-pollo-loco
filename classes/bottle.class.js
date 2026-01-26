/**
 * Represents a collectible bottle on the ground.
 * @extends MovableObject
 */
class Bottle extends MovableObject {
  /** @type {number} */
  height = 72;
  /** @type {number} */
  width = 72;
  /** @type {number} */
  y = 350 + Math.random() * 20;
  
  /** * Collision offset to make the hitbox fit the bottle shape.
   * @type {{top: number, bottom: number, left: number, right: number}} 
   */
  offset = {
    top: 0,
    bottom: 40,
    left: 30,
    right: 30
  };

  /** @type {string[]} */
  IMAGE_BOTTLES = [
    'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];

  /**
   * Creates a new Bottle instance at a specific horizontal position.
   * Randomly selects one of the available bottle images and a random facing direction.
   * @param {number} x - The horizontal position where the bottle spawns.
   */
  constructor(x) {
    super();
    const randomIndex = Math.floor(Math.random() * this.IMAGE_BOTTLES.length);
    this.loadImage(this.IMAGE_BOTTLES[randomIndex]);
    this.x = x;
    this.otherDirection = Math.random() > 0.5;
  }
}

/**
 * Creates an array of bottles distributed across the level.
 * @param {number} count - The number of bottles to generate.
 * @returns {Bottle[]} An array of Bottle instances.
 */
function createBottleLevel(count) {
  const bottles = [];
  const levelWidth = 2000;
  const sectionWidth = levelWidth / count;
  for (let i = 0; i < count; i++) {
    const sectionStart = 400 + (i * sectionWidth);
    const x = sectionStart + Math.random() * (sectionWidth - 50);
    bottles.push(new Bottle(x));
  }
  return bottles;
}