class Chicken extends MovableObject {
  x = 200 + Math.random() * 500;
  y = 345;
  height = 81;
  width = 82.7;
  IMAGES_WALKING = [
    './img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
    './img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
    './img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
  ];
  speed = 0.15 + Math.random() / 4;

  constructor() {
    super().loadImage(
      "./img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }


  animate() {
    
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 150);
  }
}
