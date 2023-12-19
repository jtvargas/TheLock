import { useStyles, createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
    paddingTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.sm,
  },
  contentContainerList: {
    paddingBottom: theme.spacing.xl,
  },
}));

export default styles;
