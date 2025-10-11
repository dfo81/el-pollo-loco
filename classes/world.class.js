class World {
  character = new Character();
  enemies = [
    new Chicken(), 
    new Chicken(), 
    new Chicken()];
  clouds = [
    new Cloud()
];
  backgrounds = [
    new Background('./img/5.Fondo/Capas/5.cielo_1920-1080px.png'),
    new Background('./img/5.Fondo/Capas/3.Fondo3/1.png'),
    new Background('./img/5.Fondo/Capas/2.Fondo2/1.png'),
    new Background('./img/5.Fondo/Capas/1.suelo-fondo1/1.png')
  ];
  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addOjectsToMap(this.backgrounds);
    this.addToMap(this.character);
    this.addOjectsToMap(this.enemies);
    this.addOjectsToMap(this.clouds);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addOjectsToMap(objects) {
    objects.forEach(o => {
        this.addToMap(o);
    })
  }

  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}
