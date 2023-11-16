import React from 'react';
import { Linking, Alert } from 'react-native';

import { AboutScreenProps } from '@type';
import About from '@containers/about';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { GAME_STATE_ACTIONS, GAME_STATE_SELECTORS } from '@redux/GameState';

const itunesItemId = 6471700369;

const AboutScreen: React.FC<AboutScreenProps> = props => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const hasUnlockedAllThemes = useAppSelector(
    GAME_STATE_SELECTORS.getHasUnlockedAllThemes,
  );

  const handleGoToExternalWeb = () => {
    Alert.alert(
      `You're going to leave the app`,
      `You're about to leave the app and visit our webpage, where you can see the privacy policy of the app. Parental attention is advised.`,
      [
        {
          text: 'Visit Now',
          style: 'default',
          onPress: () =>
            Linking.openURL('https://jtvargas.github.io/TheLockWeb/'),
          // Linking.openURL('https://www.buymeacoffee.com/dev0x07'),
        },
        {
          text: 'Maybe Later',
          style: 'destructive',
          onPress: () => null,
        },
      ],
    );
  };
  const handleGoToRateApp = () => {
    Alert.alert(
      `You're going to leave the app`,
      `You're about to leave the app and visit the App Store, where you can rate the app. Parental attention is advised.`,
      [
        {
          text: 'Visit Now',
          style: 'default',
          onPress: () =>
            Linking.openURL(
              `https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`,
            ),
        },
        {
          text: 'Maybe Later',
          style: 'destructive',
          onPress: () => null,
        },
      ],
    );
  };

  return (
    <About
      onLongPressSecretText={() => {
        dispatch(GAME_STATE_ACTIONS.toggleUnlockAllThemes());
        alert(
          hasUnlockedAllThemes ? 'All themes locked' : 'All themes unlocked',
        );
      }}
      onRateAppPress={handleGoToRateApp}
      onPressAcknowledgements={() => navigation.push('Acknowledgements')}
      onPressBuyMeACoffe={handleGoToExternalWeb}
    />
  );
};

export default AboutScreen;
