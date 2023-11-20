import React, { useRef, useEffect } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import max from 'lodash/max';

import {
  Text,
  CircularSliderInput,
  FocusTextGrid,
  Typewritter,
  ModalPopup,
  Divider,
} from '@components';

import { useStyles } from '@core/Theme';
import { PlayDifficulty } from '@src/types';
import styleSheet from './PlayContainer.styles';

type PlayContainerProps = {
  onCircleValueChange: (value: number) => void;
  onSelectValue: (value: number) => void;
  onCloseWinPopup: () => void;
  onPlayAgain: () => void;
  circleInputColors: {
    circleColor: string;
    selectCTAColor: string;
    selectCTAStrokeColor: string;
    dragCTAColor: string;
    dragCTAStrokeColor: string;
    circleNumberIndicatorColor: string;
    circleNumberIndicatorStrokeColor: string;
  };
  squareInputColors: {
    backgroundColor: string;
    borderColor: string;
  };
  circleValue: number | null;
  selectedTextValue: string;
  expectedTextValue: string;
  shakeCircle: boolean;
  shakeDrag: boolean;
  showTipMessage: boolean;
  showHelpEmoji: boolean;
  helpVibrate: boolean;
  withNumbersIndicator: boolean;
  isVisibleWinPopup: boolean;
  timeSpent: string;
  difficulty: PlayDifficulty;
};

const PlayContainer: React.FC<PlayContainerProps> = props => {
  const {
    circleInputColors,
    selectedTextValue = '',
    timeSpent = '',
    expectedTextValue = '000',
    circleValue = null,
    shakeCircle = false,
    helpVibrate = false,
    shakeDrag = false,
    withNumbersIndicator = false,
    isVisibleWinPopup = false,
    showTipMessage = true,
    showHelpEmoji = true,
    squareInputColors = {
      backgroundColor: '#636E72',
      borderColor: '#979D9F',
    },
    difficulty,
    onSelectValue,
    onCircleValueChange,
    onCloseWinPopup,
    onPlayAgain,
  } = props;
  const { styles, theme } = useStyles(styleSheet);
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

  const renderModalWinPopUp = () => {
    return (
      <ModalPopup
        isVisible={isVisibleWinPopup}
        position="bottom"
        size="medium"
        onClose={onCloseWinPopup}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Divider spacing="md" dividerColor="green" />
          <Text type="subTitle" weight="bold">
            Correct!
          </Text>
          <Divider spacing="sm" dividerColor="green" />
          <Text type="title" weight="bold">
            You took: {timeSpent}
          </Text>
          <Divider spacing="sm" dividerColor="green" />
          <Text type="subTitle" weight="bold">
            to guess:
          </Text>
        </View>

        <View
          style={{
            flex: 2,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <FocusTextGrid
            textValue={expectedTextValue}
            currentIndexFocus={0}
            currentFocusValue={expectedTextValue}
            backgroundSquareColor={squareInputColors.backgroundColor}
            borderSquareColor={squareInputColors.borderColor}
          />

          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={onPlayAgain}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 2,
                borderColor: 'orange',
              }}
            >
              <Text
                weight="bold"
                type="subTitle"
                isOverlay
                style={{ marginLeft: 4, color: 'orange' }}
              >
                Play Again
              </Text>
            </TouchableOpacity>
            <Divider spacing="sm" />
            <Text type="body" weight="bold">
              Difficulty: {difficulty}
            </Text>
          </View>
        </View>

        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            paddingBottom: 8,
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
            speed={0}
            delay={0}
            withLeftCursor
            preText="Tip: "
          />
        </View>
      </ModalPopup>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderModalWinPopUp()}

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
        backgroundSquareColor={squareInputColors.backgroundColor}
        borderSquareColor={squareInputColors.borderColor}
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

      {showHelpEmoji ? (
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
            onLongPress={() =>
              alert(`The max number is: ${max(expectedTextValue)}`)
            }
          >
            🔑
          </Text>
        </Animated.View>
      ) : null}
      {showTipMessage ? (
        <Typewritter
          textArray={['Move the drag circle']}
          isOverlayText
          type="callout"
          weight="bold"
          speed={150}
          delay={500}
          withLeftCursor
          preText="Tip: "
        />
      ) : null}
    </SafeAreaView>
  );
};

export default PlayContainer;
