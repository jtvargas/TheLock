import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

import { PanGestureHandler } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';
import Svg, { Circle, G, ForeignObject } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import memoize from 'lodash/memoize';
import isNil from 'lodash/isNil';

import { Colors } from '@utils';
import TextC from '@components/core/Text';
import { useStyles } from 'react-native-unistyles';
import { DIMENSION_WIDTH, DIMENSION_HEIGHT } from './Constants';

const STARTING_ANGLE_POINT = 90;

const AnimatedG = Animated.createAnimatedComponent(G);

const convertDegreesToRadians = (angle: number) => {
  return ((angle - STARTING_ANGLE_POINT) * Math.PI) / 180.0;
};
const convertDegreesToRadiansMemoized = memoize(convertDegreesToRadians);

const inverseAngle = (angle: number) => {
  let newAngle = angle + 180;
  if (newAngle > 360) {
    newAngle -= 360;
  }
  return newAngle;
};

const snapToNearestValue = (angle: number) => {
  const remainder = angle % 36;

  if (angle > 335) {
    return 0;
  }
  if (remainder < 20) {
    return angle - remainder;
  }
  return angle + (36 - remainder);
};

const degreeToNumber = (degree: number) => {
  // Normalize the degree
  let normalizedDegree = degree;
  if (normalizedDegree < 0) {
    normalizedDegree += 360;
  }

  // Convert degree to number
  const number = Math.floor(normalizedDegree / 36);
  return number;
};

type CircularSliderInputProps = {
  value: number;
  onSelectValue: (value: number) => void;
  shakeDrag: boolean;
  indicatorColor: string;
  indicatorStrokeColor: string;
  dragColor: string;
  dragStrokeColor: string;
  dragText: string;
  selectColor: string;
  selectStrokeColor: string;
  onValueChange: (value: number) => void;
  withoutNumberIndicator: boolean;
  circleColor: string;
  width?: number;
  height?: number;
};

