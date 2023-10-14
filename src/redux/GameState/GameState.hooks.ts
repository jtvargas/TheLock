import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { GameMode, PlayDifficulty, PlayingState } from '@type';
import * as GAME_STATE_SELECTORS from './GameState.selectors';
import { GAME_STATE_ACTIONS } from './GameState.slice';

interface GameStateHook {
  start: () => void;
  stop: () => void;
  attempWin: () => void;
  finish: (answer: string) => void;
  setGameMode: (gameMode: GameMode) => void;
  changePlayingState: (playingState: PlayingState) => void;
  changeDifficulty: (difficulty: PlayDifficulty) => void;
  playDifficulty: PlayDifficulty;
}

export const useGameState = (): GameStateHook => {
  const dispatch = useAppDispatch();
  const playDifficulty = useAppSelector(GAME_STATE_SELECTORS.getDifficulty);

  const start = () => {
    dispatch(GAME_STATE_ACTIONS.startPlaying());
  };
  const stop = () => {
    dispatch(GAME_STATE_ACTIONS.stopPlaying());
  };

  const finish = (answer: string) => {
    dispatch(GAME_STATE_ACTIONS.finishPlaying({ metaScene: { answer } }));
  };

  const setGameMode = (gameMode: GameMode) => {
    dispatch(GAME_STATE_ACTIONS.changeGameMode({ gameMode }));
  };
  const attempWin = () => {
    dispatch(GAME_STATE_ACTIONS.attempWin());
  };
  const changePlayingState = (playingState: PlayingState) => {
    dispatch(GAME_STATE_ACTIONS.changePlayingState({ playingState }));
  };
  const changeDifficulty = (difficulty: PlayDifficulty) => {
    dispatch(GAME_STATE_ACTIONS.changeSceneDifficulty({ difficulty }));
  };

  return {
    start,
    stop,
    finish,
    setGameMode,
    attempWin,
    changePlayingState,
    changeDifficulty,
    playDifficulty,
  };
};
