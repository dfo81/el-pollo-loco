/**
 * A wrapper class for the HTML5 Audio API to manage game sounds and music.
 */
class Sound {
  /**
   * Creates an instance of a Sound.
   * @param {string} src - The path to the audio file.
   * @param {number} [volume=1] - The volume level (0 to 1).
   * @param {boolean} [loop=false] - Whether the sound should loop continuously.
   */
  constructor(src, volume = 1, loop = false) {
    /** @type {HTMLAudioElement} */
    this.audio = new Audio(src);
    this.audio.volume = volume;
    this.audio.loop = loop;
  }

  /**
   * Plays the sound if it is currently paused. 
   * Includes a catch block to prevent errors if playback is blocked by the browser.
   */
  play() {
    if (this.audio.paused) {
      this.audio.play().catch((e) => {});
    }
  }

  /**
   * Resets the sound to the beginning and starts playback immediately.
   */
  playFromStart() {
    this.audio.currentTime = 0;
    this.audio.play().catch((e) => {});
  }

  /**
   * Stops the sound completely and resets the playback position to the start.
   */
  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  /**
   * Pauses the sound at its current position without resetting it.
   */
  pause() {
    this.audio.pause();
  }
}