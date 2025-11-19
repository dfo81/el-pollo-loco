class Sounds {
    constructor() {
        this.walk = new Sound('assets/sounds/walk.mp3', 0.8, true);
        this.jump = new Sound('#', 1, false);
        this.throw = new Sound('assets/sounds/throw_bottle.mp3', 1, false);
        this.splash = new Sound('assets/sounds/splash_bottle.mp3', 1, false);
        this.hurt = new Sound('assets/sounds/hurt.mp3', 1, false);
    }
}