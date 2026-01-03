const level1 = new Level(
  createEnemyLevel(12),
  createCloudLevel(10),
  createBackgroundLevel(6),
  createCoinsLevel(6),
  createBottleLevel(12)
);
 

function createEnemyLevel(count) {
    let enemies = [new Boss()]; 
    for (let i = 0; i < count; i++) {
        let x = 800 + (i * 200) + (Math.random() * 200); 
        if (Math.random() > 0.5) {
            enemies.push(new Chicken(x));
        } else {
            enemies.push(new Chicks(x));
        }
    }
    return enemies;
}