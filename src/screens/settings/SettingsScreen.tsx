import React from 'react';
import { Alert } from 'react-native';
import { SettingsScreenProps } from '@type';
import SettingsContainer from '@containers/settings';
import {
  useGameState,
  useAppSelector,
  useAppDispatch,
  GAME_STATE_SELECTORS,
  GAME_STATE_ACTIONS,
} from '@src/redux';
import {
  DeviceConfigKey,
  LockerPickerConfigKey,
  PlayDifficulty,
  SceneConfigKey,
} from '@src/types/gameState';

import { NotificationsUtils } from '@utils';

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const { resetHistory, toggleLockerConfig, toggleSceneConfig } =
    useGameState();
  const dispatch = useAppDispatch();

  const sceneConfig = useAppSelector(GAME_STATE_SELECTORS.getSceneConfigCustom);
  const playDifficulty = useAppSelector(GAME_STATE_SELECTORS.getDifficulty);
  const isNotificationEnabled = useAppSelector(
    GAME_STATE_SELECTORS.getIsNotificationEnabled,
  );
  const localNotificationId = useAppSelector(
    GAME_STATE_SELECTORS.getLocalNotificationId,
  );
  const lockerConfig = useAppSelector(
    GAME_STATE_SELECTORS.getLockerPickerConfig,
  );

  const handleOnCleanHistory = () => {
    Alert.alert(
      'Clear Play History',
      'Are you sure you want to clear your play history? This action will permanently delete all the records saved on this device and cannot be undone.',
      [
        {
          text: 'Reset History',
          style: 'destructive',
          onPress: () => resetHistory(),
        },
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
      ],
    );
  };

  const handleNotificationToggle = async () => {
    try {
      if (isNotificationEnabled && localNotificationId) {
        await NotificationsUtils.cancelScheduledNotification(
          localNotificationId,
        );
        return dispatch(GAME_STATE_ACTIONS.toggleNotificationOFF());
      }
      const notificationId = await NotificationsUtils.schedulePushNotification({
        title: 'Can you solve The Lock?',
        body: 'Spin, Sense, and Solve!',
      });

      return dispatch(
        GAME_STATE_ACTIONS.toggleNotificationON({ notificationId }),
      );
    } catch (e) {
      return e;
    }
  };

  const handleOnToggleSetting = (
    settingKey: LockerPickerConfigKey | SceneConfigKey | DeviceConfigKey,
  ) => {
    if (Object.keys(LockerPickerConfigKey).includes(settingKey)) {
      return toggleLockerConfig(settingKey as LockerPickerConfigKey);
    }
    if (Object.keys(SceneConfigKey).includes(settingKey)) {
      return toggleSceneConfig(settingKey as SceneConfigKey);
    }

    switch (settingKey) {
      case DeviceConfigKey.NOTIFICATION:
        return handleNotificationToggle();
      default:
        return null;
    }
  };

  return (
    <SettingsContainer
      isNotificationEnable={isNotificationEnabled}
      isDisabledShakeAnimationOption={playDifficulty === PlayDifficulty.EXPERT}
      onPressCleanHistory={handleOnCleanHistory}
      onToggleSetting={handleOnToggleSetting}
      isShakeAnimationEnable={
        lockerConfig[LockerPickerConfigKey.SHAKE_ANIMATION]
      }
      isShakeDragEnable={lockerConfig[LockerPickerConfigKey.SHAKE_DRAG]}
      isNumberWheelIndicatorEnable={
        lockerConfig[LockerPickerConfigKey.NUMBER_INDICATOR]
      }
      isTipsMessagesEnable={sceneConfig[SceneConfigKey.TIP_MESSAGE]}
      isHelpKeyEnable={sceneConfig[SceneConfigKey.HELP_KEY]}
      isSoundEnable={sceneConfig[SceneConfigKey.SOUND_EFFECT]}
    />
  );
};

export default SettingsScreen;
