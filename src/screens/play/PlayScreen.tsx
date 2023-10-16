import React, { useEffect, useState, useCallback, useMemo } from 'react';
import * as Haptics from 'expo-haptics';

import { PlayScreenProps } from '@type';
import PlayContainer from '@containers/play';
import { useAppSelector } from '@redux';
import { GAME_STATE_SELECTORS, useGameState } from '@redux/GameState';
import {
  LockerPickerConfigKey,
  PlayDifficulty,
  PlayingState,
} from '@src/types/gameState';
import { BOXES_BASED_ON_DIFFICULTY } from './Constants';

type GameState = { stillPlaying: boolean; win: boolean | undefined };

const gameOver = (
  currentValue: string,
  expectedValue: string,
  onWinAttemp: () => void,
  onWin: () => void,
): GameState => {
  if (currentValue.length === expectedValue.length) {
    if (currentValue === expectedValue) {
      onWin();
      return { stillPlaying: false, win: true };
    }

    onWinAttemp();
    return { stillPlaying: false, win: false };
  }
  return { stillPlaying: true, win: undefined };
};

const vibrateLavel = {
  [PlayDifficulty.NOVICE]: Haptics.ImpactFeedbackStyle.Heavy,
  [PlayDifficulty.ADVANCED]: Haptics.ImpactFeedbackStyle.Medium,
  [PlayDifficulty.EXPERT]: Haptics.ImpactFeedbackStyle.Light,
};

function generateRandomNumberString(N: number): string {
  const generateRandomDigit = () => Math.floor(Math.random() * 10);

  let str = '';

  while (str.length < N) {
    const digit = generateRandomDigit();
    if (
      str.length === 0 ||
      Math.abs(Number(str[str.length - 1]) - digit) !== 1
    ) {
      str += digit;
    }
  }

  return str;
}

const PlayScreen: React.FC<PlayScreenProps> = props => {
  const { route, navigation } = props;
  const {
    params: { gameMode },
  } = route;
  const { start, stop, finish, setGameMode, attempWin, changePlayingState } =
    useGameState();
  const [selectedTextValue, setSelectedTextValue] = useState('');
  const [helpInsight, setHelpInsight] = useState(false);
  const [circleValue, setCircleValue] = useState<number | null>(null);
  const playDifficulty = useAppSelector(GAME_STATE_SELECTORS.getDifficulty);
  const timeLapsed = useAppSelector(GAME_STATE_SELECTORS.getTimeLapsed);

  const winAttemps = useAppSelector(GAME_STATE_SELECTORS.getWinAttemps);
  const playingState = useAppSelector(GAME_STATE_SELECTORS.getPlayingState);
  const lockerPickerColors = useAppSelector(
    GAME_STATE_SELECTORS.getSceneLockerPickerColors,
  );
  const lockerPickerConfig = useAppSelector(
    GAME_STATE_SELECTORS.getLockerPickerConfig,
  );
  const isPlaying = playingState === PlayingState.PLAYING;
  const isPlayWin = playingState === PlayingState.WIN;
  const isAttemptedToWin = playingState === PlayingState.LOSE;
  const isIdle = playingState === PlayingState.IDLE;

  const generateNewNumberOnFail =
    isAttemptedToWin && playDifficulty === PlayDifficulty.EXPERT;

  const numb = useMemo(() => {
    return generateRandomNumberString(
      BOXES_BASED_ON_DIFFICULTY[playDifficulty],
    );
  }, [generateNewNumberOnFail]);

  useEffect(() => {
    setGameMode(gameMode);
    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    if (winAttemps > 0) {
      setSelectedTextValue('');
    }
  }, [winAttemps]);

  useEffect(() => {
    const handleAttempWin = () => {
      attempWin();
    };

    const handleWin = () => {
      finish(selectedTextValue);
    };
    if (isPlaying) {
      gameOver(selectedTextValue, numb, handleAttempWin, handleWin);
    }
  }, [selectedTextValue, numb, isPlaying]);

  // Handler for when circle value changes
  const handleCircleValueChange = useCallback(
    async (degreeValue: number) => {
      if (winAttemps === 0 && isIdle) {
        start();
      }

      if (!isPlaying) {
        changePlayingState(PlayingState.PLAYING);
      }

      if (`${degreeValue / 36}` === numb[selectedTextValue.length]) {
        setHelpInsight(true);
        await Haptics.impactAsync(vibrateLavel[playDifficulty]);
      }
      setHelpInsight(false);
      setCircleValue(degreeValue);
    },
    [selectedTextValue, isPlaying],
  );

  // Handler for when a value is selected
  const handleSelectValue = useCallback(
    (valueSelected: number) => {
      if (isPlaying) {
        setSelectedTextValue(prev => prev + valueSelected);
        setCircleValue(null);
      }
    },
    [isPlaying],
  );

  return (
    <PlayContainer
      withNumbersIndicator={
        lockerPickerConfig[LockerPickerConfigKey.NUMBER_INDICATOR]
      }
      shakeCircle={
        isAttemptedToWin ||
        lockerPickerConfig[LockerPickerConfigKey.SHAKE_ANIMATION]
      }
      shakeDrag={lockerPickerConfig[LockerPickerConfigKey.SHAKE_DRAG]}
      helpVibrate={
        helpInsight &&
        lockerPickerConfig[LockerPickerConfigKey.HAPTIC_FEEDBACK] &&
        [PlayDifficulty.NOVICE, PlayDifficulty.ADVANCED].includes(
          playDifficulty,
        )
      }
      onCircleValueChange={handleCircleValueChange}
      onSelectValue={handleSelectValue}
      circleValue={circleValue}
      selectedTextValue={selectedTextValue}
      expectedTextValue={numb}
      circleInputColors={{
        ...lockerPickerColors,
      }}
      isVisibleWinPopup={isPlayWin}
      timeSpent={timeLapsed || ''}
      onCloseWinPopup={() => navigation.goBack()}
    />
  );
};

export default PlayScreen;
