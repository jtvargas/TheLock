import { LockerPickerTheme, GameMode, PlayDifficulty } from '@src/types';

const REQUIRED_PLAYS_TO_UNLOCK = {
  [LockerPickerTheme.DEFAULT]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 0,
      [PlayDifficulty.ADVANCED]: 0,
      [PlayDifficulty.EXPERT]: 0,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.SUNSET]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 2,
      [PlayDifficulty.ADVANCED]: 1,
      [PlayDifficulty.EXPERT]: 0,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.OCEAN]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 2,
      [PlayDifficulty.ADVANCED]: 5,
      [PlayDifficulty.EXPERT]: 0,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.FOREST]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 2,
      [PlayDifficulty.ADVANCED]: 10,
      [PlayDifficulty.EXPERT]: 0,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.WINE]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 2,
      [PlayDifficulty.ADVANCED]: 10,
      [PlayDifficulty.EXPERT]: 1,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.PLATINIUM]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 2,
      [PlayDifficulty.ADVANCED]: 15,
      [PlayDifficulty.EXPERT]: 25,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.GOLD]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 8,
      [PlayDifficulty.ADVANCED]: 15,
      [PlayDifficulty.EXPERT]: 3,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.SILVER]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 8,
      [PlayDifficulty.ADVANCED]: 15,
      [PlayDifficulty.EXPERT]: 20,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.BRAVERY]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 25,
      [PlayDifficulty.ADVANCED]: 25,
      [PlayDifficulty.EXPERT]: 30,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.LOYAL]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 25,
      [PlayDifficulty.ADVANCED]: 25,
      [PlayDifficulty.EXPERT]: 30,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.WISDOM]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 25,
      [PlayDifficulty.ADVANCED]: 26,
      [PlayDifficulty.EXPERT]: 30,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.AMBI]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 25,
      [PlayDifficulty.ADVANCED]: 25,
      [PlayDifficulty.EXPERT]: 35,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.NEBULA]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 25,
      [PlayDifficulty.ADVANCED]: 25,
      [PlayDifficulty.EXPERT]: 35,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.AURORA]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 25,
      [PlayDifficulty.ADVANCED]: 25,
      [PlayDifficulty.EXPERT]: 35,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.ZENITH]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 25,
      [PlayDifficulty.ADVANCED]: 25,
      [PlayDifficulty.EXPERT]: 35,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.ECLIPSE]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 25,
      [PlayDifficulty.ADVANCED]: 25,
      [PlayDifficulty.EXPERT]: 35,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.SAPPHIRE]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 25,
      [PlayDifficulty.ADVANCED]: 25,
      [PlayDifficulty.EXPERT]: 35,
    },
    [GameMode.SANDBOX]: 0,
  },
  [LockerPickerTheme.VOLCANO]: {
    [GameMode.COMPETITIVE]: {
      [PlayDifficulty.NOVICE]: 25,
      [PlayDifficulty.ADVANCED]: 25,
      [PlayDifficulty.EXPERT]: 35,
    },
    [GameMode.SANDBOX]: 0,
  },
};

