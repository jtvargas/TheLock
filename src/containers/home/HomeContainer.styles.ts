import { createStyleSheet } from '@core/Theme';

const WHITE = '#ffffff';
const PINK = '#c2185b';

const styles = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeWriterText: {
    color: WHITE,
    fontSize: 24,
  },
  typeWriterCursorText: {
    color: PINK,
    fontSize: 24,
  },
}));

export default styles;
