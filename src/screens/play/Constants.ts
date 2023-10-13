import { PlayDifficulty } from '@src/types';

const BOXES_BASED_ON_DIFFICULTY = {
  [PlayDifficulty.NOVICE]: 3,
  [PlayDifficulty.ADVANCED]: 4,
  [PlayDifficulty.EXPERT]: 6,
};

export { BOXES_BASED_ON_DIFFICULTY };
