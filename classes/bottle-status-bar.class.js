class BottleStatusBar extends DrawableObject {
  x = 10;
  y = 30;
  height = 40;
  width = 150;

  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 50) return 3;
    if (this.percentage >= 30) return 2;
    if (this.percentage >= 10) return 1;
    return 0;
  }
}