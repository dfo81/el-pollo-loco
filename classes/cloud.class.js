/**
 * Represents a decorative cloud object that moves slowly across the sky.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  /** @type {number} */
  y = Math.random() * 100;
  /** @type {number} */
  height = 180;
  /** @type {number} */
  width = 300;

  /**
   * Creates an instance of Cloud.
   * @param {string} imgPath - Path to the cloud image.
   * @param {number} x - Base horizontal starting position.
   * @param {number} [speedModifier=0.25] - Multiplier for parallax scrolling effect.
   */
  constructor(imgPath, x, speedModifier) {
    super();
    this.loadImage(imgPath);
    /** @type {number} */
    this.x = x + Math.random() * 500;
    /** @type {number} */
    this.speedModifier = speedModifier || 0.25;
    /** @type {number} */
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * Starts the continuous horizontal movement of the cloud.
   */
  animate() {
    addGameTask(this, () => {
      this.moveLeft();
    }, 1000 / 60);
  }
}

/**
 * Generates an array of clouds with randomized positions and speeds.
 * @param {number} count - The number of clouds to spawn in the level.
 * @returns {Cloud[]} An array of Cloud instances.
 */
function createCloudLevel(count) {
  const clouds = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 2500;
    const speed = 0.2 + Math.random() * 0.6;
    const imgIndex = (i % 2) + 1;

    clouds.push(
      new Cloud(`assets/img/5_background/layers/4_clouds/${imgIndex}.png`, x, speed)
    );
  }
  return clouds;
}