import React from 'react';
import { View, T } from 'react-native';

import { Text } from '@components/core';
import { useStyles } from '@src/core/Theme';
import stylesheet from './CircleToggle.styles';

import RippleEffect from '../RippleEffect';

type CircleToggleProps = {
  isActive: boolean;
  label: string;
  value: string;
  onPress: (value: T) => void;
};

const CircleToggle: React.FC<CircleToggleProps> = props => {
  const { styles } = useStyles(stylesheet);
  const { isActive, onPress, value, label } = props;

  return (
    <RippleEffect onPress={() => onPress(value)}>
      <View style={[styles.container, isActive && styles.selected]}>
        <Text type="caption" weight="bold" style={styles.text}>
          {label}
        </Text>
      </View>
    </RippleEffect>
  );
};

export default CircleToggle;
