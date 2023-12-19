import { scale, moderateScale } from 'react-native-size-matters';

import { Colors as ColorsUtils } from '@utils';
import { Colors, ColorsType } from './Colors';
import { LOCKER_PICKER_THEME } from './LockerPickerThemes';

const palette: ColorsType = Colors;

const SIZE_FACTOR = 0.3;

const darkTheme = {
  colors: {
    mainBackground: palette.darkGray,
    secondaryBackground: palette.darkGrayDark,
    onMainBackground: palette.grayishWhite,
    cardPrimaryBackground: palette.darkGray,
    text: palette.white,
    textOverlay: ColorsUtils.hexToRGBA(palette.white, 0.3),
    error: palette.brickRed,
    border: palette.grayishWhite,
    highlight: palette.orange,
    success: palette.tealLight,
  },
  components: {
    circleInput: {
      color: palette.slateGray,
    },
    icon: {
      play: {
        color: palette.teal,
      },
      practice: {
        color: palette.pastelYellow,
      },
      difficulty: {
        color: palette.lightBlue,
      },
      about: {
        color: palette.coral,
      },
      personalize: {
        color: palette.lavender,
      },
      stats: {
        color: palette.pastelPink,
      },
      settings: {
        color: palette.white,
      },
    },
    lockThemes: { ...LOCKER_PICKER_THEME },
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

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  superLarge: 2000,
  tvLike: 4000,
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  dark: typeof darkTheme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

export type Theme = typeof darkTheme;
export default {
  darkTheme,
};
