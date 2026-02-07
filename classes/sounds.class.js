/**
 * A wrapper class for the HTML5 Audio API to manage game sounds and music.
 */
class Sound {
  constructor(src, volume = 1, loop = false) {
    this.audio = new Audio(src);
    this.audio.volume = volume;
    this.audio.loop = loop;
  }

  /**
   * Plays the sound ONLY if the global 'music' variable is true.
   */
  play() {
    // Greift auf die globale Variable in game.js zu
    if (typeof music !== 'undefined' && music && this.audio.paused) {
      this.audio.play().catch((e) => {});
    }
  }

  /**
   * Resets the sound and starts playback ONLY if global 'music' is true.
   */
  playFromStart() {
    this.audio.currentTime = 0;
    if (typeof music !== 'undefined' && music) {
      this.audio.play().catch((e) => {});
    }
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  pause() {
    this.audio.pause();
  }
}

/**
 * A central registry for all game sounds.
 */
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

  /**
   * Utility to stop every sound at once.
   */
  stopAll() {
    Object.keys(this).forEach(key => {
      if (this[key] instanceof Sound) {
        this[key].stop();
      }
    });
  }
}