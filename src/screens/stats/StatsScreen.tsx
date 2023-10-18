import React, { useState } from 'react';
import filter from 'lodash/filter';
import { GameMode, PlayDifficulty, StatsScreenProps } from '@type';

import StatsContainer from '@containers/stats';
import { useAppSelector, GAME_STATE_SELECTORS } from '@redux';

import { NumbersUtils } from '@utils';

const StatsScreen: React.FC<StatsScreenProps> = props => {
  const { navigation } = props;
  const playHistory = useAppSelector(GAME_STATE_SELECTORS.getPlayHistory);

  const [difficultyToDisplay, setDifficultyToDisplay] = useState(
    PlayDifficulty.NOVICE,
  );

  const playHistoryFiltered = filter(playHistory, {
    difficulty: difficultyToDisplay,
  }).reverse();

  const handleOnSelectDifficultyToDisplay = (difficulty: PlayDifficulty) => {
    setDifficultyToDisplay(difficulty);
  };
  const handleOnPlayPress = () => {
    navigation.replace('Play', { gameMode: GameMode.COMPETITIVE });
  };
  return (
    <StatsContainer
      playHistory={playHistoryFiltered}
      totalAverageTime={NumbersUtils.getAverageTimeSpent(playHistory)}
      totalLocksUnlocked={playHistory.length}
      difficultySelected={difficultyToDisplay}
      onSelectDifficultyToDisplay={handleOnSelectDifficultyToDisplay}
      onPlayPress={handleOnPlayPress}
    />
  );
};

export default StatsScreen;
