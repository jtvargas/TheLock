import React from 'react';

import { LockerPickerTheme, PersonalizeScreenProps } from '@type';
import PersonalizeContainer from '@containers/personalize';
import { useGameState, useAppSelector, GAME_STATE_SELECTORS } from '@src/redux';

const PersonalizeScreen: React.FC<PersonalizeScreenProps> = () => {
  const { changeLockerPickerTheme } = useGameState();
  const selectedTheme = useAppSelector(
    GAME_STATE_SELECTORS.getLockerPickerThemeName,
  );
  const availableThemes = useAppSelector(
    GAME_STATE_SELECTORS.getAvailableThemes,
  );

  const handleOnSelectTheme = (themeKey: LockerPickerTheme) => {
    changeLockerPickerTheme(themeKey);
  };
  return (
    <PersonalizeContainer
      onSelectTheme={handleOnSelectTheme}
      themeActive={selectedTheme}
      availableThemes={availableThemes}
    />
  );
};

export default PersonalizeScreen;
