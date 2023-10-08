import { TextProps as NativeTextProps } from 'react-native';

enum Type {
  caption = 'caption',
  callout = 'callout',
  body = 'body',
  subTitle = 'subtitle',
  title = 'title',
  largeTitle = 'largeTitle',
}
enum Weight {
  regular = 'regular',
  medium = 'medium',
  bold = 'bold',
}

export interface TextProps extends NativeTextProps {
  type: keyof typeof Type;
  weight: keyof typeof Weight;
  children?: string | number | string[];
  isOverlay?: boolean;
}

export default { Weight, Type };
