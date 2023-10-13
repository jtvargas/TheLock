import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  ripple: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 500,
    opacity: 0.3,
  },
});

const RippleEffect = ({
  children,
  onPress,
  rippleColor = 'rgba(0,0,0,0.3)',
  ...props
}) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [rippleVisible, setRippleVisible] = useState(false);

  const onButtonPress = () => {
    setRippleVisible(true);

    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setRippleVisible(false);
      scaleValue.setValue(0);
      if (onPress) {
        onPress();
      }
    });
  };

  return (
    <TouchableOpacity {...props} onPress={onButtonPress} activeOpacity={1}>
      {children}
      {rippleVisible && (
        <Animated.View
          style={[
            styles.ripple,
            { transform: [{ scale: scaleValue }] },
            { backgroundColor: rippleColor },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

export default RippleEffect;
