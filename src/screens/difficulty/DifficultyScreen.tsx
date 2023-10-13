import React from 'react';
import * as Haptics from 'expo-haptics';

import { DifficultyScreenProps } from '@type';
import DifficultyContainer from '@containers/difficulty';
import { PlayDifficulty } from '@src/types';
import { useGameState } from '@redux/GameState';

const DifficultyScreen: React.FC<DifficultyScreenProps> = () => {
  const { changeDifficulty, playDifficulty } = useGameState();

  const handleChangeDifficulty = async (difficultySelected: PlayDifficulty) => {
    changeDifficulty(difficultySelected);
    await Haptics.selectionAsync();
  };

  return (
    <DifficultyContainer
      difficulty={playDifficulty}
      onSelectDifficulty={handleChangeDifficulty}
    />
  );
};

export default DifficultyScreen;
