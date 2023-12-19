import React, { useState } from 'react';
import { TouchableOpacity, View, Animated } from 'react-native';

import { Icon, Text } from '@components/core';
import { IconName } from '@components/core/Icon';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './CardAction.styles';

type IconConfig = {
  name: keyof typeof IconName;
  color: string;
};
interface CardActionProps {
  title: string;
  subtitle: string;
  icon: IconConfig;
  size: 'large' | 'medium' | 'small';
  onPress: () => void;
}

const TouchableOpacityAnimated =
  Animated.createAnimatedComponent(TouchableOpacity);

const ReusableAnimatedTouchableOpacity = ({ onPress, children, style }) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.2, // Scale down to 80% on press
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Restore to the original scale on release
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacityAnimated
      style={[style, { transform: [{ scale: scaleValue }] }]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {children}
    </TouchableOpacityAnimated>
  );
};

const CardAction: React.FC<CardActionProps> = ({
  title,
  subtitle,
  icon,
  size,
  onPress,
}) => {
  const { styles } = useStyles(styleSheet, {
    size,
  });

  return (
    <ReusableAnimatedTouchableOpacity
      style={[styles.container]}
      onPress={onPress}
    >
      {size !== 'small' ? (
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
          alignItems: size !== 'small' ? 'flex-end' : 'center',
        }}
      >
        <Icon
          name={icon.name}
          color={icon.color}
          size={size === 'small' ? 28 : 35}
        />
      </View>
    </ReusableAnimatedTouchableOpacity>
  );
};

export default CardAction;
