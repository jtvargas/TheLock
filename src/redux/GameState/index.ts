import gameStateReducer, { GAME_STATE_ACTIONS } from './GameState.slice';
import * as GAME_STATE_SELECTORS from './GameState.selectors';
import { useGameState } from './GameState.hooks';

export {
  gameStateReducer,
  useGameState,
  GAME_STATE_ACTIONS,
  GAME_STATE_SELECTORS,
};
