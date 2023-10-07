import React from 'react';
import { Button, View } from 'react-native';

import { ScreenKey } from '@type';
import { useStyles } from '@core/Theme';
import { Text, Icon } from '@components';

import styleSheet from './HomeContainer.styles';

type HomeContainerProps = {
  onNavigateToScreen: (screenKey: ScreenKey) => void;
};
const HomeContainer = (props: HomeContainerProps) => {
  const { onNavigateToScreen } = props;
  const { styles } = useStyles(styleSheet);

  return (
    <View style={styles.container}>
      <Icon name="practice" size={32} color="white" />
      <Icon name="theme" size={32} color="white" />
      <Icon name="difficulty" size={32} color="white" />
      <Icon name="settings" size={32} color="white" />
      <Icon name="about" size={32} color="white" />
      <Icon name="play" size={32} color="white" />
      <Icon name="stats" size={32} color="white" />
      <Text type="caption" weight="regular">
        caption
      </Text>
      <Text type="callout" weight="medium">
        callout
      </Text>
      <Text type="body" weight="bold">
        body
      </Text>
      <Text type="subTitle" weight="regular">
        subTitle
      </Text>
      <Text type="title" weight="regular">
        title
      </Text>
      <Text type="largeTitle" weight="regular">
        largeTitle
      </Text>
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
