/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Constants from 'expo-constants';

import { useStyles } from 'react-native-unistyles';
import { Text, Typewritter, Divider } from '@components';

import styleSheet from './AboutContainer.styles';

type AboutContainerProps = {
  onPressAcknowledgements: () => void;
  onRateAppPress: () => void;
  onLongPressSecretText: () => void;
  isVisibleRatingButton: boolean;
};
const AboutContainer: React.FC<AboutContainerProps> = props => {
  const {
    isVisibleRatingButton,
    onRateAppPress,
    onPressAcknowledgements,
    onLongPressSecretText,
  } = props;
  const { styles, theme } = useStyles(styleSheet);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Typewritter
          textArray={['The Lock.']}
          speed={200}
          delay={500}
          textStyle={styles.title}
        />
        <Text style={styles.title} type="callout" weight="medium">
          A game to guess numbers with a spinner. Enjoy haptic feedback and
          visuals as hints and collect different themes. Share your average
          guess time across difficulties.
        </Text>

        <View style={styles.feature}>
          <MaterialCommunityIcons
            name="palette"
            size={24}
            color={theme.colors.onMainBackground}
          />
          <Text style={styles.featureText} type="body" weight="medium">
            <Text weight="bold" type="body" style={styles.featureText}>
              Tailored Experience:{' '}
            </Text>
            Alter colors and hints for your liking.
          </Text>
        </View>

        <View style={styles.feature}>
          <MaterialCommunityIcons
            name="vibrate"
            size={24}
            color={theme.colors.onMainBackground}
          />
          <Text style={styles.featureText}>
            <Text weight="bold" type="body" style={styles.featureText}>
              Haptic Feedback:{' '}
            </Text>
            Feel every hint.
          </Text>
        </View>

        <View style={styles.feature}>
          <MaterialCommunityIcons
            name="history"
            size={24}
            color={theme.colors.onMainBackground}
          />
          <Text style={styles.featureText}>
            <Text weight="bold" type="body" style={styles.featureText}>
              Progress Tracking:{' '}
            </Text>
            Revisit your previous scores.
          </Text>
        </View>
        <View style={styles.feature}>
          <MaterialCommunityIcons
            name="format-color-fill"
            size={24}
            color={theme.colors.onMainBackground}
          />
          <Text style={styles.featureText}>
            <Text
              weight="bold"
              type="body"
              style={styles.featureText}
              onLongPress={onLongPressSecretText}
            >
              Design:{' '}
            </Text>
            Minimalistic and intuitive.
          </Text>
        </View>
        <View style={styles.feature}>
          <MaterialCommunityIcons
            name="close-box-multiple-outline"
            size={24}
            color={theme.colors.onMainBackground}
          />
          <Text style={styles.featureText}>
            <Text weight="bold" type="body" style={styles.featureText}>
              Ad-free Experience:{' '}
            </Text>
            Play uninterrupted without any ads.
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={onPressAcknowledgements}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 2,
              borderColor: theme.colors.onMainBackground,
            }}
          >
            <Text
              weight="bold"
              type="callout"
              style={{ marginLeft: 4, color: theme.colors.onMainBackground }}
            >
              Acknowledgements
            </Text>
          </TouchableOpacity>
        </View>
        <Divider spacing="md" />
        {isVisibleRatingButton ? (
          <TouchableOpacity
            onPress={onRateAppPress}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 2,
              borderColor: 'yellow',
            }}
          >
            <FontAwesome5 name="star-half-alt" size={21} color="yellow" />
            <Text
              weight="bold"
              type="caption"
              style={{ marginLeft: 4, color: 'yellow' }}
            >
              Do Not Rate This App, Just Play
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={styles.versionText} type="caption" weight="medium">
        {Constants.manifest2?.runtimeVersion}
      </Text>
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
        }}
      >
        <MaterialCommunityIcons
          name="gesture-swipe-down"
          size={28}
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
