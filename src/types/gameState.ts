// Defines the difficulty levels for the play.
export enum PlayDifficulty {
  NOVICE = 'NOVICE', // 3 Numbers
  ADVANCED = 'ADVANCED', // 4 Numbers
  EXPERT = 'EXPERT', // 6 Numbers
}

// Represents the state of play.
export enum PlayingState {
  PLAYING = 'PLAYING',
  IDLE = 'IDLE',
  WIN = 'WIN',
  LOSE = 'LOSE',
}

// Represents the available themes.
export enum LockerPickerTheme {
  DEFAULT = 'DEFAULT',
  SUNSET = 'SUNSET',
  OCEAN = 'OCEAN',
  FOREST = 'FOREST',
  WINE = 'WINE',
  PLATINIUM = 'PLATINIUM',
  GOLD = 'GOLD',
  SILVER = 'SILVER',
  BRAVERY = 'BRAVERY',
  LOYAL = 'LOYAL',
  WISDOM = 'WISDOM',
  AMBI = 'AMBI',
  AURORA = 'AURORA',
  NEBULA = 'NEBULA',
  ZENITH = 'ZENITH',
  ECLIPSE = 'ECLIPSE',
  SAPPHIRE = 'SAPPHIRE',
  VOLCANO = 'VOLCANO',
}

// Specifies the game mode.
export enum GameMode {
  SANDBOX = 'SANDBOX',
  COMPETITIVE = 'COMPETITIVE',
}

// Contains metadata for a scene.
export interface MetaScene {
  answer: string;
  startPlayTime: number;
  endPlayTime: number;
  timeLapsed?: string;
  attemps: number;
}

// Represents the configuration and state of a play scene.
export type PlayScene = {
  difficulty?: PlayDifficulty;
  playingState: PlayingState;
  gameMode?: GameMode;
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

export enum LockerPickerConfigKey {
  NUMBER_INDICATOR = 'NUMBER_INDICATOR',
  SHAKE_ANIMATION = 'SHAKE_ANIMATION',
  HAPTIC_FEEDBACK = 'HAPTIC_FEEDBACK',
  SHAKE_DRAG = 'SHAKE_DRAG', // for easy indication
}

export type LockerPickerConfig = Record<LockerPickerConfigKey, boolean>;

export enum SceneConfigKey {
  HELP_KEY = 'HELP_KEY',
  TIP_MESSAGE = 'TIP_MESSAGE',
  SOUND_EFFECT = 'SOUND_EFFECT',
}
export enum DeviceConfigKey {
  NOTIFICATION = 'NOTIFICATION',
}
export type SceneConfigCustom = Record<SceneConfigKey, boolean>;

export type DeviceConfig = {
  isAskedToReview: boolean;
  isNotificationEnable: boolean;
  localNotificationId: string | null;
};

export type DifficultyConfig = {
  tryAttemps: number;
  invalidNumbers: number;
};
// Defines the configuration settings for the game scene.
export type SceneConfig = {
  hasUnlockedAllThemes: boolean;
  lockerPicker: {
    themeName: keyof typeof LockerPickerTheme;
    colors: LockerPickerColors;
    // Toggle to enable or disable specific boolean options.
    config: LockerPickerConfig;
  };
  difficulty: PlayDifficulty;
  difficultyConfig: DifficultyConfig;
  config: SceneConfigCustom; // Toggle for displaying tip messages or Toggle for enabling the help key.
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
  /**
   * App Review State.
   */
  deviceState: DeviceConfig;
};
