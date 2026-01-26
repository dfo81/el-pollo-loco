/**
 * Represents the status bar for collected coins.
 * @extends DrawableObject
 */
class CoinsStatusBar extends DrawableObject {
  /** @type {number} */
  x = 10;
  /** @type {number} */
  y = 60;
  /** @type {number} */
  height = 40;
  /** @type {number} */
  width = 150;
  /** @type {number} */
  percentage = 0;

  /**
   * Array of image paths representing coin collection levels (0% to 100%).
   * @type {string[]}
   * @readonly
   */
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png"
  ];

  /**
   * Creates an instance of CoinsStatusBar.
   * Loads the coin images and initializes the bar at 0%.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
  }

  /**
   * Updates the current percentage and selects the corresponding image.
   * @param {number} percentage - The current coin percentage (0 - 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    const path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Maps the current percentage to the correct image index.
   * @returns {number} The index of the image in the IMAGES array (0-5).
   * @private
   */
  resolveImageIndex() {
    if (this.percentage >= 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 60) return 3;
    if (this.percentage >= 40) return 2;
    if (this.percentage >= 20) return 1;
    return 0;
  }
}