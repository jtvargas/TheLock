import React from 'react';
import { ActivityIndicator, StatusBar, Text } from 'react-native';
import { UnistylesTheme } from 'react-native-unistyles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as Notifications from 'expo-notifications';

import { Theme } from '@core';
import { store, persistor } from '@redux';

// Navigation
import useCachedResources from '@hooks/useCachedResources';
import NavigationContainer from './navigation';

// disable font scaling for all text
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Text as any).defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(Text as any).defaultProps,
  allowFontScaling: false,
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <ActivityIndicator />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <UnistylesTheme theme={Theme}>
            <NavigationContainer />
            <StatusBar barStyle="light-content" />
          </UnistylesTheme>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
