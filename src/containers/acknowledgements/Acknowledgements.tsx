/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Markdown from 'react-native-markdown-display';

import { useStyles } from '@core/Theme';
import { Typewritter } from '@components';

import theme from '@src/core/Theme/Theme';
import styleSheet from './Acknowledgements.styles';

type AboutContainerProps = {
  onPlaySoundPress: () => void;
  acknowledgements: string;
};

const AboutContainer: React.FC<AboutContainerProps> = props => {
  const { onPlaySoundPress, acknowledgements } = props;
  const { styles } = useStyles(styleSheet);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ height: '100%', backgroundColor: 'transparent' }}
      >
        <Markdown style={{ body: { color: 'white', fontSize: 10 } }}>
          {acknowledgements}
        </Markdown>
        <Image
          // eslint-disable-next-line global-require
          source={require('../../../assets/image-play.gif')}
          style={{
            width: '100%',
            height: 120,
            backgroundColor: 'transparent',
          }}
        />
      </ScrollView>

      <TouchableOpacity
        style={{ alignSelf: 'flex-end', paddingRight: theme.spacing.md }}
        onPress={onPlaySoundPress}
      >
        <FontAwesome name="volume-up" size={24} color="white" />
      </TouchableOpacity>
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
        }}
      >
        <MaterialCommunityIcons
          name="gesture-swipe-down"
          size={24}
          color={theme.colors.onMainBackground}
        />
        <Typewritter
          textArray={['Swipe down to close']}
          isOverlayText
          type="callout"
          weight="bold"
          speed={100}
          delay={500}
          withLeftCursor
          preText="Tip: "
        />
      </View>
    </SafeAreaView>
  );
};

export default AboutContainer;
