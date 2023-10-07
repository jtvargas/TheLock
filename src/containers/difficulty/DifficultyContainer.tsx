import React from 'react';
import { View, Text } from 'react-native';

import { useStyles } from '@core/Theme';
import styleSheet from './DifficultyContainer.styles';

const DifficultyContainer = () => {
  const { styles } = useStyles(styleSheet);

  return (
    <View style={styles.container}>
      <Text>Difficulty Container</Text>
    </View>
  );
};

export default DifficultyContainer;
