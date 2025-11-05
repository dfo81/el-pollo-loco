const level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new Boss()],
  [
    new Cloud("assets/img/5_background/layers/4_clouds/1.png", 419),
    new Cloud("assets/img/5_background/layers/4_clouds/2.png", 719),

    new Cloud("assets/img/5_background/layers/4_clouds/1.png", 319 * 2),
    new Cloud("assets/img/5_background/layers/4_clouds/2.png", 719 * 2),

    new Cloud("assets/img/5_background/layers/4_clouds/1.png", 419 * 3), 
    new Cloud("assets/img/5_background/layers/4_clouds/2.png", 919 * 3),

    new Cloud("assets/img/5_background/layers/4_clouds/1.png", 619 * 4), 
    new Cloud("assets/img/5_background/layers/4_clouds/2.png", 719 * 4),

    new Cloud("assets/img/5_background/layers/4_clouds/1.png", 719 * 5), 
    new Cloud("assets/img/5_background/layers/4_clouds/2.png", 819 * 5)
  ],
  [
    new Background("assets/img/5_background/layers/air.png", 0),
    new Background("assets/img/5_background/layers/3_third_layer/1.png", 0),
    new Background("assets/img/5_background/layers/2_second_layer/1.png", 0),
    new Background("assets/img/5_background/layers/1_first_layer/1.png", 0),

    new Background("assets/img/5_background/layers/air.png", 719),
    new Background("assets/img/5_background/layers/3_third_layer/2.png", 719),
    new Background("assets/img/5_background/layers/2_second_layer/2.png", 719),
    new Background("assets/img/5_background/layers/1_first_layer/2.png", 719),

    new Background("assets/img/5_background/layers/air.png", 719 * 2),
    new Background(
      "assets/img/5_background/layers/3_third_layer/1.png",
      719 * 2
    ),
    new Background(
      "assets/img/5_background/layers/2_second_layer/1.png",
      719 * 2
    ),
    new Background(
      "assets/img/5_background/layers/1_first_layer/1.png",
      719 * 2
    ),

    new Background("assets/img/5_background/layers/air.png", 719 * 3),
    new Background(
      "assets/img/5_background/layers/3_third_layer/2.png",
      719 * 3
    ),
    new Background(
      "assets/img/5_background/layers/2_second_layer/2.png",
      719 * 3
    ),
    new Background(
      "assets/img/5_background/layers/1_first_layer/2.png",
      719 * 3
    ),

    new Background("assets/img/5_background/layers/air.png", 719 * 4),
    new Background(
      "assets/img/5_background/layers/3_third_layer/1.png",
      719 * 4
    ),
    new Background(
      "assets/img/5_background/layers/2_second_layer/1.png",
      719 * 4
    ),
    new Background(
      "assets/img/5_background/layers/1_first_layer/1.png",
      719 * 4
    ),

    new Background("assets/img/5_background/layers/air.png", 719 * 5),
    new Background(
      "assets/img/5_background/layers/3_third_layer/2.png",
      719 * 5
    ),
    new Background(
      "assets/img/5_background/layers/2_second_layer/2.png",
      719 * 5
    ),
    new Background(
      "assets/img/5_background/layers/1_first_layer/2.png",
      719 * 5
    ),
  ]
);
