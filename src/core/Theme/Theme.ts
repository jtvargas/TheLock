import { scale, moderateScale } from 'react-native-size-matters';
import { createUnistyles } from 'react-native-unistyles';

import { Colors as ColorsUtils } from '@utils';
import { Colors, ColorsType } from './Colors';

const palette: ColorsType = Colors;

const SIZE_FACTOR = 0.3;

const theme = {
  colors: {
    mainBackground: palette.darkGray,
    onMainBackground: palette.grayishWhite,
    cardPrimaryBackground: palette.darkGray,
    text: palette.white,
    textOverlay: ColorsUtils.hexToRGBA(palette.white, 0.3),
    error: palette.brickRed,
    border: palette.grayishWhite,
  },
  components: {
    circleInput: {
      color: palette.slateGray,
    },
  },
  spacing: {
    xs: scale(4),
    sm: scale(8),
    md: scale(16),
    lg: scale(24),
    xl: scale(32),
  },
  textVariants: {
    bold: {
      fontFamily: 'poppins-bold',
    },
    medium: {
      fontFamily: 'poppins-medium',
    },
    regular: {
      fontFamily: 'poppins',
    },
    caption: {
      fontSize: moderateScale(12, SIZE_FACTOR),
    },
    callout: {
      fontSize: moderateScale(14, SIZE_FACTOR),
    },
    body: {
      fontSize: moderateScale(16, SIZE_FACTOR),
    },
    subTitle: {
      fontSize: moderateScale(20, SIZE_FACTOR),
    },
    title: {
      fontSize: moderateScale(28, SIZE_FACTOR),
    },
    largeTitle: {
      fontSize: moderateScale(34, SIZE_FACTOR),
    },
    header: {
      fontFamily: 'poppins-bold',
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'black',
    },
  },
};
// breakpoints.ts
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  superLarge: 2000,
  tvLike: 4000,
};

export const { createStyleSheet, useStyles } = createUnistyles<
  typeof breakpoints,
  typeof theme
>(breakpoints);

export type Theme = typeof theme;
export default theme;
