import { createStyleSheet } from '@core/Theme';

const styles = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default styles;
