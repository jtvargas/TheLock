import React from 'react';
import { View, Text } from 'react-native';

import { useStyles } from '@core/Theme';
import styleSheet from './AboutContainer.styles';

const AboutContainer = () => {
  const { styles } = useStyles(styleSheet);

  return (
    <View style={styles.container}>
      <Text>About Container</Text>
    </View>
  );
};

export default AboutContainer;
