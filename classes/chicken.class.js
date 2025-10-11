class Chicken extends MovableObject {
  x = 200 + Math.random() * 500;
  y = 345;
  height = 81;
  width = 82.7;
  images_walking = [
    './img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
    './img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
    './img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
  ];
  speed = 0.15;

  constructor() {
    super().loadImage(
      "./img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png"
    );
    this.loadImages(this.images_walking);
    this.animate();
    this.moveLeft();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImg % this.images_walking.length;
      let path = this.images_walking[i];
      this.img = this.imgCache[path];
      this.currentImg++;
    }, 150);
  }
}
