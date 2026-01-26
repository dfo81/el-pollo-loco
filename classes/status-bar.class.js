/**
 * Represents the health status bar for the player character.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  /** @type {number} */
  x = 10;
  /** @type {number} */
  y = 0;
  /** @type {number} */
  height = 40;
  /** @type {number} */
  width = 150;
  /** @type {number} */
  percentage = 100;

  /**
   * Array of image paths representing health levels from 0% to 100%.
   * @type {string[]}
   * @readonly
   */
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /**
   * Creates an instance of StatusBar.
   * Loads the health bar images and initializes health at 100%.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
  }

  /**
   * Updates the health percentage and the displayed image.
   * @param {number} percentage - The current health percentage (0 - 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    const path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the correct image index based on the current health percentage.
   * @returns {number} The index of the image in the IMAGES array (0-5).
   * @private
   */
  resolveImageIndex() {
    if (this.percentage >= 100) return 5;
    if (this.percentage >= 70) return 4;
    if (this.percentage >= 50) return 3;
    if (this.percentage >= 30) return 2;
    if (this.percentage >= 10) return 1;
    return 0;
  }
}