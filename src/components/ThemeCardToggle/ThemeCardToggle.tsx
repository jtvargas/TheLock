import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Text from '@components/core/Text';
import Divider from '@components/core/Divider';
import { useStyles } from '@src/core/Theme';

type ThemeCardToggleProps = {
  onPress: () => void;
  isActive: boolean;
  label: string;
  colors: {
    first: string;
    second: string;
    third: string;
  };
};

const ThemeCardToggle: React.FC<ThemeCardToggleProps> = props => {
  const { theme } = useStyles();
  const { colors, label, isActive, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
        backgroundColor: theme.colors.secondaryBackground,
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.secondaryBackground,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
          padding: theme.spacing.sm,
        }}
      >
        <Text type="body" weight="medium" style={{ color: 'white' }}>
          {label}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', padding: theme.spacing.sm }}>
        <View
          style={{
            width: scale(40),
            height: scale(40),
            backgroundColor: colors.first,
            borderRadius: 6,
          }}
        />
        <Divider isVertical />
        <View
          style={{
            width: scale(40),
            height: scale(40),
            backgroundColor: colors.second,
            borderRadius: 6,
          }}
        />
        <Divider isVertical />
        <View
          style={{
            width: scale(40),
            height: scale(40),
            backgroundColor: colors.third,
            borderRadius: 6,
          }}
        />
      </View>

      <View style={{ position: 'absolute', right: 20, top: 5 }}>
        {isActive ? (
          <MaterialCommunityIcons
            name="checkbox-blank-circle"
            size={32}
            color={theme.colors.success}
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-circle-outline"
            size={32}
            color={theme.colors.textOverlay}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ThemeCardToggle;
