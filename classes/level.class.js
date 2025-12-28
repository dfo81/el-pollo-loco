class Level {
    enemies;
    clouds;
    backgrounds;
    coins;
    level_end_x = 3500;

    constructor(enemies, clouds, backgrounds, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.coins = coins;
    }
}