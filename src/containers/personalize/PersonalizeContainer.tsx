import React from 'react';
import { View, Text } from 'react-native';

import { useStyles } from '@core/Theme';
import styleSheet from './PersonalizeContainer.styles';

const PersonalizeContainer = () => {
  const { styles } = useStyles(styleSheet);

  return (
    <View style={styles.container}>
      <Text>Personalize Container</Text>
    </View>
  );
};

export default PersonalizeContainer;
