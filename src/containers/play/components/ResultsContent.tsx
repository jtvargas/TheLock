import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useStyles } from 'react-native-unistyles';
import { Text, Divider, Typewritter, FocusTextGrid } from '@src/components';
import styleSheet from './ResultsContent.styles';

type ResultsContainerProps = {
  withTipMessage: boolean;
  playResults: {
    timeSpent: string;
    expectedResultValue: string;
    difficulty: string;
    gameMode: string;
  };
  focusTextProps: {
    backgroundSquareColor: string;
    borderSquareColor: string;
  };
  shareAction: {
    title: string;
    onPress: () => void;
  };
  playAgainAction: {
    title: string;
    onPress: () => void;
  };
};

const ResultsContent = (props: ResultsContainerProps) => {
  const {
    focusTextProps,
    playAgainAction,
    playResults,
    shareAction,
    withTipMessage = true,
  } = props;
  const { styles } = useStyles(styleSheet);

  return (
    <>
      <View style={styles.container}>
        <Divider spacing="xs" dividerColor="green" />
        <Text type="subTitle" weight="bold">
          Correct!
        </Text>
        <Divider spacing="sm" dividerColor="green" />
        <Text type="title" weight="bold">
          You took: {playResults.timeSpent}
        </Text>
        <Divider spacing="xs" dividerColor="green" />
        <Text type="subTitle" weight="bold">
          to guess:
        </Text>
      </View>

      <View style={styles.resultInfo}>
        <FocusTextGrid
          shakeBoxAnimValue={0}
          textValue={playResults.expectedResultValue}
          currentIndexFocus={0}
          currentFocusValue={playResults.expectedResultValue}
          backgroundSquareColor={focusTextProps.backgroundSquareColor}
          borderSquareColor={focusTextProps.borderSquareColor}
        />
        <View style={styles.actionContent}>
          <Divider spacing="sm" />
          <Text type="body" weight="bold">
            Difficulty: {playResults.difficulty}
          </Text>
          <Divider spacing="xs" dividerColor="green" />

          <Text type="body" weight="bold">
            Mode: {playResults.gameMode}
          </Text>
          <Divider spacing="sm" dividerColor="green" />
          {isEmpty(playAgainAction) && isEmpty(shareAction) ? null : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={playAgainAction.onPress}
                style={styles.touchableContent}
              >
                <Text
                  weight="bold"
                  type="body"
                  isOverlay
                  style={{
                    color: 'orange',
                    textDecorationLine: 'underline',
                    textAlign: 'center',
                  }}
                >
                  {playAgainAction.title}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={shareAction.onPress}
                style={styles.touchableContent}
              >
                <Text
                  weight="bold"
                  type="body"
                  isOverlay
                  style={{
                    // marginLeft: 4,
                    color: 'orange',
                    textDecorationLine: 'underline',
                    textAlign: 'center',
                  }}
                >
                  {shareAction.title}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <Divider spacing="sm" dividerColor="green" />
      {withTipMessage ? (
        <View style={styles.tipContent}>
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
      ) : null}
    </>
  );
};

export default ResultsContent;
