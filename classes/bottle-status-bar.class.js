/**
 * Represents the status bar for collected bottles.
 * @extends DrawableObject
 */
class BottleStatusBar extends DrawableObject {
  /** @type {number} */
  x = 10;
  /** @type {number} */
  y = 30;
  /** @type {number} */
  height = 40;
  /** @type {number} */
  width = 150;
  /** @type {number} */
  percentage = 0;

  /**
   * Array of image paths representing bottle fill levels from 0% to 100%.
   * @type {string[]}
   * @readonly
   */
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  /**
   * Creates an instance of BottleStatusBar.
   * Loads images and initializes the bar with 0%.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
  }

  /**
   * Updates the percentage and switches the displayed image accordingly.
   * @param {number} percentage - The current amount/percentage of bottles.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    const path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Calculates the appropriate image index based on the current bottle count/percentage.
   * @returns {number} Index of the image (0 to 5).
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