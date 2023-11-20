import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

import Text from '@components/core/Text';

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    // margin: 10, // Add some margin around the text
  },
  text: {
    // fontSize: 18, // Set text size
    color: 'white', // Set text color
  },
});

const BouncingText = ({ text }) => {
  // Initialize animated value
  const bounceAnim = useRef(new Animated.Value(0)).current; // Start at position 0

  useEffect(() => {
    // Define the animation sequence
    Animated.loop(
      // Loop the animation
      Animated.spring(bounceAnim, {
        toValue: 1, // Animate to its final value
        friction: 3, // Bounciness effect
        useNativeDriver: true,
      }),
      { iterations: -1 }, // Infinite iterations
    ).start();
  }, [bounceAnim]);

  // Interpolate the animated value for vertical translation
  const translateY = bounceAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1], // Bounce 15 pixels up and down
  });

  return (
    <Animated.View
      style={{ ...styles.textContainer, transform: [{ scale: translateY }] }}
    >
      <Text style={styles.text} type="callout">
        {text}
      </Text>
    </Animated.View>
  );
};

export default BouncingText;
