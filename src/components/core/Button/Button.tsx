import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Text from '@components/core/Text';
import { scale } from 'react-native-size-matters';

type ButtonProps = {
  onPress: () => void;
  renderIconRightComponent: () => React.ReactElement;
  label: string;
  subLabel?: string;
  withBorder?: boolean;
  withShadow?: boolean;
  isDisabled: boolean;
  color?: string;
  textColor?: string;
  textAlign: 'center' | 'flex-start' | 'flex-end';
};
const Button: React.FC<ButtonProps> = props => {
  const {
    withBorder = true,
    withShadow = true,
    color,
    textColor,
    subLabel = null,
    label = 'label text',
    onPress,
    renderIconRightComponent = () => null,
    textAlign = 'center',
    isDisabled,
  } = props;
  const { theme } = useStyles();
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      style={{
        opacity: isDisabled ? 0.5 : 1,
        borderWidth: withBorder ? 2 : 0,
        backgroundColor: color || theme.colors.cardPrimaryBackground,
        borderColor: theme.colors.border,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        flexDirection: 'row',
        minWidth: scale(120),
        ...(withShadow && {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
        }),
        alignItems: 'center',
        justifyContent: textAlign,
      }}
    >
      <View>
        <Text
          type="body"
          weight="medium"
          style={[textColor && { color: textColor }]}
        >
          {label}
        </Text>
        {subLabel ? (
          <Text
            type="caption"
            weight="regular"
            style={[textColor && { color: textColor }]}
          >
            {subLabel}
          </Text>
        ) : null}
      </View>

      <View
        style={{
          position: 'absolute',
          right: theme.spacing.md,
        }}
      >
        {renderIconRightComponent()}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
