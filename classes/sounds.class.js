class Sounds {
    constructor() {
        this.WALK = new Sound('assets/sounds/walk.mp3', 0.8, true);
        this.JUMP = new Sound('assets/sounds/jump.mp3', 1, false);
        this.THROW = new Sound('assets/sounds/throw_bottle.mp3', 1, false);
        this.SPLASH = new Sound('assets/sounds/splash_bottle.mp3', 1, false);
        this.HURT = new Sound('assets/sounds/hurt.mp3', 1, false);
        this.DEAD = new Sound('assets/sounds/enemy-hurt.mp3', 1, false);
    }
}