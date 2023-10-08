import React from 'react';
import { View } from 'react-native';
import { useStyles } from '@core/Theme';

enum Spacing {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}
type DividerProps = {
  isTransparent?: boolean;
  isVertical?: boolean;
  spacing?: keyof typeof Spacing;
  dividerColor?: string;
};

const Divider: React.FunctionComponent<DividerProps> = props => {
  const {
    isTransparent = true,
    isVertical,
    spacing = 'xs',
    dividerColor,
  } = props;
  const { theme } = useStyles();
  const spacer = isVertical
    ? { marginHorizontal: theme.spacing[spacing] }
    : { marginVertical: theme.spacing[spacing] };

  const viewDimenstions = isVertical
    ? { height: '100%', width: 1 }
    : { width: '100%', height: 1 };

  return (
    <View
      style={{
        backgroundColor: isTransparent ? 'transparent' : dividerColor,
        ...viewDimenstions,
        ...spacer,
      }}
    />
  );
};

export default Divider;
