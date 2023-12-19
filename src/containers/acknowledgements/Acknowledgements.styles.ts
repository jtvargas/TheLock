import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
    padding: theme.spacing.sm,
  },
  playIcon: { alignSelf: 'flex-end', paddingRight: theme.spacing.md },
}));

export default styles;
