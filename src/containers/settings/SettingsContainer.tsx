import React from 'react';
import { View, Text } from 'react-native';

import { useStyles } from '@core/Theme';
import styleSheet from './SettingsContainer.styles';

const SettingsContainer = () => {
  const { styles } = useStyles(styleSheet);
  return (
    <View style={styles.container}>
      <Text>Settings Container</Text>
    </View>
  );
};

export default SettingsContainer;
