import { createSelector } from '@reduxjs/toolkit';
import get from 'lodash/get';
import filter from 'lodash/filter';

import { RootState } from '@redux';
import { GameMode, PlayScene } from '@type';
import { initialGameState } from './Constants';

export const getGameState = (state: RootState) => {
  return state.gameState;
};

export const getPlayScene = createSelector([getGameState], gameState => {
  return get(gameState, ['playScene'], initialGameState.playScene);
});

export const getPlayingState = createSelector([getPlayScene], playScene => {
  return get(
    playScene,
    ['playingState'],
    initialGameState.playScene.playingState,
  );
});

export const getWinAttemps = createSelector([getPlayScene], playScene => {
  return get(
    playScene,
    ['meta', 'attemps'],
    initialGameState.playScene.meta.attemps,
  );
});
export const getTimeLapsed = createSelector([getPlayScene], playScene => {
  return get(
    playScene,
    ['meta', 'timeLapsed'],
    initialGameState.playScene.meta.timeLapsed,
  );
});

export const getSceneConfig = createSelector([getGameState], gameState => {
  return get(gameState, ['sceneConfig'], initialGameState.sceneConfig);
});

export const getDifficulty = createSelector([getSceneConfig], sceneConfig => {
  return get(
    sceneConfig,
    ['difficulty'],
    initialGameState.sceneConfig.difficulty,
  );
});

export const getLockerPickerConfig = createSelector(
  [getSceneConfig],
  sceneConfig => {
    return get(
      sceneConfig,
      ['lockerPicker', 'config'],
      initialGameState.sceneConfig.lockerPicker.config,
    );
  },
);
export const getSceneLockerPickerColors = createSelector(
  [getSceneConfig],
  sceneConfig => {
    return get(
      sceneConfig,
      ['lockerPicker', 'colors'],
      initialGameState.sceneConfig.lockerPicker.colors,
    );
  },
);
export const getSceneConfigCustom = createSelector(
  [getSceneConfig],
  sceneConfig => {
    return get(sceneConfig, ['config'], initialGameState.sceneConfig.config);
  },
);

export const getPlayHistory = createSelector([getGameState], gameState => {
  return get(gameState, ['playHistory'], initialGameState.playHistory);
});

export const getPlayHistoryByGameMode = createSelector(
  [getPlayHistory, (_, gameMode: GameMode) => gameMode],
  (playHistory, gameMode) => {
    return filter(
      playHistory,
      (playScene: PlayScene) => playScene.gameMode === gameMode,
    );
  },
);
