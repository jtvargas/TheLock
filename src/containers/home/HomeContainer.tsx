import React from 'react';
import { View } from 'react-native';

import { ScreenKey } from '@type';
import { useStyles } from '@core/Theme';
import { Divider, CardAction, Text } from '@components';

import styleSheet from './HomeContainer.styles';

type HomeContainerProps = {
  onNavigateToScreen: (screenKey: ScreenKey) => void;
};
const HomeContainer = (props: HomeContainerProps) => {
  const { onNavigateToScreen } = props;
  const { styles, theme } = useStyles(styleSheet);

  const renderTopActions = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <CardAction
          title="PLAY"
          subtitle="Difficulty: Novice"
          icon={{
            name: 'play',
            color: theme.components.icon.play.color,
          }}
          variant="large"
          onPress={() => onNavigateToScreen('Play')}
        />
        <Divider spacing="xs" isVertical />
        <CardAction
          title="PRACTICE"
          subtitle="Practice without alter your stats"
          icon={{
            name: 'practice',
            color: theme.components.icon.practice.color,
          }}
          variant="large"
          onPress={() => onNavigateToScreen('Play')}
        />
      </View>
    );
  };

  const renderBottomActions = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <CardAction
          title="DIFFICULTY"
          subtitle="Select your Difficulty"
          icon={{
            name: 'difficulty',
            color: theme.components.icon.difficulty.color,
          }}
          variant="large"
          onPress={() => onNavigateToScreen('Difficulty')}
        />
        <Divider spacing="xs" isVertical />
        <View style={{ flexDirection: 'column' }}>
          <CardAction
            title="STATS"
            subtitle="See your stats and share with friends"
            icon={{
              name: 'stats',
              color: theme.components.icon.stats.color,
            }}
            variant="medium"
            onPress={() => onNavigateToScreen('Stats')}
          />
          <Divider />
          <CardAction
            title="THEME"
            subtitle="Personalize colors"
            icon={{
              name: 'personalize',
              color: theme.components.icon.personalize.color,
            }}
            variant="small"
            onPress={() => onNavigateToScreen('Personalize')}
          />

          <Divider />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <CardAction
              title="about"
              subtitle="information"
              icon={{
                name: 'about',
                color: theme.components.icon.about.color,
              }}
              variant="xsmall"
              onPress={() => onNavigateToScreen('About')}
            />
            <Divider isVertical />
            <CardAction
              title="settings"
              subtitle="settings"
              icon={{
                name: 'settings',
                color: theme.components.icon.settings.color,
              }}
              variant="xsmall"
              onPress={() => onNavigateToScreen('Settings')}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text type="title" weight="bold">
        The Lock.
      </Text>
      <Divider spacing="sm" />
      {renderTopActions()}
      <Divider spacing="xs" />
      {renderBottomActions()}
    </View>
  );
};

export default HomeContainer;
