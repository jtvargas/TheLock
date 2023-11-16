import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';

import { Icon, Text } from '@components/core';
import { IconName } from '@components/core/Icon';
import { useStyles } from '@core/Theme';

import styleSheet from './CardAction.styles';

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

const TouchableOpacityAnimated =
  Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
const ReusableAnimatedTouchableOpacity = ({ onPress, children, style }) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.8, // Scale down to 80% on press
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
  variant,
  onPress,
}) => {
  const { styles } = useStyles(styleSheet);

  return (
    <ReusableAnimatedTouchableOpacity
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
    </ReusableAnimatedTouchableOpacity>
  );
};

export default CardAction;
