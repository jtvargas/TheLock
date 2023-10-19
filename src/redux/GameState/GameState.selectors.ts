import { createSelector } from '@reduxjs/toolkit';
import get from 'lodash/get';
import filter from 'lodash/filter';

import { RootState } from '@redux/store';
import { GameMode, PlayDifficulty, PlayScene } from '@type';
import {
  LOCKER_PICKER_THEME,
  REQUIRED_PLAYS_TO_UNLOCK,
} from '@src/core/Theme/LockerPickerThemes';
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
export const getLockerPickerThemeName = createSelector(
  [getSceneConfig],
  sceneConfig => {
    return get(
      sceneConfig,
      ['lockerPicker', 'themeName'],
      initialGameState.sceneConfig.lockerPicker.themeName,
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

export const getAvailableThemes = createSelector(
  [getPlayHistory],
  playHistory => {
    const currentCompetitivePlays = filter(
      playHistory,
      (playScene: PlayScene) => playScene.gameMode === GameMode.COMPETITIVE,
    );
    const currentCompetitivePlaysNoviceCount = filter(
      currentCompetitivePlays,
      (playScene: PlayScene) => playScene.difficulty === PlayDifficulty.NOVICE,
    ).length;
    const currentCompetitivePlaysExpertCount = filter(
      currentCompetitivePlays,
      (playScene: PlayScene) => playScene.difficulty === PlayDifficulty.EXPERT,
    ).length;
    const currentCompetitivePlaysAdvancedCount = filter(
      currentCompetitivePlays,
      (playScene: PlayScene) =>
        playScene.difficulty === PlayDifficulty.ADVANCED,
    ).length;

    const currentSandboxPlays = filter(
      playHistory,
      (playScene: PlayScene) => playScene.gameMode === GameMode.SANDBOX,
    );

    const themesAvailable = filter(
      Object.keys(LOCKER_PICKER_THEME),
      themeKey => {
        const requiredCompetitiveCountByDifficulty =
          REQUIRED_PLAYS_TO_UNLOCK[themeKey][GameMode.COMPETITIVE];
        const requiredSandboxCount =
          REQUIRED_PLAYS_TO_UNLOCK[themeKey][GameMode.SANDBOX];

        const hasMeetNovicePlays =
          requiredCompetitiveCountByDifficulty[PlayDifficulty.NOVICE] <=
          currentCompetitivePlaysNoviceCount;
        const hasMeetAdvancedPlays =
          requiredCompetitiveCountByDifficulty[PlayDifficulty.ADVANCED] <=
          currentCompetitivePlaysAdvancedCount;
        const hasMeetExpertPlays =
          requiredCompetitiveCountByDifficulty[PlayDifficulty.EXPERT] <=
          currentCompetitivePlaysExpertCount;

        return (
          hasMeetExpertPlays &&
          hasMeetAdvancedPlays &&
          hasMeetNovicePlays &&
          currentSandboxPlays >= requiredSandboxCount
        );
      },
    );

    return themesAvailable;
  },
);
