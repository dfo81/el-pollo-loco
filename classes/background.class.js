/**
 * Represents a parallax background layer in the game.
 * @extends MovableObject
 */
class Background extends MovableObject {
  /** @type {number} */
  x = 0;
  /** @type {number} */
  y = 0;
  /** @type {number} */
  height = 480;
  /** @type {number} */
  width = 720;
  /** @type {number} */
  speedModifier;

  /**
   * Creates a new Background instance.
   * @param {string} imgPath - The path to the image asset.
   * @param {number} x - The initial horizontal position.
   * @param {number} speedModifier - The multiplier for the parallax scrolling speed.
   */
  constructor(imgPath, x, speedModifier) {
    super();
    this.loadImage(imgPath);
    this.x = x;
    this.speedModifier = speedModifier;
  }
}

/**
 * Generates an array of background layers for a level based on the specified length.
 * Implements a parallax effect with multiple layers and alternating textures.
 * * @param {number} levelLengthInScreens - How many screen-widths the level should span.
 * @returns {Background[]} An array of Background objects.
 */
function createBackgroundLevel(levelLengthInScreens) {
  const backgroundLayers = [];
  const screenWidth = 719; // Slightly overlapped to prevent gaps

  /** @type {Array<{path: string, speed: number, altPath?: string}>} */
  const layerConfigs = [
    { path: "air.png", speed: 0.4 },
    { path: "3_third_layer/1.png", speed: 0.5, altPath: "3_third_layer/2.png" },
    { path: "2_second_layer/1.png", speed: 0.75, altPath: "2_second_layer/2.png" },
    { path: "1_first_layer/1.png", speed: 1.0, altPath: "1_first_layer/2.png" },
  ];

  for (let i = 0; i < levelLengthInScreens; i++) {
    const xOffset = i * screenWidth;
    const isEven = i % 2 === 0;

    layerConfigs.forEach((config) => {
      const fileName = (isEven || !config.altPath) ? config.path : config.altPath;
      const fullPath = `assets/img/5_background/layers/${fileName}`;

      backgroundLayers.push(
        new Background(fullPath, xOffset, config.speed)
      );
    });
  }

  return backgroundLayers;
}