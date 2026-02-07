/**
 * Represents a parallax background layer in the game.
 * @extends MovableObject
 */
class Background extends MovableObject {
  x = 0;
  y = 0;
  height = 480;
  width = 720;
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
 * Returns the configuration for the parallax background layers.
 * @returns {Array<{path: string, speed: number, altPath?: string}>}
 */
function getLayerConfigs() {
  return [
    { path: "air.png", speed: 0.4 },
    { path: "3_third_layer/1.png", speed: 0.5, altPath: "3_third_layer/2.png" },
    { path: "2_second_layer/1.png", speed: 0.75, altPath: "2_second_layer/2.png" },
    { path: "1_first_layer/1.png", speed: 1.0, altPath: "1_first_layer/2.png" },
  ];
}

/**
 * Resolves the image path based on the layer configuration and index.
 * @param {Object} config - The layer configuration object.
 * @param {number} index - The current screen index.
 * @returns {string} The full asset path.
 */
function resolveLayerPath(config, index) {
  const isEven = index % 2 === 0;
  const fileName = (isEven || !config.altPath) ? config.path : config.altPath;
  return `assets/img/5_background/layers/${fileName}`;
}

/**
 * Adds all background layers for a specific screen offset to the array.
 * @param {Background[]} layers - The array to push layers into.
 * @param {number} xOffset - The horizontal position for this screen.
 * @param {number} index - The current screen index.
 */
function addLayersForScreen(layers, xOffset, index) {
  getLayerConfigs().forEach((config) => {
    const path = resolveLayerPath(config, index);
    layers.push(new Background(path, xOffset, config.speed));
  });
}

/**
 * Generates an array of background layers for a level.
 * @param {number} levelLengthInScreens - Number of screen-widths the level spans.
 * @returns {Background[]} Array of Background objects.
 */
function createBackgroundLevel(levelLengthInScreens) {
  const backgroundLayers = [];
  const screenWidth = 719;
  for (let i = 0; i < levelLengthInScreens; i++) {
    addLayersForScreen(backgroundLayers, i * screenWidth, i);
  }
  return backgroundLayers;
}