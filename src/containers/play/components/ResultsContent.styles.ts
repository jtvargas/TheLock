import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultInfo: {
    flex: 2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  actionContent: {
    alignItems: 'center',
    width: '100%',
  },
  touchableContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  shareContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'orange',
  },
  tipContent: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 8,
  },
}));

export default styles;
