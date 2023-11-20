import VersionCheck from 'react-native-version-check-expo';

export default function useVersionCheck() {
  const getNeedUpdate = async () => {
    const needUpdate = await VersionCheck.needUpdate();

    return needUpdate;
  };

  return {
    getNeedUpdate,
  };
}
