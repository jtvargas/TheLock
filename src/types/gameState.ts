// Defines the difficulty levels for the play.
export enum PlayDifficulty {
  NOVICE = 'NOVICE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

// Represents the state of play.
export enum PlayingState {
  PLAYING = 'PLAYING',
  IDLE = 'IDLE',
}

// Specifies the game mode.
export enum GameMode {
  SANDBOX = 'SANDBOX',
  COMPETITIVE = 'COMPETITIVE',
}

// Breakdown of time spent in the format of hours, minutes, and seconds.
export interface TimeBreakdown {
  hours: number;
  minutes: number;
  seconds: number;
}

// Contains metadata for a scene.
export interface MetaScene {
  playMode: GameMode;
  answer: string;
}

// Represents the configuration and state of a play scene.
export type PlayScene = {
  difficulty: PlayDifficulty;
  playingState: PlayingState;
  playDate: Date;
  timeSpentPlaying: TimeBreakdown;
  meta: MetaScene;
};

// Contains color definitions for the locker picker.
export type LockerPickerColors = {
  circleColor: string;
  selectCTAColor: string;
  selectCTAStrokeColor: string;
  dragCTAColor: string;
  dragCTAStrokeColor: string;
  circleNumberIndicatorColor: string;
  circleNumberIndicatorStrokeColor: string;
};

// Defines the configuration settings for the game scene.
export type SceneConfig = {
  lockerPicker: {
    colors: LockerPickerColors;
    // Toggle to enable or disable specific boolean options.
    withNumberIndicator: boolean;
    withShake: boolean;
    withHapticFeedback: boolean;
  };
  withHelpKey: boolean; // Toggle for enabling the help key.
  withTipMessage: boolean; // Toggle for displaying tip messages.
};

// Represents the entire game state, including play scenes, configurations, and history.
export type GameState = {
  /**
   * Represents the current state of the play scene.
   */
  playScene: PlayScene;

  /**
   * Configuration settings and metadata for the game scene.
   */
  sceneConfig: SceneConfig;

  /**
   * A history or log of previous play scenes.
   */
  playHistory: PlayScene[];
};
