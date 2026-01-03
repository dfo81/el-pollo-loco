class Boss extends MovableObject {
  x = 2600;
  y = 50;
  width = 489;
  height = 418;
  speed = 0.35;
  offset = {
    top: 150,
    bottom: 100,
    left: 120,
    right: 120,
  };
  IMAGES_BOSS_ALERT = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  energy = 100;

  constructor() {
    super().loadImage(this.IMAGES_BOSS_ALERT[0]);
    this.loadImages(this.IMAGES_BOSS_ALERT);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOSS_ALERT);
    }, 250);
  }
}
