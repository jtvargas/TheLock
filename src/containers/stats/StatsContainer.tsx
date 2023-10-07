import React from 'react';
import { View, Text } from 'react-native';

import { useStyles } from '@core/Theme';
import styleSheet from './StatsContainer.styles';

const StatsContainer = () => {
  const { styles } = useStyles(styleSheet);

  return (
    <View style={styles.container}>
      <Text>Stats Container</Text>
    </View>
  );
};

export default StatsContainer;
