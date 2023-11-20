import { createStyleSheet } from '@core/Theme';

const styles = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
  },
  title: {
    fontWeight: 'bold',
    color: theme.colors.onMainBackground,
    marginBottom: 20,
    textAlign: 'center',
  },
  versionText: {
    color: theme.colors.textOverlay,
    marginBottom: 20,
    textAlign: 'center',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  featureText: {
    marginLeft: 10,
    color: theme.colors.onMainBackground,
    flex: 1,
    flexShrink: 1, // ensures text doesn't overflow
  },
}));

export default styles;
