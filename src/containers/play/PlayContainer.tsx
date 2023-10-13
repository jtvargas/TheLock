import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Text,
  CircularSliderInput,
  FocusTextGrid,
  Typewritter,
} from '@components';

import { useStyles } from '@core/Theme';
import styleSheet from './PlayContainer.styles';

type PlayContainerProps = {
  onCircleValueChange: (value: number) => void;
  onSelectValue: (value: number) => void;
  circleInputColors: {
    circleColor: string;
    selectCTAColor: string;
    selectCTAStrokeColor: string;
    dragCTAColor: string;
    dragCTAStrokeColor: string;
    circleNumberIndicatorColor: string;
    circleNumberIndicatorStrokeColor: string;
  };
  circleValue: number | null;
  selectedTextValue: string;
  expectedTextValue: string;
  shakeCircle: boolean;
  shakeDrag: boolean;
  helpVibrate: boolean;
  withNumbersIndicator: boolean;
};

const PlayContainer: React.FC<PlayContainerProps> = props => {
  const {
    circleInputColors,
    selectedTextValue = '',
    expectedTextValue = '000',
    circleValue = null,
    shakeCircle = false,
    helpVibrate = false,
    shakeDrag = false,
    withNumbersIndicator = false,
    onSelectValue,
    onCircleValueChange,
  } = props;
  const { styles } = useStyles(styleSheet);
  const vibrateAnim = useRef(new Animated.Value(0)).current;
  const vibrateCircleAnim = useRef(new Animated.Value(0)).current;

  const startVibratingCircle = () => {
    Animated.sequence([
      Animated.timing(vibrateCircleAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(vibrateCircleAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(vibrateCircleAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(vibrateCircleAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const startVibrating = () => {
    Animated.sequence([
      Animated.timing(vibrateAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(vibrateAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(vibrateAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(vibrateAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (shakeCircle) {
      startVibratingCircle();
    }
  }, [shakeCircle, circleValue]);

  useEffect(() => {
    if (helpVibrate) {
      startVibrating();
    }
  }, [helpVibrate]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text type="title" weight="bold">
          The Lock.
        </Text>
      </View>
      <FocusTextGrid
        textValue={expectedTextValue}
        currentIndexFocus={selectedTextValue.length || 0}
        currentFocusValue={selectedTextValue}
      />
      <View
        style={{
          flex: 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={[
            {
              transform: [{ translateX: vibrateCircleAnim }],
            },
          ]}
        >
          <CircularSliderInput
            onValueChange={onCircleValueChange}
            onSelectValue={onSelectValue}
            value={circleValue}
            shakeDrag={shakeDrag}
            circleColor={circleInputColors.circleColor}
            selectColor={circleInputColors.selectCTAColor}
            selectStrokeColor={circleInputColors.selectCTAStrokeColor}
            dragColor={circleInputColors.dragCTAColor}
            dragStrokeColor={circleInputColors.dragCTAStrokeColor}
            indicatorColor={circleInputColors.circleNumberIndicatorColor}
            indicatorStrokeColor={
              circleInputColors.circleNumberIndicatorStrokeColor
            }
            withoutNumberIndicator={!withNumbersIndicator}
          />
        </Animated.View>
      </View>

      <Animated.View
        style={[
          {
            transform: [{ translateY: vibrateAnim }],
          },
          styles.keyHelp,
        ]}
      >
        <Text
          type="callout"
          weight="bold"
          isOverlay
          onLongPress={() => alert('it is what it is')}
        >
          🔑
        </Text>
      </Animated.View>
      <Typewritter
        textArray={['Tip: Enable haptic feedback']}
        isOverlayText
        type="callout"
        weight="bold"
        speed={150}
        delay={500}
      />
    </SafeAreaView>
  );
};

export default PlayContainer;
