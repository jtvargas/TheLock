import React from 'react';
import { View } from 'react-native';

import Text from '@components/core/Text';

import { useStyles } from '@core/Theme';
import styleSheet from './PlayContainer.styles';

const PlayContainer = () => {
  const { styles } = useStyles(styleSheet);
  return (
    <View style={styles.container}>
      <Text>Play Container</Text>
    </View>
  );
};

export default PlayContainer;
