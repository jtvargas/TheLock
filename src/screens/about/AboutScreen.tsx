import React from 'react';
import { Linking } from 'react-native';

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

  return (
    <About
      onLongPressSecretText={() => {
        dispatch(GAME_STATE_ACTIONS.toggleUnlockAllThemes());
        alert(
          hasUnlockedAllThemes ? 'All themes locked' : 'All themes unlocked',
        );
      }}
      onRateAppPress={() =>
        Linking.openURL(
          `https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`,
        )
      }
      onPressAcknowledgements={() => navigation.push('Acknowledgements')}
      onPressBuyMeACoffe={() =>
        Linking.openURL('https://jtvargas.github.io/TheLockWeb/')
      }
    />
  );
};

export default AboutScreen;
