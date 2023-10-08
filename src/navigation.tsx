import React from 'react';
import { NavigationContainer as NavigationContainerRNN } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import {
  HomeScreen,
  PlayScreen,
  SettingsScreen,
  PersonalizeScreen,
  StatsScreen,
  DifficultyScreen,
  AboutScreen,
} from '@screens';

import { RootStackParamList } from '@type';

const Stack = createNativeStackNavigator<RootStackParamList>();

function NavigationContainer() {
  return (
    <NavigationContainerRNN>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Play" component={PlayScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Personalize" component={PersonalizeScreen} />
        <Stack.Screen name="Stats" component={StatsScreen} />
        <Stack.Screen name="Difficulty" component={DifficultyScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainerRNN>
  );
}

export default NavigationContainer;
