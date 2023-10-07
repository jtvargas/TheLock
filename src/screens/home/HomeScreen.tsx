import React from 'react';

import { HomeScreenProps, ScreenKey } from '@type';
import HomeContainer from '@containers/home';

const HomeScreen: React.FC<HomeScreenProps> = props => {
  const { navigation } = props;

  const handleNavigateToScreen = (screenKey: ScreenKey) => {
    navigation.navigate(screenKey);
  };

  return <HomeContainer onNavigateToScreen={handleNavigateToScreen} />;
};

export default HomeScreen;
