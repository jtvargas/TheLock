import * as Notifications from 'expo-notifications';

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: { allowSound: true, allowBadge: true, allowDisplayInCarPlay: true },
    });
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return null;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;

  return token;
}

async function schedulePushNotification({ title, body }) {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'notification-sound.wav', // the values are 'default' (sound) or null (silent)
    },
    // For testing purpose
    // trigger: {
    //   seconds: 60, // Repeat every 60 seconds (1 minute)
    //   repeats: true,
    // },
    trigger: {
      weekday: 5, // Friday
      hour: 12,
      minute: 45,
      repeats: true,
    },
  });
  return id;
}
async function cancelScheduledNotification(notifId: string) {
  await Notifications.cancelScheduledNotificationAsync(notifId);
}

export default {
  registerForPushNotificationsAsync,
  schedulePushNotification,
  cancelScheduledNotification,
};
