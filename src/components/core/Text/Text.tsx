/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Text as TextRN } from 'react-native';
import { TextProps } from '@type/typography';
import { useStyles } from '@core/Theme';

const Text = (props: TextProps) => {
  const { type = 'body', weight = 'regular', style, children } = props;
  const { theme } = useStyles();

  return (
    <TextRN
      {...props}
      style={[
        style,
        {
          ...theme.textVariants[type],
          ...theme.textVariants[weight],
          color: theme.colors.text,
        },
      ]}
    >
      {children}
    </TextRN>
  );
};

export default Text;
