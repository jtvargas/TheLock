/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as FileSystem from 'expo-file-system';

import { useStyles } from '@core/Theme';
import { Text, Typewritter } from '@components';

import Markdown from 'react-native-markdown-display';
import styleSheet from './Acknowledgements.styles';

type AboutContainerProps = {
  onPressAcknowledgements: () => void;
  onPressBuyMeACoffe: () => void;
};

const AboutContainer: React.FC<AboutContainerProps> = props => {
  const { styles } = useStyles(styleSheet);

  const [credits, setCredits] = useState('');

  // useEffect(() => {
  //   const readCredits = async () => {
  //     const creditsDir = await FileSystem.readAsStringAsync(
  //       'file://../../../credits.txt',
  //     );

  //     console.log({ creditsDir });
  //     // setCredits(creditsDir);
  //   };

  //   readCredits();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ height: '100%' }}
      >
        {/* <Text>{creditsTest}</Text> */}
        <Markdown style={{ body: { color: 'white' } }}>
          {`@expo/vector-icons@13.0.0
            @react-native-async-storage/async-storage@1.18.2
            @react-navigation/native@6.1.8
            @react-navigation/native-stack@6.9.14
            @reduxjs/toolkit@1.9.7
            @sucho/react-native-typewriter@1.0.0
            dayjs@1.11.10
            expo@49.0.13
            expo-blur@12.4.1
            expo-file-system@15.4.4
            expo-font@11.4.0
            expo-haptics@12.6.0
            expo-status-bar@1.6.0
            expo-updates@0.18.16
            lodash@4.17.21
            react@18.2.0
            react-native@0.72.5
            react-native-dropdown-picker@5.4.6
            react-native-gesture-handler@2.12.0
            react-native-markdown-display@7.0.0-alpha.2
            react-native-modal@13.0.1
            react-native-safe-area-context@4.6.3
            react-native-screens@3.22.0
            react-native-size-matters@0.4.2
            react-native-svg@13.9.0
            react-native-unistyles@1.0.0-beta.5
            react-redux@8.1.3
            redux@4.2.1
            redux-persist@6.0.0
          `}
        </Markdown>
      </ScrollView>
      <Image
        source={require('../../../assets/image-play.gif')}
        style={{ width: '100%', height: 100 }}
      />
    </SafeAreaView>
  );
};

export default AboutContainer;
