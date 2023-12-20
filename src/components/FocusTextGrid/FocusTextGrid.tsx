import React from 'react';
import { View, Animated } from 'react-native';
import map from 'lodash/map';
import get from 'lodash/get';

import FocusText from '@components/FocusText';

type FocusTextGridProps = {
  textValue: string;
  currentFocusValue: string | null;
  currentIndexFocus: number;
  backgroundSquareColor: string;
  borderSquareColor: string;
  shakeBoxAnimValue: Animated.Value | number;
};

const FocusTextGrid = (props: FocusTextGridProps) => {
  const {
    textValue,
    currentFocusValue,
    currentIndexFocus,
    backgroundSquareColor,
    borderSquareColor,
    shakeBoxAnimValue,
  } = props;

  const renderFocusTextItem = (text: string, index: number) => {
    return (
      <View key={`${text}-${index}`} style={{ width: 80, margin: 8 }}>
        <FocusText
          value={get(currentFocusValue, index, null)}
          isFocus={index === currentIndexFocus}
          backgroundColor={backgroundSquareColor}
          borderColor={borderSquareColor}
          shakeBoxAnimValue={
            index === currentIndexFocus ? shakeBoxAnimValue : 0
          }
        />
      </View>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // backgroundColor: 'green',
        width: '100%',
      }}
    >
      {map(textValue, renderFocusTextItem)}
    </View>
  );
};

export default FocusTextGrid;
