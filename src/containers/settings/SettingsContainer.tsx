import React from 'react';
import { View, Text } from 'react-native';

import { useStyles } from '@core/Theme';
import { Button } from '@components';
import styleSheet from './SettingsContainer.styles';

type SettingsContainerProps = {
  onPressCleanHistory: () => void;
};
const SettingsContainer: React.FC<SettingsContainerProps> = props => {
  const { onPressCleanHistory } = props;
  const { styles } = useStyles(styleSheet);
  return (
    <View style={styles.container}>
      <Text>Settings Container</Text>
      <Button label="Clean history" onPress={onPressCleanHistory} />
    </View>
  );
};

export default SettingsContainer;
