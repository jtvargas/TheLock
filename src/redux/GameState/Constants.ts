import {
  GameState,
  PlayDifficulty,
  PlayingState,
  LockerPickerTheme,
} from '@type';

const DIFFICULTY_CONFIG = {
  [PlayDifficulty.NOVICE]: {
    tryAttemps: 6,
    invalidNumbers: 1,
  },
  [PlayDifficulty.ADVANCED]: {
    tryAttemps: 4,
    invalidNumbers: 3,
  },
  [PlayDifficulty.EXPERT]: {
    tryAttemps: 2,
    invalidNumbers: 5,
  },
};

const initialGameState: GameState = {
  playScene: {
    playingState: PlayingState.IDLE,
    gameMode: undefined,
    meta: {
      startPlayTime: 0,
      answer: '',
      endPlayTime: 0,
      attemps: 0,
      timeLapsed: '',
    },
  },
  sceneConfig: {
    hasUnlockedAllThemes: false,
    lockerPicker: {
      themeName: LockerPickerTheme.DEFAULT,
      colors: {
        circleColor: '#636E72',
        selectCTAColor: '#636E72',
        selectCTAStrokeColor: '#979D9F',
        dragCTAColor: '#979D9F',
        dragCTAStrokeColor: '#979D9F',
        circleNumberIndicatorColor: '#636E72',
        circleNumberIndicatorStrokeColor: '#979D9F',
      },
      config: {
        HAPTIC_FEEDBACK: true,
        SHAKE_ANIMATION: false,
        NUMBER_INDICATOR: false,
        SHAKE_DRAG: false,
      },
    },
    difficulty: PlayDifficulty.NOVICE,
    difficultyConfig: DIFFICULTY_CONFIG[PlayDifficulty.NOVICE],
    config: {
      HELP_KEY: true,
      TIP_MESSAGE: true,
      SOUND_EFFECT: true,
    },
  },
  playHistory: [],
  deviceState: {
    isAskedToReview: false,
    isNotificationEnable: true,
    localNotificationId: null,
  },
};

const REVIEW_PLAYS_TRESHOLD = 3;

export { initialGameState, REVIEW_PLAYS_TRESHOLD, DIFFICULTY_CONFIG };
