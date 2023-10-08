import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { UnistylesTheme } from 'react-native-unistyles';
import { Theme } from '@core';

// Navigation
import useCachedResources from '@hooks/useCachedResources';
import NavigationContainer from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <ActivityIndicator />;
  }

  return (
    <UnistylesTheme theme={Theme}>
      <NavigationContainer />
      <StatusBar barStyle="light-content" />
    </UnistylesTheme>
  );
}
