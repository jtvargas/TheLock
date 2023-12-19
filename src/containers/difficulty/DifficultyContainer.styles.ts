import { useStyles, createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(theme => ({
  container: {
    backgroundColor: theme.colors.mainBackground,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    margin: theme.spacing.md,
  },
}));

export default styles;
