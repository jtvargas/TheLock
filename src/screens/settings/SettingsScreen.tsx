import React from 'react';

import { SettingsScreenProps } from '@type';
import SettingsContainer from '@containers/settings';
import { useGameState } from '@src/redux';

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const { resetHistory } = useGameState();

  const handleOnCleanHistory = () => {
    resetHistory();
  };
  return <SettingsContainer onPressCleanHistory={handleOnCleanHistory} />;
};

export default SettingsScreen;