const LOCKER_PICKER_THEME = {
  [LockerPickerTheme.DEFAULT]: {
    circleColor: '#636E72',
    selectCTAColor: '#636E72',
    selectCTAStrokeColor: '#979D9F',
    dragCTAColor: '#979D9F',
    dragCTAStrokeColor: '#979D9F',
    circleNumberIndicatorColor: '#636E72',
    circleNumberIndicatorStrokeColor: '#979D9F',
  },
  [LockerPickerTheme.SUNSET]: {
    circleColor: '#FF6B6B',
    selectCTAColor: '#FF6B6B',
    selectCTAStrokeColor: '#FFD166',
    dragCTAColor: '#FFD166',
    dragCTAStrokeColor: '#FFD166',
    circleNumberIndicatorColor: '#FF6B6B',
    circleNumberIndicatorStrokeColor: '#FFD166',
  },
  [LockerPickerTheme.OCEAN]: {
    circleColor: '#006D77',
    selectCTAColor: '#006D77',
    selectCTAStrokeColor: '#83C5BE',
    dragCTAColor: '#83C5BE',
    dragCTAStrokeColor: '#83C5BE',
    circleNumberIndicatorColor: '#006D77',
    circleNumberIndicatorStrokeColor: '#83C5BE',
  },
  [LockerPickerTheme.FOREST]: {
    circleColor: '#2A9D8F',
    selectCTAColor: '#2A9D8F',
    selectCTAStrokeColor: '#264653',
    dragCTAColor: '#264653',
    dragCTAStrokeColor: '#264653',
    circleNumberIndicatorColor: '#2A9D8F',
    circleNumberIndicatorStrokeColor: '#264653',
  },
  [LockerPickerTheme.WINE]: {
    circleColor: '#E63946',
    selectCTAColor: '#2A9D8F',
    selectCTAStrokeColor: '#A8DADC',
    dragCTAColor: '#457B9D',
    dragCTAStrokeColor: '#1D3557',
    circleNumberIndicatorColor: '#1D3557',
    circleNumberIndicatorStrokeColor: '#2A9D8F',
  },
  [LockerPickerTheme.PLATINIUM]: {
    circleColor: '#E5E5E5',
    selectCTAColor: '#B0B0B0',
    selectCTAStrokeColor: '#757575',
    dragCTAColor: '#B0B0B0',
    dragCTAStrokeColor: '#4D4D4D',
    circleNumberIndicatorColor: '#4D4D4D',
    circleNumberIndicatorStrokeColor: '#757575',
  },
  [LockerPickerTheme.GOLD]: {
    circleColor: '#FFD700',
    selectCTAColor: '#FFCC00',
    selectCTAStrokeColor: '#B8860B',
    dragCTAColor: '#B8860B',
    dragCTAStrokeColor: '#8B6914',
    circleNumberIndicatorColor: '#FFD700',
    circleNumberIndicatorStrokeColor: '#8B6914',
  },
  [LockerPickerTheme.SILVER]: {
    circleColor: '#C0C0C0',
    selectCTAColor: '#A9A9A9',
    selectCTAStrokeColor: '#808080',
    dragCTAColor: '#808080',
    dragCTAStrokeColor: '#696969',
    circleNumberIndicatorColor: '#4D4D4D',
    circleNumberIndicatorStrokeColor: '#808080',
  },
  [LockerPickerTheme.BRAVERY]: {
    circleColor: '#740001',
    selectCTAColor: '#D3A625',
    selectCTAStrokeColor: '#9D3E15',
    dragCTAColor: '#740001',
    dragCTAStrokeColor: '#D3A625',
    circleNumberIndicatorColor: '#D3A625',
    circleNumberIndicatorStrokeColor: '#9D3E15',
  },
  [LockerPickerTheme.LOYAL]: {
    circleColor: '#FDB827',
    selectCTAColor: '#726255',
    selectCTAStrokeColor: '#FDB827',
    dragCTAColor: '#726255',
    dragCTAStrokeColor: '#FDB827',
    circleNumberIndicatorColor: '#FDB827',
    circleNumberIndicatorStrokeColor: '#726255',
  },
  [LockerPickerTheme.WISDOM]: {
    circleColor: '#0E1A40',
    selectCTAColor: '#946B2D',
    selectCTAStrokeColor: '#0E1A40',
    dragCTAColor: '#946B2D',
    dragCTAStrokeColor: '#0E1A40',
    circleNumberIndicatorColor: '#0E1A40',
    circleNumberIndicatorStrokeColor: '#946B2D',
  },
  [LockerPickerTheme.AMBI]: {
    circleColor: '#1A472A',
    selectCTAColor: '#AAAAAA',
    selectCTAStrokeColor: '#1A472A',
    dragCTAColor: '#AAAAAA',
    dragCTAStrokeColor: '#1A472A',
    circleNumberIndicatorColor: '#1A472A',
    circleNumberIndicatorStrokeColor: '#AAAAAA',
  },
  [LockerPickerTheme.AURORA]: {
    circleColor: '#88C0D0',
    selectCTAColor: '#81A1C1',
    selectCTAStrokeColor: '#5E81AC',
    dragCTAColor: '#5E81AC',
    dragCTAStrokeColor: '#4C566A',
    circleNumberIndicatorColor: '#88C0D0',
    circleNumberIndicatorStrokeColor: '#5E81AC',
  },
  [LockerPickerTheme.NEBULA]: {
    circleColor: '#B48EAD',
    selectCTAColor: '#A3BE8C',
    selectCTAStrokeColor: '#BF616A',
    dragCTAColor: '#D08770',
    dragCTAStrokeColor: '#EBCB8B',
    circleNumberIndicatorColor: '#B48EAD',
    circleNumberIndicatorStrokeColor: '#BF616A',
  },
  [LockerPickerTheme.ZENITH]: {
    circleColor: '#009688',
    selectCTAColor: '#4DB6AC',
    selectCTAStrokeColor: '#80CBC4',
    dragCTAColor: '#80CBC4',
    dragCTAStrokeColor: '#B2DFDB',
    circleNumberIndicatorColor: '#009688',
    circleNumberIndicatorStrokeColor: '#80CBC4',
  },
  [LockerPickerTheme.ECLIPSE]: {
    circleColor: '#616161',
    selectCTAColor: '#757575',
    selectCTAStrokeColor: '#9E9E9E',
    dragCTAColor: '#BDBDBD',
    dragCTAStrokeColor: '#E0E0E0',
    circleNumberIndicatorColor: '#616161',
    circleNumberIndicatorStrokeColor: '#9E9E9E',
  },
  [LockerPickerTheme.SAPPHIRE]: {
    circleColor: '#0D47A1',
    selectCTAColor: '#1976D2',
    selectCTAStrokeColor: '#2196F3',
    dragCTAColor: '#64B5F6',
    dragCTAStrokeColor: '#90CAF9',
    circleNumberIndicatorColor: '#0D47A1',
    circleNumberIndicatorStrokeColor: '#2196F3',
  },
  [LockerPickerTheme.VOLCANO]: {
    circleColor: '#DD2C00',
    selectCTAColor: '#FF3D00',
    selectCTAStrokeColor: '#FF6E40',
    dragCTAColor: '#FF9E80',
    dragCTAStrokeColor: '#FFCCBC',
    circleNumberIndicatorColor: '#DD2C00',
    circleNumberIndicatorStrokeColor: '#FF6E40',
  },
};

export { LOCKER_PICKER_THEME, REQUIRED_PLAYS_TO_UNLOCK };
