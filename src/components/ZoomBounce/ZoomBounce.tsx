import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const ZoomBounceComponent = props => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const zoomIn = Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.back(1.5)),
    });

    const zoomOut = Animated.spring(scaleValue, {
      toValue: 0,
      tension: 20,
      friction: 3,
      useNativeDriver: true,
    });

    Animated.sequence([zoomIn]).start();

    return () => {
      // Cleanup animation on unmount (optional)
      scaleValue.setValue(0);
    };
  }, []);

  const handleStart = () => {
    const zoomIn = Animated.timing(scaleValue, {
      toValue: 1.2,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.out(Easing.back(1.5)),
    });
    const zoomOut = Animated.spring(scaleValue, {
      toValue: 1,
      tension: 20,
      friction: 3,
      useNativeDriver: true,
    });
    Animated.sequence([zoomIn, zoomOut]).start();
  };

  return (
    <Animated.View
      onTouchStart={props.animateOnTouch ? handleStart : () => null}
      style={[
        props.style,
        {
          // flex: 1,
          transform: [{ scale: scaleValue }],
          // Add other styles as needed
        },
      ]}
    >
      {props.children}
    </Animated.View>
  );
};

export default ZoomBounceComponent;
