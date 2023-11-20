import { useEffect } from 'react';
import isNil from 'lodash/isNil';

import { NotificationsUtils } from '@utils';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { GAME_STATE_SELECTORS, GAME_STATE_ACTIONS } from '@redux';

const Notification = () => {
  // Set local scheduled notification
  const dispatch = useAppDispatch();
  const isNotificationEnable = useAppSelector(
    GAME_STATE_SELECTORS.getIsNotificationEnabled,
  );
  const localNotificationId = useAppSelector(
    GAME_STATE_SELECTORS.getLocalNotificationId,
  );

  useEffect(() => {
    const handleSetNotification = async () => {
      try {
        const notificationId =
          await NotificationsUtils.schedulePushNotification({
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

    NotificationsUtils.registerForPushNotificationsAsync().then(() => {
      if (isNil(localNotificationId) && isNotificationEnable) {
        handleSetNotification();
      }
    });

    // notificationListener.current =
    //   Notifications.addNotificationReceivedListener(notification => {});

    // responseListener.current =
    //   Notifications.addNotificationResponseReceivedListener(response => {
    //     console.log(response);
    //   });

    return () => {
      // Notifications.removeNotificationSubscription(
      //   notificationListener.current,
      // );
      // Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return null;
};

export default Notification;
