import { GameMode, GameState, PlayDifficulty, PlayingState } from '@type';

const initialGameState: GameState = {
  playScene: {
    difficulty: PlayDifficulty.NOVICE,
    playingState: PlayingState.IDLE,
    playMode: GameMode.SANDBOX,
    meta: {},
  },
  sceneConfig: {
    lockerPicker: {
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
      },
    },
    config: {
      HELP_KEY: true,
      TIP_MESSAGE: true,
    },
  },
  playHistory: [],
};

export { initialGameState };
