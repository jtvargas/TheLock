import { scale } from 'react-native-size-matters';
import { createStyleSheet } from '@core/Theme';

const styles = createStyleSheet(theme => ({
  container: {
    backgroundColor: theme.colors.cardPrimaryBackground,
    padding: theme.spacing.md,
    borderWidth: 0.6,
    borderColor: theme.colors.border,
    height: scale(120),
    width: scale(120),
    borderRadius: scale(120) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  selected: {
    borderWidth: 2,
    borderColor: theme.colors.border,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  text: {
    textAlign: 'center',
  },
}));

export default styles;
