import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Icon, Text } from '@components/core';
import { IconName } from '@components/core/Icon';
import { useStyles } from '@core/Theme';

import styleSheet from './CardAction.styles';
// Define your icon mapping here based on your available icons
// This is a dummy example, replace with your actual icons
// const ICONS = {
//   play: require('./path-to-play-icon.png'),
//   stats: require('./path-to-stats-icon.png'),
//   // ... other icons
// };

type IconConfig = {
  name: keyof typeof IconName;
  color: string;
};
interface CardActionProps {
  title: string;
  subtitle: string;
  icon: IconConfig;
  variant: 'large' | 'medium' | 'small' | 'xsmall';
  onPress: () => void;
}

const CardAction: React.FC<CardActionProps> = ({
  title,
  subtitle,
  icon,
  variant,
  onPress,
}) => {
  const { styles } = useStyles(styleSheet);

  return (
    <TouchableOpacity
      style={[styles[variant], styles.container]}
      onPress={onPress}
    >
      {variant !== 'xsmall' ? (
        <View style={{ flex: 1 }}>
          <Text type="caption" weight="bold">
            {title}
          </Text>
          <Text type="caption" weight="regular">
            {subtitle}
          </Text>
        </View>
      ) : null}

      <View
        style={{
          alignItems: variant !== 'xsmall' ? 'flex-end' : 'center',
        }}
      >
        <Icon
          name={icon.name}
          color={icon.color}
          size={variant === 'small' ? 28 : 35}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CardAction;
