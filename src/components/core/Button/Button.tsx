import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useStyles } from '@src/core/Theme';
import Text from '@components/core/Text';
import { scale } from 'react-native-size-matters';

type ButtonProps = {
  onPress: () => void;
  label: string;
};
const Button: React.FC<ButtonProps> = props => {
  const { label = 'label text', onPress } = props;
  const { theme } = useStyles();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderWidth: 2,
        backgroundColor: theme.colors.cardPrimaryBackground,
        borderColor: theme.colors.border,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        minWidth: scale(120),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text type="body" weight="medium">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
