/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useRef, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { LOCKER_PICKER_THEME, REQUIRED_PLAYS_TO_UNLOCK } from '@core/Theme';
import { useStyles } from 'react-native-unistyles';
import {
  Divider,
  Text,
  Typewritter,
  ThemeCardToggle,
  ZoomBounce,
} from '@components';
import { LockerPickerTheme, PlayDifficulty, GameMode } from '@src/types';
import { scale } from 'react-native-size-matters';
import styleSheet from './PersonalizeContainer.styles';

type PersonalizeContainerProps = {
  onSelectTheme: (themeKey: LockerPickerTheme) => void;
  themeActive: string;
  availableThemes: unknown[];
};

const getHintsForThemes = () => {
  const hints = [];

  for (const theme in REQUIRED_PLAYS_TO_UNLOCK) {
    const requirements = REQUIRED_PLAYS_TO_UNLOCK[theme][GameMode.COMPETITIVE];
    const novice = requirements[PlayDifficulty.NOVICE];
    const advanced = requirements[PlayDifficulty.ADVANCED];
    const expert = requirements[PlayDifficulty.EXPERT];

    const hintParts = [];

    if (novice) hintParts.push(`${novice} Novice plays`);
    if (advanced) hintParts.push(`${advanced} Advanced plays`);
    if (expert) hintParts.push(`${expert} Expert plays`);

    hints.push(`${theme}: Needs ${hintParts.join(', ')}`);
  }

  return hints;
};
const getRandomHint = () => {
  const hints = getHintsForThemes();
  const randomIndex = Math.floor(Math.random() * hints.length);
  return hints[randomIndex];
};

const PersonalizeContainer: React.FC<PersonalizeContainerProps> = props => {
  const flatListRef = useRef(null);
  const { onSelectTheme, themeActive, availableThemes = [] } = props;
  const { styles, theme } = useStyles(styleSheet);
  const randomHint = getRandomHint();
  const hasCollectedAllThemes =
    availableThemes.length === Object.keys(LOCKER_PICKER_THEME).length;

  useEffect(() => {
    const index = availableThemes.findIndex(
      themeKey => themeKey === themeActive,
    );

    if (index !== -1) {
      // Delay the scroll a bit to ensure the FlatList is loaded
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToIndex({ animated: true, index });
      }, 500); // Adjust delay as needed

      return () => clearTimeout(timer);
    }
    return () => null;
  }, []);

  const renderThemeCardItem = ({ item }) => {
    return (
      <ZoomBounce>
        <ThemeCardToggle
          onPress={() => onSelectTheme(item)}
          isActive={themeActive === item}
          label={item}
          colors={{
            first: theme.components.lockThemes[item].circleColor,
            second: theme.components.lockThemes[item].dragCTAColor,
            third: theme.components.lockThemes[item].dragCTAStrokeColor,
          }}
        />
      </ZoomBounce>
    );
  };
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Divider />
      <Text
        weight="medium"
        type="subTitle"
        style={{
          textAlign: 'center',
        }}
      >
        Select a lock picker theme. Play more to unlock others.
      </Text>

      <Divider />
      <FlatList
        ref={flatListRef}
        ListFooterComponent={
          <>
            <Divider />
            <Text
              weight="medium"
              type="callout"
              isOverlay
              style={{
                textAlign: 'center',
              }}
            >
              {availableThemes.length}/{Object.keys(LOCKER_PICKER_THEME).length}{' '}
              themes collected
            </Text>
          </>
        }
        getItemLayout={(data, index) => ({
          length: scale(100),
          offset: scale(100) * index,
          index,
        })}
        keyExtractor={item => item}
        contentContainerStyle={styles.contentContainerList}
        data={availableThemes}
        renderItem={renderThemeCardItem}
        ItemSeparatorComponent={<Divider />}
      />
      <Divider />

      <Typewritter
        textArray={[
          hasCollectedAllThemes ? 'All themes collected' : randomHint,
        ]}
        isOverlayText
        type="callout"
        weight="bold"
        speed={150}
        delay={500}
        withLeftCursor
        preText={hasCollectedAllThemes ? '' : 'Hint: Theme '}
      />

      <Divider />
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
        }}
      >
        <MaterialCommunityIcons
          name="gesture-swipe-down"
          size={28}
          color={theme.colors.onMainBackground}
        />
        <Typewritter
          textArray={['Swipe down to close']}
          isOverlayText
          type="callout"
          weight="bold"
          speed={100}
          delay={500}
          withLeftCursor
          preText="Tip: "
        />
      </View>
    </SafeAreaView>
  );
};

export default PersonalizeContainer;
