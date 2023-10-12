import React from 'react';

import { GameMode, HomeScreenProps } from '@type';
import HomeContainer, { HomeOption } from '@containers/home';
import { useAppSelector } from '@redux';
import { GAME_STATE_SELECTORS } from '@redux/GameState';

const HomeScreen: React.FC<HomeScreenProps> = props => {
  const { navigation } = props;

  const playDifficulty = useAppSelector(GAME_STATE_SELECTORS.getDifficulty);

  const handleCardPress = (option: HomeOption) => {
    switch (option) {
      case HomeOption.PLAY:
        navigation.navigate('Play', { gameMode: GameMode.COMPETITIVE });
        break;
      case HomeOption.PRACTICE:
        navigation.navigate('Play', { gameMode: GameMode.SANDBOX });
        break;
      case HomeOption.DIFFICULTY:
        navigation.navigate('Difficulty');
        break;
      case HomeOption.STATS:
        navigation.navigate('Stats');
        break;
      case HomeOption.PERSONALIZE:
        navigation.navigate('Personalize');
        break;
      case HomeOption.ABOUT:
        navigation.navigate('About');
        break;

      default:
        navigation.navigate('Settings');
        break;
    }

    // navigation.navigate(screenKey, screenParams);
  };

  return (
    <HomeContainer onCardPress={handleCardPress} difficulty={playDifficulty} />
  );
};

export default HomeScreen;
