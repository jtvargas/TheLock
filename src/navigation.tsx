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
import { useStyles } from '@core/Theme';

import { RootStackParamList } from '@type';

const Stack = createNativeStackNavigator<RootStackParamList>();

function NavigationContainer() {
  const { theme } = useStyles();

  return (
    <NavigationContainerRNN>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: theme.colors.onMainBackground,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Play"
          component={PlayScreen}
          options={{ headerBackTitleVisible: false }}
        />

        <Stack.Screen name="Personalize" component={PersonalizeScreen} />
        <Stack.Screen name="Stats" component={StatsScreen} />
        <Stack.Screen name="Difficulty" component={DifficultyScreen} />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false, presentation: 'modal' }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ headerShown: false, presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainerRNN>
  );
}

export default NavigationContainer;
