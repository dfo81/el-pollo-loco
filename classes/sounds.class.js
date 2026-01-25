class Sounds {
    constructor() {
        this.WALK = new Sound('assets/sounds/walk.mp3', 0.6, true);
        this.JUMP = new Sound('assets/sounds/jump.mp3', 1, false);
        this.THROW = new Sound('assets/sounds/throw_bottle.mp3', 1, false);
        this.SPLASH = new Sound('assets/sounds/splash_bottle.mp3', 1, false);
        this.HURT = new Sound('assets/sounds/hurt.mp3', 1, false);
        this.DEAD = new Sound('assets/sounds/enemy-hurt.mp3', 1, false);
        this.COIN = new Sound('assets/sounds/coin.mp3', 0.1, false);
        this.MUSIC = new Sound('assets/sounds/Classic Mariachi - Jimena Contreras.mp3', 0.6, true);
        this.BOSS_MUSIC = new Sound('assets/sounds/boss-fight.mp3', 1, true);
        this.SCARED_BOSS = new Sound('assets/sounds/scared-rooster.mp3', 0.7, true);
        this.BOTTLE = new Sound('assets/sounds/bottle.mp3', 0.3, false);
        this.CHICK_DEAD = new Sound('assets/sounds/chick-dead.mp3', 0.3, false);
        this.WIN = new Sound('assets/sounds/win.mp3', 1, false);
        this.LOSE = new Sound('assets/sounds/lose.mp3', 1, false);
    }
}