/**
 * Represents the health status bar for the player character.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  /** @type {number} */
  height = 40;
  /** @type {number} */
  width = 150;
  /** @type {number} */
  percentage = 0;

  /**
   * Array of image paths representing health levels from 0% to 100%.
   * @type {string[]}
   * @readonly
   */
  static HEALTH_IMAGES = [
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /**
   * Array of image paths representing different health levels (0% to 100%).
   * @type {string[]}
   * @readonly
   */
  static BOSS_IMAGES = [
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png"
  ];

  /**
   * Array of image paths representing bottle fill levels from 0% to 100%.
   * @type {string[]}
   * @readonly
   */
  static BOTTLE_IMAGES = [
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  /**
   * Array of image paths representing coin collection levels (0% to 100%).
   * @type {string[]}
   * @readonly
   */
  static COINS_IMAGES = [
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png"
  ];

  /**
   * @param {string} type - 'health', 'coin', 'bottle' or 'boss'
   * @param {number} x 
   * @param {number} y 
   * @param {number} percentage 
   */
  constructor(type, x, y, percentage) {
    super();
    this.x = x;
    this.y = y;
    this.IMAGES = this.getImagesByType(type);
    this.loadImages(this.IMAGES);
    this.setPercentage(percentage);
  }

  getImagesByType(type) {
        if (type === 'health') return StatusBar.HEALTH_IMAGES;
        if (type === 'coin') return StatusBar.COINS_IMAGES;
        if (type === 'bottle') return StatusBar.BOTTLE_IMAGES;
        if (type === 'boss') return StatusBar.BOSS_IMAGES;
        return [];
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