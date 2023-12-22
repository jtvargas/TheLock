import React from 'react';
import { ActivityIndicator, StatusBar, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as Notifications from 'expo-notifications';

import { store, persistor } from '@redux';

import useCachedResources from '@hooks/useCachedResources';

// Navigation
import NavigationContainer from './navigation';

// Unistyles
import './unistyles';

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
          <NavigationContainer />
          <StatusBar barStyle="light-content" />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
