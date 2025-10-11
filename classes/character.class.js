class Character extends MovableObject {
  x = 60;
  y = 190;
  height = 240;
  width = 122;
  images_walking = [
    "./img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png",
  ];

  constructor() {
    super().loadImage(
      "./img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png"
    );
    this.loadImages(this.images_walking);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImg % this.images_walking.length;
      let path = this.images_walking[i];
      this.img = this.imgCache[path];
      this.currentImg++;
    }, 200);
  }

  jump() {}
}
