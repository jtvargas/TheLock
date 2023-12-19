import { useStyles, createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
}));

export default styles;
