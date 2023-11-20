import React, { useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Linking } from 'react-native';

import { GameMode, HomeScreenProps } from '@type';
import HomeContainer, { HomeOption } from '@containers/home';
import { useAppSelector, GAME_STATE_SELECTORS } from '@redux';
import useVersionCheck from '@hooks/useVersionCheck';

const HomeScreen: React.FC<HomeScreenProps> = props => {
  const { navigation } = props;
  const { getNeedUpdate } = useVersionCheck();
  const [needUpdateState, setAppNeedUpdateState] = useState({});

  const playDifficulty = useAppSelector(GAME_STATE_SELECTORS.getDifficulty);
  const availableThemes = useAppSelector(
    GAME_STATE_SELECTORS.getAvailableThemes,
  );
  const handleCardPress = async (option: HomeOption) => {
    await Haptics.selectionAsync();
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
  };

  useEffect(() => {
    const handleCheckNeedUpdate = async () => {
      const needUpdate = await getNeedUpdate();
      setAppNeedUpdateState(needUpdate);
    };
    handleCheckNeedUpdate();
  }, []);

  const handleNewVersionPress = () => {
    Linking.openURL(needUpdateState.storeUrl);
  };

  return (
    <HomeContainer
      onCardPress={handleCardPress}
      onPressNewVersion={handleNewVersionPress}
      isNewVersionAvailable={needUpdateState?.isNeeded}
      difficulty={playDifficulty}
      themeCollected={availableThemes.length}
    />
  );
};

export default HomeScreen;
