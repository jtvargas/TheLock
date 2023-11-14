import React from 'react';
import { Linking, Alert } from 'react-native';

import { AboutScreenProps } from '@type';
import About from '@containers/about';

// TODO: Change this when we get a itunes ID
const itunesItemId = 6471700369;

const AboutScreen: React.FC<AboutScreenProps> = props => {
  const { navigation } = props;

  const handleBuyMeACoffeePress = () => {
    Alert.alert(
      'Support Our Work',
      `You're about to leave the app and visit our 'Buy Me a Coffee' page, where you can support our efforts. Parental attention is advised.`,
      [
        {
          text: 'Support Now',
          style: 'default',
          onPress: () =>
            Linking.openURL('https://www.buymeacoffee.com/dev0x07'),
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
      onRateAppPress={() =>
        Linking.openURL(
          `https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`,
        )
      }
      onPressAcknowledgements={() => navigation.push('Acknowledgements')}
      onPressBuyMeACoffe={handleBuyMeACoffeePress}
    />
  );
};

export default AboutScreen;
