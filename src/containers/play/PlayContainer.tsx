import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, CircularSliderInput } from '@components';

import { useStyles } from '@core/Theme';
import styleSheet from './PlayContainer.styles';

const PlayContainer = () => {
  const { styles } = useStyles(styleSheet);
  const [value, setValue] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');

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
        <Text type="subTitle" weight="bold">
          Selected: {selectedValue}
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularSliderInput
          onValueChange={v => setValue(v)}
          onSelectValue={v => setSelectedValue(prev => `${prev},${v}`)}
          value={value}
          circleColor="#636E72"
          selectColor="#636E72"
          dragColor="#979D9F"
          selectStrokeColor="#979D9F"
          dragStrokeColor="#979D9F"
          indicatorColor="#636E72"
          indicatorStrokeColor="#979D9F"
          withoutNumberIndicator
        />
      </View>
      <Text type="callout" weight="bold" isOverlay>
        Tip: Enable haptic feedback
      </Text>
    </SafeAreaView>
  );
};

export default PlayContainer;
