/**
 * Base class for all objects that can be drawn on the canvas.
 */
class DrawableObject {
  /** @type {HTMLImageElement} */
  img;
  /** @type {Object<string, HTMLImageElement>} */
  imageCache = {};
  /** @type {number} */
  currentImage = 0;
  /** @type {number} */
  opacity = 1;
  /** @type {number} */
  x;
  /** @type {number} */
  y;
  /** @type {number} */
  width;
  /** @type {number} */
  height;

  /**
   * Loads a single image from the given path.
   * @param {string} path - The source path of the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Preloads multiple images into the image cache.
   * @param {string[]} arr - An array of image source paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object onto the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  draw(ctx) {
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a debug frame (hitbox) around specific object types.
   * Useful for collision detection development.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Boss) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "white";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}