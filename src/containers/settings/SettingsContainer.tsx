import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useStyles } from '@core/Theme';
import { Button, Divider, Text, ToggleButton, Typewritter } from '@components';
import {
  LockerPickerConfigKey,
  SceneConfigKey,
  DeviceConfigKey,
} from '@src/types/gameState';
import styleSheet from './SettingsContainer.styles';

type SettingsContainerProps = {
  onPressCleanHistory: () => void;
  onToggleSetting: (
    value: LockerPickerConfigKey | SceneConfigKey | DeviceConfigKey,
  ) => void;
  isShakeAnimationEnable: boolean;
  isShakeDragEnable: boolean;
  isSoundEnable: boolean;
  isNumberWheelIndicatorEnable: boolean;
  isTipsMessagesEnable: boolean;
  isHelpKeyEnable: boolean;
  isDisabledShakeAnimationOption: boolean;
  isNotificationEnable: boolean;
};
const SettingsContainer: React.FC<SettingsContainerProps> = props => {
  const {
    onPressCleanHistory,
    onToggleSetting,
    isHelpKeyEnable,
    isNumberWheelIndicatorEnable,
    isShakeAnimationEnable,
    isShakeDragEnable,
    isSoundEnable,
    isTipsMessagesEnable,
    isDisabledShakeAnimationOption,
    isNotificationEnable,
  } = props;
  const { styles, theme } = useStyles(styleSheet);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text type="body" weight="medium">
          Gameplay
        </Text>
        <Divider />
        <ToggleButton
          isDisabled={isDisabledShakeAnimationOption}
          label="Shake Animation"
          onPress={() => onToggleSetting(LockerPickerConfigKey.SHAKE_ANIMATION)}
          isActive={isShakeAnimationEnable}
          subLabel="Shake the locker picker while dragging"
        />
        <ToggleButton
          label="Number Wheel"
          onPress={() =>
            onToggleSetting(LockerPickerConfigKey.NUMBER_INDICATOR)
          }
          isActive={isNumberWheelIndicatorEnable}
          subLabel="Display the number spinner"
        />
        <ToggleButton
          label="Tips"
          onPress={() => onToggleSetting(SceneConfigKey.TIP_MESSAGE)}
          isActive={isTipsMessagesEnable}
          subLabel="Display hint messages"
        />
        <ToggleButton
          label="Help Key"
          onPress={() => onToggleSetting(SceneConfigKey.HELP_KEY)}
          isActive={isHelpKeyEnable}
          subLabel="Display emoji for assistance"
        />
        <ToggleButton
          label="Sound"
          onPress={() => onToggleSetting(SceneConfigKey.SOUND_EFFECT)}
          isActive={isSoundEnable}
          subLabel="Enable sound effects"
        />
        <ToggleButton
          label="Notification"
          onPress={() => onToggleSetting(DeviceConfigKey.NOTIFICATION)}
          isActive={isNotificationEnable}
          subLabel="Remind you to unlock the lock casually"
        />
      </View>

      <View style={{ justifyContent: 'flex-end' }}>
        <Text type="body" weight="medium">
          Danger Zone
        </Text>
        <Divider />
        <Button
          label="Clear Play History"
          onPress={onPressCleanHistory}
          textColor={theme.colors.error}
        />
      </View>
      <Divider />
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

export default SettingsContainer;
