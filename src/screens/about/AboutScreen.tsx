import React from 'react';
import { Linking } from 'react-native';

import { AboutScreenProps } from '@type';
import About from '@containers/about';

// TODO: Change this when we get a itunes ID
const itunesItemId = 982107779;

const AboutScreen: React.FC<AboutScreenProps> = props => {
  const { navigation } = props;

  return (
    <About
      onRateAppPress={() =>
        Linking.openURL(
          `https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`,
        )
      }
      onPressAcknowledgements={() => navigation.push('Acknowledgements')}
      onPressBuyMeACoffe={() =>
        Linking.openURL('https://www.buymeacoffee.com/dev0x07')
      }
    />
  );
};

export default AboutScreen;
