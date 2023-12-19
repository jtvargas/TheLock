import { scale } from 'react-native-size-matters';
import { useStyles, createStyleSheet } from 'react-native-unistyles';

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
