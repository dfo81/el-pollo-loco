/**
 * A central registry for all game sounds and music tracks.
 * Initializes and stores instances of the Sound class.
 */
class Sounds {
  /**
   * Initializes all sound effects and music tracks with specific volume levels and loop settings.
   */
  constructor() {
    /** @type {Sound} - Looping footstep sound. */
    this.WALK = new Sound('assets/sounds/walk.mp3', 0.6, true);

    /** @type {Sound} - Single jump effect. */
    this.JUMP = new Sound('assets/sounds/jump.mp3', 1, false);

    /** @type {Sound} - Sound when throwing a bottle. */
    this.THROW = new Sound('assets/sounds/throw_bottle.mp3', 1, false);

    /** @type {Sound} - Sound when a bottle hits an object and splashes. */
    this.SPLASH = new Sound('assets/sounds/splash_bottle.mp3', 1, false);

    /** @type {Sound} - Sound when the character takes damage. */
    this.HURT = new Sound('assets/sounds/hurt.mp3', 1, false);

    /** @type {Sound} - Generic enemy death sound. */
    this.DEAD = new Sound('assets/sounds/enemy-hurt.mp3', 1, false);

    /** @type {Sound} - Short coin collection sound. */
    this.COIN = new Sound('assets/sounds/coin.mp3', 0.1, false);

    /** @type {Sound} - Main background music track (looping). */
    this.MUSIC = new Sound('assets/sounds/Classic Mariachi - Jimena Contreras.mp3', 0.6, true);

    /** @type {Sound} - Intense boss fight music (looping). */
    this.BOSS_MUSIC = new Sound('assets/sounds/boss-fight.mp3', 1, true);

    /** @type {Sound} - Warning sound when the boss appears. */
    this.SCARED_BOSS = new Sound('assets/sounds/scared-rooster.mp3', 0.7, true);

    /** @type {Sound} - Sound when picking up a bottle item. */
    this.BOTTLE = new Sound('assets/sounds/bottle.mp3', 0.3, false);

    /** @type {Sound} - Specific death sound for chick enemies. */
    this.CHICK_DEAD = new Sound('assets/sounds/chick-dead.mp3', 0.3, false);

    /** @type {Sound} - Victory fanfare. */
    this.WIN = new Sound('assets/sounds/win.mp3', 1, false);

    /** @type {Sound} - Game over sound sequence. */
    this.LOSE = new Sound('assets/sounds/lose.mp3', 1, false);
  }
}