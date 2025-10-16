class StatusBar extends DrawableObject {
  IMAGES = [
    "./img/7.Marcadores/Barra/Marcador vida/Naranja/0.png",
    "./img/7.Marcadores/Barra/Marcador vida/Naranja/20.png",
    "./img/7.Marcadores/Barra/Marcador vida/Naranja/40.png",
    "./img/7.Marcadores/Barra/Marcador vida/Naranja/60.png",
    "./img/7.Marcadores/Barra/Marcador vida/Naranja/80.png",
    "./img/7.Marcadores/Barra/Marcador vida/Naranja/100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 0;
    this.height = 53;
    this.width = 198;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imgCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
