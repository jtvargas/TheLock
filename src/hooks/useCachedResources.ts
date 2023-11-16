/* eslint-disable global-require */
// import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          // ...FontAwesome.font,
          poppins: require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
          'poppins-thin': require('../../assets/fonts/Poppins/Poppins-Light.ttf'),
          'poppins-bold': require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
          'poppins-semibold': require('../../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
          'poppins-medium': require('../../assets/fonts/Poppins/Poppins-Medium.ttf'),
          'poppins-italic': require('../../assets/fonts/Poppins/Poppins-Italic.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
