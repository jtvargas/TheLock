import React from 'react';
import { Button } from 'react-native';

import { View } from '@components';
import Text from '@components/core/Text';
import { ScreenKey } from '@type';
import styles from './HomeContainer.styles';

type HomeContainerProps = {
  onNavigateToScreen: (screenKey: ScreenKey) => void;
};
const HomeContainer = (props: HomeContainerProps) => {
  const { onNavigateToScreen } = props;

  return (
    <View style={styles.container}>
      <Text>Open up App.ts to start working on your app!</Text>
      <Button title="Go to Play" onPress={() => onNavigateToScreen('Play')} />
      <Button title="Go to About" onPress={() => onNavigateToScreen('About')} />
      <Button
        title="Go to Settings"
        onPress={() => onNavigateToScreen('Settings')}
      />
      <Button
        title="Go to Personalize"
        onPress={() => onNavigateToScreen('Personalize')}
      />
      <Button title="Go to Stats" onPress={() => onNavigateToScreen('Stats')} />
      <Button
        title="Go to Difficulty"
        onPress={() => onNavigateToScreen('Difficulty')}
      />
    </View>
  );
};

export default HomeContainer;
