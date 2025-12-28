class Background extends MovableObject {
  x = 0;
  y = 0;
  height = 480;
  width = 720;

  constructor(imgPath, x, speedModifier) {
    super().loadImage(imgPath);
    this.x = x;
    this.speedModifier = speedModifier;
  }
}

function createBackgroundLevel(levelLengthInScreens) {
    let backgroundLayers = [];

    const layerConfigs = [
      { path: "air.png", speed: 0.4 },
      {
        path: "3_third_layer/1.png",
        speed: 0.6,
        altPath: "3_third_layer/2.png",
      },
      {
        path: "2_second_layer/1.png",
        speed: 0.8,
        altPath: "2_second_layer/2.png",
      },
      {
        path: "1_first_layer/1.png",
        speed: 1.0,
        altPath: "1_first_layer/2.png",
      },
    ];

    for (let i = 0; i < levelLengthInScreens; i++) {
      let xOffset = i * 719; 
      let isEven = i % 2 === 0; 

      layerConfigs.forEach((config) => {
        let currentPath =
          isEven || !config.altPath ? config.path : config.altPath;
        let fullPath = `assets/img/5_background/layers/${currentPath}`;

        backgroundLayers.push(new Background(fullPath, xOffset, config.speed));
      });
    }
    return backgroundLayers;
  }