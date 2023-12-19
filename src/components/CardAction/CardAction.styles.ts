import { scale } from 'react-native-size-matters';

import { createStyleSheet } from 'react-native-unistyles';

const BASE_WIDTH = 165;
const BASE_HEIGHT = 284;
const styles = createStyleSheet(theme => ({
  container: {
    borderWidth: 2,
    backgroundColor: theme.colors.cardPrimaryBackground,
    borderColor: theme.colors.border,
    padding: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    variants: {
      size: {
        small: {
          width: scale(BASE_WIDTH / 2),
          height: scale(BASE_HEIGHT / 4),
          flex: 1,
          justifyContent: 'center',
        },
        medium: {
          width: scale(BASE_WIDTH),
          height: scale(BASE_HEIGHT / 2),
          flex: 1,
          justifyContent: 'center',
        },
        large: {
          width: scale(BASE_WIDTH),
          minHeight: '40%',
          justifyContent: 'center',
        },
      },
    },
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    variants: {
      variant: {
        small: {},
        medium: {},
        large: {},
      },
    },
  },
  subtitle: {
    fontSize: 12,
    variants: {
      variant: {
        small: {},
        medium: {},
        large: {},
      },
    },
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 10,
    variants: {
      variant: {
        small: {},
        medium: {},
        large: {},
      },
    },
  },
}));

export default styles;
