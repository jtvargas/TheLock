import { GameState, PlayDifficulty, PlayingState } from '@type';

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
        SHAKE_DRAG: false,
      },
    },
    difficulty: PlayDifficulty.NOVICE,
    config: {
      HELP_KEY: false,
      TIP_MESSAGE: true,
    },
  },
  playHistory: [],
};

export { initialGameState };
