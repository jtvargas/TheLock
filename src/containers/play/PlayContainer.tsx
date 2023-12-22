import React, { useRef, useEffect, useCallback } from 'react';
import { View, Animated, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import max from 'lodash/max';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import {
  Text,
  CircularSliderInput,
  FocusTextGrid,
  Typewritter,
  ModalPopup,
  Divider,
} from '@components';

import { useStyles } from 'react-native-unistyles';
import { PlayDifficulty } from '@src/types';
import ResultsContent from './components/ResultsContent';
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
  tryAttemps: number;
  timePassing?: string | null;
  isVisibleGameOverPopUp: boolean;
};

const PlayContainer: React.FC<PlayContainerProps> = props => {
  const {
    timePassing = null,
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
    isVisibleGameOverPopUp = false,
    tryAttemps,
    showTipMessage = true,
    showHelpEmoji = true,
    squareInputColors = {
      backgroundColor: '#636E72',
      borderColor: '#979D9F',
    },
    isGameOverByInvalidNumber = false,
    difficulty,
    gameMode,
    onSelectValue,
    onCircleValueChange,
    onCloseWinPopup,
    onPlayAgain,
  } = props;
  const { styles, theme } = useStyles(styleSheet);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const shakeBoxAnim = useRef(new Animated.Value(0)).current;
  const vibrateCircleAnim = useRef(new Animated.Value(0)).current;
  const resultContentRef = useRef(null);

  const startShakeAnimCircle = () => {
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

  const startShakeBoxAnim = () => {
    Animated.sequence([
      Animated.timing(shakeBoxAnim, {
        toValue: -3,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeBoxAnim, {
        toValue: 3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeBoxAnim, {
        toValue: -3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeBoxAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startShakeAnim = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (shakeCircle) {
      startShakeAnimCircle();
    }
  }, [shakeCircle, circleValue]);

  useEffect(() => {
    if (helpVibrate) {
      startShakeAnim();
      startShakeBoxAnim();
    }
  }, [helpVibrate]);

  const onCaptureResultsSnapshot = () => {
    captureRef(resultContentRef, {
      format: 'png',
      quality: 1.0,
    }).then(
      uri => {
        Sharing.shareAsync(uri);
      },
      error => console.error('Oops, snapshot failed', error),
    );
  };

  const renderModalWinPopUp = () => {
    return (
      <>
        <ModalPopup
          isVisible={isVisibleWinPopup}
          position="bottom"
          size="medium"
          onClose={onCloseWinPopup}
          style={{ zIndex: 0 }}
          customBackgroundColor={squareInputColors.backgroundColor}
          containerStyle={{ borderRadius: 35 }}
        >
          <ResultsContent
            focusTextProps={{
              backgroundSquareColor: squareInputColors.backgroundColor,
              borderSquareColor: squareInputColors.borderColor,
            }}
            playAgainAction={{ title: 'Play Again', onPress: onPlayAgain }}
            shareAction={{
              title: 'Share Results',
              onPress: onCaptureResultsSnapshot,
            }}
            playResults={{
              gameMode,
              timeSpent,
              difficulty,
              expectedResultValue: expectedTextValue,
            }}
          />
        </ModalPopup>
        {/* Snapshot view */}
        <ModalPopup
          ref={resultContentRef}
          isVisible={isVisibleWinPopup}
          position="bottom"
          size="medium"
          onClose={onCloseWinPopup}
          style={{ zIndex: 999 }}
          customBackgroundColor={squareInputColors.backgroundColor}
        >
          <ResultsContent
            focusTextProps={{
              backgroundSquareColor: squareInputColors.backgroundColor,
              borderSquareColor: squareInputColors.borderColor,
            }}
            withTipMessage={false}
            playResults={{
              timeSpent,
              difficulty,
              expectedResultValue: expectedTextValue,
              gameMode,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{ uri: 'AppIcon' }}
              style={{
                width: 18,
                height: 18,
                marginRight: 4,
              }}
            />
            <Text
              type="body"
              style={{
                textAlign: 'right',
                marginRight: 10,
              }}
            >
              The Lock: Game
            </Text>
          </View>
          <Divider spacing="sm" />
        </ModalPopup>
      </>
    );
  };
  const renderModalGameOverPopUp = () => {
    return (
      <ModalPopup
        isVisible={isVisibleGameOverPopUp}
        position="bottom"
        size="small"
        onClose={onCloseWinPopup}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Divider spacing="xs" dividerColor="green" />
          <Text type="title" weight="bold">
            {isGameOverByInvalidNumber ? ` Oops! Game Over!` : ` Game Over!`}
          </Text>
          <Divider spacing="xs" dividerColor="green" />
          <Text type="subTitle" weight="bold" style={{ textAlign: 'center' }}>
            {isGameOverByInvalidNumber
              ? `You've hit the danger digit!💣`
              : `You've used all your attempts 😔`}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
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
                Try Again
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
      {renderModalGameOverPopUp()}

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
        {timePassing ? (
          <Text type="subTitle" weight="medium" isOverlay>
            {timePassing}
          </Text>
        ) : null}
      </View>
      <FocusTextGrid
        shakeBoxAnimValue={shakeBoxAnim}
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
              transform: [
                {
                  translateY: [
                    PlayDifficulty.ADVANCED,
                    PlayDifficulty.EXPERT,
                  ].includes(difficulty)
                    ? 0
                    : shakeAnim,
                },
              ],
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
            {tryAttemps} 🔑
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
