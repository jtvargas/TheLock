import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { StyleSheet, View } from '@components';
import Text from '@components/core/Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.ts to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
