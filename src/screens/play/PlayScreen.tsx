import React, { useEffect, useState, useCallback, useMemo } from 'react';
import * as Haptics from 'expo-haptics';

import { PlayScreenProps } from '@type';
import PlayContainer from '@containers/play';
import { useAppSelector } from '@redux';
import { GAME_STATE_SELECTORS, useGameState } from '@redux/GameState';
import { LockerPickerConfigKey, PlayingState } from '@src/types/gameState';

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
  const { route } = props;
  const {
    params: { gameMode },
  } = route;
  const { start, stop, finish, setGameMode, attempWin, changePlayingState } =
    useGameState();
  const [selectedTextValue, setSelectedTextValue] = useState('');
  const [helpInsight, setHelpInsight] = useState(false);
  const [circleValue, setCircleValue] = useState<number | null>(null);
  const playScene = useAppSelector(GAME_STATE_SELECTORS.getPlayScene);
  const winAttemps = useAppSelector(GAME_STATE_SELECTORS.getWinAttemps);
  const playingState = useAppSelector(GAME_STATE_SELECTORS.getPlayingState);
  const lockerPickerColors = useAppSelector(
    GAME_STATE_SELECTORS.getSceneLockerPickerColors,
  );
  const lockerPickerConfig = useAppSelector(
    GAME_STATE_SELECTORS.getLockerPickerConfig,
  );
  const isPlaying = playingState === PlayingState.PLAYING;
  const isAttemptedToWin = playingState === PlayingState.LOSE;
  const isIdle = playingState === PlayingState.IDLE;
  // const isPlayWin = playingState === PlayingState.WIN;

  const numb = useMemo(() => {
    return generateRandomNumberString(3);
  }, []);

  // gameOver(selectedTextValue, numb, handleAttempWin, handleWin);

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
    // console.log(JSON.stringify({ RESULTS: playScene }, null, 2));
  }, [playScene]);

  useEffect(() => {
    const handleAttempWin = () => {
      attempWin();
    };

    const handleWin = () => {
      finish(selectedTextValue);
      alert('CORRECT');
      // navigation.goBack(); TODO: create modal to indicate win results and share stuff
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
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        );
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
      helpVibrate={
        helpInsight && lockerPickerConfig[LockerPickerConfigKey.HAPTIC_FEEDBACK]
      }
      onCircleValueChange={handleCircleValueChange}
      onSelectValue={handleSelectValue}
      circleValue={circleValue}
      selectedTextValue={selectedTextValue}
      expectedTextValue={numb}
      circleInputColors={{
        ...lockerPickerColors,
      }}
    />
  );
};

export default PlayScreen;
