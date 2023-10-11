import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@redux';

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
import { initialGameState } from './Constants';

export const gameSlice = createSlice({
  name: 'gameState',
  initialState: initialGameState,
  reducers: {
    // PlayScene Reducers
    startPlaying: (state, action: PayloadAction<{ gameMode: GameMode }>) => {
      state.playScene.playingState = PlayingState.PLAYING;
      state.playScene.playMode = action.payload.gameMode;
    },
    finishPlaying: (state, action: PayloadAction<{ metaScene: MetaScene }>) => {
      const newPlayHistoryItem: PlayScene = {
        ...state.playScene,
        meta: action.payload.metaScene,
      };
      state.playHistory.push(newPlayHistoryItem);
    },
    changeSceneDifficulty: (
      state,
      action: PayloadAction<{ difficulty: PlayDifficulty }>,
    ) => {
      state.playScene.difficulty = action.payload.difficulty;
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

export const { startPlaying } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default gameSlice.reducer;
