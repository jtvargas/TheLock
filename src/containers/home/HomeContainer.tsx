import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import upperFirst from 'lodash/upperFirst';
import lowerCase from 'lodash/lowerCase';

import { PlayDifficulty } from '@type';
import { LOCKER_PICKER_THEME, useStyles } from '@core/Theme';
import { Divider, CardAction, Typewritter, BouncingText } from '@components';

import styleSheet from './HomeContainer.styles';

export enum HomeOption {
  PLAY = 'PLAY',
  PRACTICE = 'PRACTICE',
  DIFFICULTY = 'DIFFICULTY',
  STATS = 'STATS',
  PERSONALIZE = 'PERSONALIZE',
  SETTINGS = 'SETTINGS',
  ABOUT = 'ABOUT',
}
type HomeContainerProps = {
  onCardPress: (option: HomeOption) => void;
  onPressNewVersion: () => void;
  isNewVersionAvailable: boolean;
  difficulty: PlayDifficulty;
  themeCollected: number;
};
const HomeContainer = (props: HomeContainerProps) => {
  const {
    onCardPress,
    difficulty,
    themeCollected = 0,
    isNewVersionAvailable = false,
    onPressNewVersion,
  } = props;
  const { styles, theme } = useStyles(styleSheet);

  const renderTopActions = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <CardAction
          title="PLAY"
          subtitle={`Difficulty: ${upperFirst(lowerCase(difficulty))}`}
          icon={{
            name: 'play',
            color: theme.components.icon.play.color,
          }}
          variant="large"
          onPress={() => onCardPress(HomeOption.PLAY)}
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
          onPress={() => onCardPress(HomeOption.PRACTICE)}
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
          onPress={() => onCardPress(HomeOption.DIFFICULTY)}
        />
        <Divider spacing="xs" isVertical />
        <View style={{ flexDirection: 'column' }}>
          <CardAction
            title="STATS"
            subtitle="See your stats"
            icon={{
              name: 'stats',
              color: theme.components.icon.stats.color,
            }}
            variant="medium"
            onPress={() => onCardPress(HomeOption.STATS)}
          />
          <Divider />
          <CardAction
            title={`THEME (${themeCollected}/${
              Object.keys(LOCKER_PICKER_THEME).length
            })`}
            subtitle="Personalize colors"
            icon={{
              name: 'personalize',
              color: theme.components.icon.personalize.color,
            }}
            variant="small"
            onPress={() => onCardPress(HomeOption.PERSONALIZE)}
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
              onPress={() => onCardPress(HomeOption.ABOUT)}
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
              onPress={() => onCardPress(HomeOption.SETTINGS)}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Typewritter
        textArray={['The Lock.']}
        // loop
        speed={200}
        delay={500}
        cursorStyle={styles.typeWriterCursorText}
      />
      <Divider spacing="xs" />
      <Divider spacing="sm" />
      {renderTopActions()}
      <Divider spacing="xs" />
      {renderBottomActions()}

      {isNewVersionAvailable ? (
        <>
          <Divider spacing="sm" />
          <TouchableOpacity onPress={onPressNewVersion}>
            <BouncingText text="New version available, press here " />
          </TouchableOpacity>
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default HomeContainer;
