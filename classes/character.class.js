class Character extends MovableObject {
  x = 0;
  y = 90;
  height = 240;
  width = 122;
  IMAGES_WALKING = [
    "./img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png"
  ];

  IMAGES_JUMPING = [
    "./img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-31.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-32.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-33.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-39.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-40.png"
  ];
  IMAGES_DEAD = [
    "./img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-51.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-52.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-53.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-54.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-56.png",
    "./img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-57.png"
  ];
  world;
  speed = 5;

  constructor() {
    super().loadImage(
      "./img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-1.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }
      this.world.camera_x = -this.x + 75;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 75);
  }

  jump() {
    this.speedY = 15;
  }
}
