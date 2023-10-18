import { createStyleSheet } from '@core/Theme';

const styles = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
}));

export default styles;