const CircularSliderInput = (props: CircularSliderInputProps) => {
  const {
    width,
    height,
    value,
    onSelectValue,
    indicatorColor,
    indicatorStrokeColor,
    dragColor,
    dragStrokeColor,
    dragText = 'Drag',
    selectColor,
    selectStrokeColor,
    onValueChange,
    withoutNumberIndicator = false,
    circleColor,
    shakeDrag,
  } = props;
  const baseWidth = scale(width || DIMENSION_WIDTH);
  const baseHeight = scale(height || DIMENSION_HEIGHT);
  const RADIUS = baseWidth * scale(0.2);
  const smallestSide = scale(Math.min(RADIUS * 3, RADIUS * 3));
  const [isPressed, setIsPressed] = useState(false);
  const { theme } = useStyles();

  const shakeAnimation = new Animated.Value(0);
  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (shakeDrag) {
      startShake();
    }
  }, [value, shakeDrag]);

  const [dimensions] = useState({
    cx: baseWidth / 2,
    cy: baseHeight / 2,
    r: (smallestSide / 2) * 0.85,
  });

  useEffect(() => {
    const hapticFeedbackOnChange = async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    if (!isNil(value)) {
      hapticFeedbackOnChange();
    }
  }, [value]);

  const { cx, cy, r } = dimensions;

  const polarToCartesian = (angle: number, customRadius: number) => {
    const a = convertDegreesToRadiansMemoized(angle);
    const x = cx + (customRadius || r) * Math.cos(a);
    const y = cy + (customRadius || r) * Math.sin(a);
    return { x, y };
  };

  const cartesianToPolar = (x: number, y: number) => {
    return Math.round(
      Math.atan((y - cy) / (x - cx)) / (Math.PI / 180) + (x > cx ? 270 : 90),
    );
  };

  // const startCoord = polarToCartesian(0, r);
  const endCoord = polarToCartesian(value, r / 1.3);
  const dragCircleEndCoord = polarToCartesian(inverseAngle(value), r / 2);

  const handleGesture = async ({ nativeEvent: { x, y } }) => {
    // Adjust the value to the nearest snap point
    let newValue = cartesianToPolar(x, y);
    newValue = snapToNearestValue(newValue);
    onValueChange(newValue);
  };

  const handleOnConfirmValue = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onSelectValue(degreeToNumber(value));
  };

  const renderNumbers = () => {
    const numbers = Array.from({ length: 10 }, (_, index) => index); // [0, 1, 2, ... 9]
    return numbers.map(num => {
      const coords = polarToCartesian(num * 36, r / 1.3);
      return (
        <ForeignObject
          key={num}
          x={coords.x - scale(6)}
          y={coords.y - scale(15)}
        >
          <TextC key={num} type="subTitle" weight="bold">
            {num}
          </TextC>
        </ForeignObject>
      );
    });
  };

  const renderSnapPoints = () => {
    const numbers = Array.from({ length: 10 }, (_, index) => index); // [0, 1, 2, ... 9]
    return numbers.map(num => {
      const coords = polarToCartesian(num * 36, r / 2);
      return (
        <Circle
          key={num}
          cx={coords.x - scale(0)}
          cy={coords.y - scale(0)}
          r={2}
          stroke={dragStrokeColor}
          strokeOpacity={0.3}
          strokeWidth={10}
          fill={circleColor}
          opacity={0.4}
        />
      );
    });
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Svg width={baseWidth} height={baseHeight}>
        {renderSnapPoints()}

        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={dragStrokeColor}
          strokeOpacity={0.3}
          strokeWidth={4}
          fill={circleColor}
          opacity={0.6}
        />
        <Circle
          cx={cx}
          cy={cy}
          r={r / 1.5}
          stroke={Colors.hexToRGBA(dragStrokeColor, 0.6)}
          strokeWidth={2}
          fill={Colors.hexToRGBA(theme.colors.mainBackground, 0.3)}
        />
        <Circle
          cx={cx}
          cy={cy}
          r={r / 2.8}
          stroke={Colors.hexToRGBA(dragStrokeColor, 0.6)}
          strokeWidth={2}
          fill={Colors.hexToRGBA(theme.colors.mainBackground, 0.6)}
        />

        <G x={endCoord.x - 7.5} y={endCoord.y - 7.5}>
          <Circle
            cx={7.5}
            cy={4}
            r={scale(20)}
            fill={indicatorColor}
            stroke={indicatorStrokeColor}
            strokeOpacity={0.8}
            strokeWidth={6}
          />
          {withoutNumberIndicator && (
            <ForeignObject key={value} x={1} y={-10}>
              <TextC type="subTitle" weight="bold">
                {`${value / 36}`}
              </TextC>
            </ForeignObject>
          )}
        </G>
        {/* Add animation in this SVG group */}
        <AnimatedG
          x={dragCircleEndCoord.x - 7.5}
          y={dragCircleEndCoord.y - 7.5}
          style={{ transform: [{ translateX: shakeAnimation }] }}
        >
          <Circle
            cx={7.5}
            cy={7.5}
            r={scale(20)}
            fill={dragColor}
            stroke={dragStrokeColor}
            strokeOpacity={0.8}
            strokeWidth={4}
          />

          <ForeignObject key="drag" x={-11} y={-4}>
            <TextC type="callout" weight="bold">
              {dragText}
            </TextC>
          </ForeignObject>
        </AnimatedG>
        {!withoutNumberIndicator && renderNumbers()}

        <G>
          <Circle
            cx={cx}
            cy={cy}
            r={40}
            fill={isPressed ? Colors.hexToRGBA(selectColor, 0.2) : selectColor}
            stroke={selectStrokeColor}
            strokeOpacity={0.8}
            strokeWidth={6}
            onPress={handleOnConfirmValue}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
          />
          <ForeignObject key="drag" x={cx - 23} y={cy - 10}>
            <TextC type="callout" weight="bold">
              Select
            </TextC>
          </ForeignObject>
        </G>
      </Svg>
    </PanGestureHandler>
  );
};

export default CircularSliderInput;
