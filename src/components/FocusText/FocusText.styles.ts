import { scale } from 'react-native-size-matters';

import { useStyles, createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(theme => ({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#636E72',
    padding: theme.spacing.sm,
    borderColor: '#979D9F',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 6,
  },
  bar: {
    width: scale(6),
    height: scale(50),
    backgroundColor: '#979D9F',
  },
  barBotom: {
    height: scale(8),
    width: '100%',
    backgroundColor: '#636E72',
  },
  textContainer: {
    height: scale(50),
    textAlign: 'center',
  },
}));

export default styles;
