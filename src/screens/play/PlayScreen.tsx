import React, { useEffect, useState, useCallback } from 'react';
import * as Haptics from 'expo-haptics';

import { PlayScreenProps } from '@type';
import PlayContainer from '@containers/play';

type GameState = { stillPlaying: boolean; win: boolean | undefined };

const gameOver = (
  currentValue: string,
  expectedValue: string,
  onFinishPlaying: () => void,
): GameState => {
  if (currentValue.length === expectedValue.length) {
    onFinishPlaying();
    if (currentValue === expectedValue) {
      return { stillPlaying: false, win: true };
    }

    return { stillPlaying: false, win: false };
  }
  return { stillPlaying: true, win: undefined };
};

const PlayScreen: React.FC<PlayScreenProps> = () => {
  const EXPECTED_TEXT = '123';
  const [selectedTextValue, setSelectedTextValue] = useState('');
  const [helpInsight, setHelpInsight] = useState(false);
  const [circleValue, setCircleValue] = useState<number | null>(null);

  useEffect(() => {
    const gameState = gameOver(selectedTextValue, EXPECTED_TEXT, () =>
      setSelectedTextValue(''),
    );

    if (gameState.win) {
      alert('Correct!');
    } else if (gameState.win === false) {
      alert('Inforrect!');
    }
  }, [selectedTextValue]);

  // Handler for when circle value changes
  const handleCircleValueChange = useCallback(
    async (degreeValue: number) => {
      if (`${degreeValue / 36}` === EXPECTED_TEXT[selectedTextValue.length]) {
        setHelpInsight(true);
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        );
      }
      setHelpInsight(false);
      setCircleValue(degreeValue);
    },
    [selectedTextValue],
  );

  // Handler for when a value is selected
  const handleSelectValue = useCallback((valueSelected: number) => {
    setSelectedTextValue(prev => prev + valueSelected);
    setCircleValue(null);
  }, []);

  return (
    <PlayContainer
      withNumbersIndicator={false}
      shakeCircle={false}
      helpVibrate={helpInsight}
      onCircleValueChange={handleCircleValueChange}
      onSelectValue={handleSelectValue}
      circleValue={circleValue}
      selectedTextValue={selectedTextValue}
      expectedTextValue={EXPECTED_TEXT}
      circleInputColors={{
        circleColor: '#636E72',
        selectCTAColor: '#636E72',
        selectCTAStrokeColor: '#979D9F',
        dragCTAColor: '#979D9F',
        dragCTAStrokeColor: '#979D9F',
        circleNumberIndicatorColor: '#636E72',
        circleNumberIndicatorStrokeColor: '#979D9F',
      }}
    />
  );
};

export default PlayScreen;
