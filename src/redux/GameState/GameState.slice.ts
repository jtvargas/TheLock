import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
  GameMode,
  LockerPickerColors,
  MetaScene,
  PlayDifficulty,
  PlayingState,
} from '@type';

import {
  LockerPickerConfigKey,
  PlayScene,
  SceneConfigKey,
} from '@src/types/gameState';
import { DateUtils } from '@utils';
import { initialGameState } from './Constants';

export const gameSlice = createSlice({
  name: 'gameState',
  initialState: initialGameState,
  reducers: {
    // PlayScene Reducers
    changePlayingState: (
      state,
      action: PayloadAction<{ playingState: PlayingState }>,
    ) => {
      state.playScene.playingState = action.payload.playingState;
    },
    startPlaying: state => {
      state.playScene.playingState = PlayingState.PLAYING;
      state.playScene.meta.startPlayTime = DateUtils.getDateInDayJs().unix();
    },
    stopPlaying: state => {
      state.playScene.playingState = PlayingState.IDLE;
      state.playScene.meta = initialGameState.playScene.meta;
    },
    attempWin: state => {
      state.playScene.playingState = PlayingState.LOSE;
      state.playScene.meta.attemps += 1;
    },
    finishPlaying: (state, action: PayloadAction<{ metaScene: MetaScene }>) => {
      const { startPlayTime } = state.playScene.meta;
      const endPlayTime = DateUtils.getDateInDayJs().unix();
      const newPlayHistoryItem: PlayScene = {
        ...state.playScene,
        playingState: PlayingState.WIN,
        meta: {
          ...state.playScene.meta,
          ...action.payload.metaScene,
          endPlayTime,
          timeLapsed: DateUtils.getTimeLapsed(startPlayTime, endPlayTime),
        },
      };
      state.playScene = newPlayHistoryItem;
      state.playHistory.push(newPlayHistoryItem);
    },
    changeSceneDifficulty: (
      state,
      action: PayloadAction<{ difficulty: PlayDifficulty }>,
    ) => {
      state.playScene.difficulty = action.payload.difficulty;
    },
    changeGameMode: (state, action: PayloadAction<{ gameMode: GameMode }>) => {
      state.playScene.gameMode = action.payload.gameMode;
    },
    // SceneConfig Reducers
    changeLockerPickerThemeColors: (
      state,
      action: PayloadAction<{ lockerPickerColors: LockerPickerColors }>,
    ) => {
      state.sceneConfig.lockerPicker.colors = action.payload.lockerPickerColors;
    },
    toggleLockerPickerConfig: (
      state,
      action: PayloadAction<{ lockerPickerConfigKey: LockerPickerConfigKey }>,
    ) => {
      state.sceneConfig.lockerPicker.config[
        action.payload.lockerPickerConfigKey
      ] =
        !state.sceneConfig.lockerPicker.config[
          action.payload.lockerPickerConfigKey
        ];
    },
    toggleSceneConfig: (
      state,
      action: PayloadAction<{ sceneConfig: SceneConfigKey }>,
    ) => {
      state.sceneConfig.config[action.payload.sceneConfig] =
        !state.sceneConfig.config[action.payload.sceneConfig];
    },
  },
});

export const GAME_STATE_ACTIONS = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default gameSlice.reducer;
