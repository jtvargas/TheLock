import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import isNil from 'lodash/isNil';

import { useStyles } from '@core/Theme';
import { CircleToggle, Typewritter, Text } from '@components';
import { PlayDifficulty } from '@src/types';
import { scale } from 'react-native-size-matters';
import styleSheet from './DifficultyContainer.styles';

type DifficultyContainerProps = {
  difficulty: PlayDifficulty;
  onSelectDifficulty: (value: T) => void;
};

const ICON_SIZE = 32;
const DifficultyContainer = (props: DifficultyContainerProps) => {
  const { styles, theme } = useStyles(styleSheet);
  const { difficulty, onSelectDifficulty } = props;
  const arrowYPosition = useRef(new Animated.Value(0)).current;
  const circleRefs = useRef({});

  const animateArrow = toValue => {
    Animated.timing(arrowYPosition, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    let timeoutId = null;
    if (!isNil(circleRefs.current[difficulty])) {
      timeoutId = setTimeout(() => {
        circleRefs.current[difficulty].measure(
          (fx, fy, width, height, px, py) => {
            const yPos = py;
            const centeredYPos =
              yPos + height / 2 - scale(60) - scale(ICON_SIZE / 2); // Assuming the arrow has a height of 32
            animateArrow(centeredYPos);
          },
        );
      }, 60);
    }

    return () => {
      // Cleanup function
      if (timeoutId) {
        // If there's a timeout ID, clear it
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const handleSelectValue = (playDifficulty: PlayDifficulty) => {
    onSelectDifficulty(playDifficulty);
    circleRefs.current[playDifficulty].measure(
      (fx, fy, width, height, px, py) => {
        const yPos = py;
        const centeredYPos =
          yPos + height / 2 - scale(60) - scale(ICON_SIZE / 2); // Assuming the arrow has a height of 32
        animateArrow(centeredYPos);
      },
    );
  };

  return (
    <SafeAreaView style={[styles.container, { flex: 1, alignItems: 'center' }]}>
      <Text isOverlay type="callout" weight="bold">
        Selected: {difficulty}
      </Text>
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 1000,
          left: 50,
          alignSelf: 'flex-start',
          transform: [{ translateY: arrowYPosition }],
        }}
      >
        <MaterialCommunityIcons
          name="arrow-right"
          size={ICON_SIZE}
          color={theme.colors.onMainBackground}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 1000,
          right: 50,
          alignSelf: 'flex-start',
          transform: [{ translateY: arrowYPosition }],
        }}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={ICON_SIZE}
          color={theme.colors.onMainBackground}
        />
      </Animated.View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        {Object.values(PlayDifficulty).map(difficultyValue => {
          return (
            <View
              key={difficultyValue}
              style={[styles.circleContainer]}
              ref={ref => (circleRefs.current[difficultyValue] = ref)}
            >
              <CircleToggle
                isActive={difficulty === difficultyValue}
                label={difficultyValue}
                value={difficultyValue}
                onPress={handleSelectValue}
              />
            </View>
          );
        })}
      </ScrollView>
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
        />
      </View>
    </SafeAreaView>
  );
};

export default DifficultyContainer;
