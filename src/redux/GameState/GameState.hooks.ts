import { useAppDispatch, GAME_STATE_ACTIONS } from '@redux';
import { GameMode, PlayingState } from '@type';

interface GameStateHook {
  start: () => void;
  stop: () => void;
  attempWin: () => void;
  finish: (answer: string) => void;
  setGameMode: (gameMode: GameMode) => void;
  changePlayingState: (playingState: PlayingState) => void;
}

export const useGameState = (): GameStateHook => {
  const dispatch = useAppDispatch();

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

  return {
    start,
    stop,
    finish,
    setGameMode,
    attempWin,
    changePlayingState,
  };
};
