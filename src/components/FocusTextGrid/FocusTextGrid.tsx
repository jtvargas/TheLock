import React from 'react';
import { View } from 'react-native';
import map from 'lodash/map';
import get from 'lodash/get';

import FocusText from '@components/FocusText';

type FocusTextGridProps = {
  textValue: string;
  currentFocusValue: string | null;
  currentIndexFocus: number;
};

const FocusTextGrid = (props: FocusTextGridProps) => {
  const { textValue, currentFocusValue, currentIndexFocus } = props;

  const renderFocusTextItem = (text: string, index: number) => {
    return (
      <View key={`${text}-${index}`} style={{ width: 80, margin: 8 }}>
        <FocusText
          value={get(currentFocusValue, index, null)}
          isFocus={index === currentIndexFocus}
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
