/**
 * Represents the health bar for the end boss.
 * @extends DrawableObject
 */
class BossStatusBar extends DrawableObject {
  /** @type {number} */
  x = 690;
  /** @type {number} */
  y = 5;
  /** @type {number} */
  height = 40;
  /** @type {number} */
  width = 150;
  /** @type {number} */
  percentage = 100;

  /**
   * Array of image paths representing different health levels (0% to 100%).
   * @type {string[]}
   * @readonly
   */
  IMAGES = [
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png"
  ];

  /**
   * Creates an instance of BossStatusBar.
   * Loads all required images and sets the initial state to 100%.
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
   * Maps the current percentage value to the corresponding image index in the IMAGES array.
   * @returns {number} The index of the image (0 to 5).
   * @private
   */
  resolveImageIndex() {
    if (this.percentage >= 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 50) return 3;
    if (this.percentage >= 30) return 2;
    if (this.percentage >= 10) return 1;
    return 0;
  }
}