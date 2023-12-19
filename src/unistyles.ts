import { UnistylesRegistry } from 'react-native-unistyles';
import { Theme, breakpoints } from '@core/Theme';

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  dark: typeof Theme.darkTheme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addThemes({
  dark: Theme.darkTheme,
})
  .addBreakpoints(breakpoints)
  .addConfig({
    adaptiveThemes: true,
  });
