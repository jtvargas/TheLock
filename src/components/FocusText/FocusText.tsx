import React, { useEffect, useRef, memo } from 'react';
import { View, Animated } from 'react-native';
import isNil from 'lodash/isNil';

import { Text } from '@components/core';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './FocusText.styles';

type FocusText = {
  value: string | null;
  isFocus: boolean;
  backgroundColor: string;
  borderColor: string;
  shakeBoxAnimValue: Animated.Value | number;
};

const FocusText = (props: FocusText) => {
  const {
    isFocus = true,
    value,
    borderColor,
    backgroundColor,
    shakeBoxAnimValue,
  } = props;
  const { styles } = useStyles(styleSheet);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isFocus) {
      const blink = Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]);

      const loopAnimation = Animated.loop(blink);
      loopAnimation.start();

      return () => {
        loopAnimation.stop();
      };
    }
    return () => null;
  }, [isFocus, value]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          opacity: isFocus || !isNil(value) ? 1 : 0.8,
          borderColor,
          transform: [
            {
              translateX: shakeBoxAnimValue,
            },
          ],
        },
      ]}
    >
      {isFocus && isNil(value) ? (
        <Animated.View
          style={[
            styles.bar,
            { opacity: fadeAnim, backgroundColor: borderColor },
          ]}
        />
      ) : (
        <View style={styles.textContainer}>
          <Text type="largeTitle" weight="bold">
            {value}
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

export default memo(FocusText);
