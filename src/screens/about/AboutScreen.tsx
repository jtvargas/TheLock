import React from 'react';
import { Linking } from 'react-native';

import { AboutScreenProps } from '@type';
import About from '@containers/about';

const AboutScreen: React.FC<AboutScreenProps> = props => {
  const { navigation } = props;

  return (
    <About
      onPressAcknowledgements={() => navigation.push('Acknowledgements')}
      onPressBuyMeACoffe={() =>
        Linking.openURL('https://www.buymeacoffee.com/dev0x07')
      }
    />
  );
};

export default AboutScreen;
