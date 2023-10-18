import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useStyles } from '@core/Theme';
import Button from '../Button';

type ToggleButtonProps = {
  onPress: () => void;
  label: string;
  subLabel?: string;
  isActive: boolean;
  isDisabled: boolean;
};
const ToggleButton: React.FC<ToggleButtonProps> = props => {
  const { theme } = useStyles();
  const { label, onPress, isActive, subLabel, isDisabled } = props;

  return (
    <Button
      isDisabled={isDisabled}
      withBorder={false}
      withShadow={false}
      textAlign="flex-start"
      renderIconRightComponent={() =>
        isActive ? (
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
        )
      }
      color={theme.colors.secondaryBackground}
      label={label}
      subLabel={subLabel}
      onPress={onPress}
    />
  );
};

export default ToggleButton;
