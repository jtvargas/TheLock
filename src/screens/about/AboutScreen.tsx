import React, { useState, useEffect } from 'react';
import {
  Image,
  Animated,
  Easing,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist';

import { AboutScreenProps } from '@type';
import About from '@containers/about';
import { ModalPopup, Text } from '@src/components';
import { FlatList } from 'react-native-gesture-handler';

const AboutScreen: React.FC<AboutScreenProps> = props => {
  const { navigation } = props;
  const [isAcknowledgementsVisible, setVisible] = useState(false);

  return (
    <>
      <ModalPopup
        size="medium"
        position="center"
        isVisible={isAcknowledgementsVisible}
        onClose={() => setVisible(false)}
      >
        <View style={{ flex: 12 }}>
          <FlatList
            contentContainerStyle={{ flex: 12, position: 'absolute' }}
            renderItem={({ item }) => <Text>{item}</Text>}
            data={[
              'hello there',
              'hello there',
              'hello there',
              'hello there',
              'hello there',
              'hello there',
              'hello there',
              'hello there',
              'hello there',
              'hello there',
              'hello there',
              'hello there',
              'hello there',
              'hello there',
              'hello there',
              'hello there',
              'hello there',
              'hello there22',
              'hello there22',
              'hello there22',
              'hello there22',
              'hello there33',
            ]}
          />
        </View>

        <View
          style={{
            justifyContent: 'flex-end',
            flex: 1,
          }}
        >
          <Image
            source={require('../../../assets/image-play.gif')}
            style={{ width: '100%', height: 100 }}
          />
        </View>
      </ModalPopup>

      <About
        onPressAcknowledgements={() => navigation.push('Acknowledgements')}
        onPressBuyMeACoffe={() => null}
      />
    </>
  );
};

export default AboutScreen;
