import { scale } from 'react-native-size-matters';
import { createStyleSheet } from '@core/Theme';

const styles = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  keyHelp: {
    position: 'absolute',
    right: scale(25),
    bottom: scale(50),
  },
}));

export default styles;
