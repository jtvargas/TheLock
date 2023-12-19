/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Text as TextRN } from 'react-native';
import { TextProps } from '@type/typography';
import { useStyles } from 'react-native-unistyles';

const Text = (props: TextProps) => {
  const {
    type = 'body',
    weight = 'regular',
    style,
    children,
    isOverlay,
  } = props;
  const { theme } = useStyles();

  return (
    <TextRN
      {...props}
      // allowFontScaling={false}
      style={[
        {
          ...theme.textVariants[type],
          ...theme.textVariants[weight],
          color: isOverlay ? theme.colors.textOverlay : theme.colors.text,
        },
        style,
      ]}
    >
      {children}
    </TextRN>
  );
};

export default Text;
