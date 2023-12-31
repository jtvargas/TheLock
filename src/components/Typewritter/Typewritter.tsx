import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View, TextStyle } from 'react-native';

import Text from '@components/core/Text';
import { TextProps } from '@type/typography';

type TypewriterProps = {
  textArray: string[];
  speed?: number;
  loop?: boolean;
  isOverlayText?: boolean;
  delay?: number;
  textStyle?: TextStyle;
  cursorStyle?: TextStyle;
  preText?: string;
  withLeftCursor?: boolean;
} & Pick<TextProps, 'type' | 'weight'>;

const DEFAULT_SPEED = 300;
const DEFAULT_DELAY = 40;
const WHITE = '#ffffff';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  cursor: {
    color: WHITE,
    fontSize: 18,
  },
});

const Typewriter: React.FC<TypewriterProps> = ({
  textArray,
  withAnimation = true,
  speed = DEFAULT_SPEED,
  loop = false,
  delay = DEFAULT_DELAY,
  textStyle,
  cursorStyle,
  isOverlayText,
  type,
  weight,
  preText,
  withLeftCursor = false,
}) => {
  const [currentText, setCurrentText] = useState(preText ?? '');
  const intervalRef = useRef(null);
  const textArrayIndex = useRef(0);
  const charIndex = useRef(0);
  const opacityValue = useRef(new Animated.Value(0)).current;

  const startBlinkingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.delay(600),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.delay(300),
      ]),
    ).start();
  };

  const startTyping = () => {
    if (withAnimation) {
      intervalRef.current = setInterval(() => {
        if (charIndex.current < textArray[textArrayIndex.current].length) {
          setCurrentText(
            prev => prev + textArray[textArrayIndex.current][charIndex.current],
          );
          charIndex.current += 1;
        } else if (textArrayIndex.current < textArray.length - 1) {
          clearInterval(intervalRef.current);
          setTimeout(() => {
            setCurrentText('');
            textArrayIndex.current += 1;
            charIndex.current = 0;
            startTyping();
          }, delay);
        } else if (loop) {
          clearInterval(intervalRef.current);
          setTimeout(() => {
            setCurrentText('');
            textArrayIndex.current = 0;
            charIndex.current = 0;
            startTyping();
          }, delay);
        } else {
          clearInterval(intervalRef.current);
        }
      }, speed);
    } else {
      setCurrentText(preText + textArray[textArrayIndex.current]);
    }
  };

  useEffect(() => {
    startBlinkingAnimation();
    startTyping();

    // Cleanup
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      {withLeftCursor ? (
        <Animated.View style={{ opacity: opacityValue }}>
          <Text
            style={cursorStyle}
            type={type || 'title'}
            weight={weight || 'bold'}
            isOverlay={isOverlayText}
          >
            •
          </Text>
        </Animated.View>
      ) : null}
      <Text
        style={textStyle}
        type={type || 'title'}
        weight={weight || 'bold'}
        isOverlay={isOverlayText}
      >
        {currentText}
      </Text>
      <Animated.View style={{ opacity: opacityValue }}>
        <Text
          style={cursorStyle}
          type={type || 'title'}
          weight={weight || 'bold'}
          isOverlay={isOverlayText}
        >
          •
        </Text>
      </Animated.View>
    </View>
  );
};

export default Typewriter;
