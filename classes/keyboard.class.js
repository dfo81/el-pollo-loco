/**
 * Represents the state of user inputs (keyboard or touch).
 * Used to track which actions are currently active.
 */
class Keys {
  /** @type {boolean} - Moves the character to the left. */
  LEFT = false;

  /** @type {boolean} - Moves the character to the right. */
  RIGHT = false;

  /** @type {boolean} - Triggers a single bottle throw. Set to false after execution. */
  THROW_ONCE = false;

  /** @type {boolean} - Triggers a single jump. Set to false after execution. */
  JUMP_ONCE = false;

  /** @type {boolean} - Toggles the fullscreen mode. */
  FULLSCREEN = false;

  /** @type {boolean} - Toggles the game music on or off. */
  MUSIC = false;

  /** @type {boolean} - Toggles the pause state of the game. */
  PAUSE = false;

  /** @type {boolean} - Shows or hides the lyrics/credits screen. */
  LYRICS = false;
}