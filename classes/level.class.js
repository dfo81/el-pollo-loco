class Level {
    enemies;
    clouds;
    backgrounds;
    coins;
    bottles;
    level_end_x = 3500;

    constructor(enemies, clouds, backgrounds, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.coins = coins;
        this.bottles = bottles;
    }
}