import React, { useEffect, useState, useCallback, useMemo } from 'react';
import * as Haptics from 'expo-haptics';
import * as StoreReview from 'expo-store-review';
import sampleSize from 'lodash/sampleSize';
import range from 'lodash/range';
import toNumber from 'lodash/toNumber';
import some from 'lodash/some';
import includes from 'lodash/includes';
import { Audio } from 'expo-av';
import { useStyles } from 'react-native-unistyles';

import { PlayScreenProps } from '@type';
import PlayContainer from '@containers/play';
import { useAppSelector, useAppDispatch } from '@redux';
import {
  GAME_STATE_ACTIONS,
  GAME_STATE_SELECTORS,
  useGameState,
} from '@redux/GameState';
import {
  GameMode,
  LockerPickerConfigKey,
  PlayDifficulty,
  PlayingState,
  SceneConfigKey,
} from '@src/types/gameState';
import { DateUtils } from '@src/utils';
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

const vibrateLevel = {
  [PlayDifficulty.NOVICE]: Haptics.ImpactFeedbackStyle.Heavy,
  [PlayDifficulty.ADVANCED]: Haptics.ImpactFeedbackStyle.Medium,
  [PlayDifficulty.EXPERT]: Haptics.ImpactFeedbackStyle.Medium,
};
const vibrateWrongNumberLevel = {
  [PlayDifficulty.NOVICE]: Haptics.ImpactFeedbackStyle.Light,
  [PlayDifficulty.ADVANCED]: Haptics.ImpactFeedbackStyle.Heavy,
  [PlayDifficulty.EXPERT]: Haptics.ImpactFeedbackStyle.Light,
};

const isAnyCharInArray = (str: string, arr: number[]): boolean =>
  some(str, char => includes(arr, toNumber(char)));

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
  const [soundClick, setSoundClick] = useState<Audio.Sound>();
  const [soundClickIncorrect, setIncorrectSound] = useState<Audio.Sound>();
  const [selectedTextValue, setSelectedTextValue] = useState('');
  const [helpInsight, setHelpInsight] = useState(false);
  const [timePassing, setTimePassing] = useState(null);
  const [circleValue, setCircleValue] = useState<number | null>(null);
  const { theme } = useStyles();
  const playDifficulty = useAppSelector(GAME_STATE_SELECTORS.getDifficulty);
  const playScene = useAppSelector(GAME_STATE_SELECTORS.getPlayScene);
  const themeActiveName = useAppSelector(
    GAME_STATE_SELECTORS.getLockerPickerThemeName,
  );
  const timeLapsed = useAppSelector(GAME_STATE_SELECTORS.getTimeLapsed);
  const showReviewPopup = useAppSelector(
    GAME_STATE_SELECTORS.getShowReviewPopup,
  );

  const winAttemps = useAppSelector(GAME_STATE_SELECTORS.getWinAttemps);
  const difficultyConfig = useAppSelector(
    GAME_STATE_SELECTORS.getDifficultyConfig,
  );
  const playingState = useAppSelector(GAME_STATE_SELECTORS.getPlayingState);
  const lockerPickerColors = useAppSelector(
    GAME_STATE_SELECTORS.getSceneLockerPickerColors,
  );
  const lockerPickerConfig = useAppSelector(
    GAME_STATE_SELECTORS.getLockerPickerConfig,
  );
  const sceneConfig = useAppSelector(GAME_STATE_SELECTORS.getSceneConfigCustom);
  const dispatch = useAppDispatch();
  const isPlaying = playingState === PlayingState.PLAYING;
  const isPlayWin = playingState === PlayingState.WIN;
  const isAttemptedToWin = playingState === PlayingState.LOSE;
  const isIdle = playingState === PlayingState.IDLE;

  const generateNewNumberOnFail =
    isAttemptedToWin && playDifficulty === PlayDifficulty.EXPERT;

  const numberToGuess = useMemo(() => {
    return generateRandomNumberString(
      BOXES_BASED_ON_DIFFICULTY[playDifficulty],
    );
  }, [generateNewNumberOnFail, isIdle]);

  const randomGameOverNumbers = useMemo(() => {
    const numbers = range(10).filter(number => !numberToGuess.includes(number));
    return sampleSize(numbers, difficultyConfig.invalidNumbers);
  }, [generateNewNumberOnFail, isIdle, numberToGuess]);

  useEffect(() => {
    const requestStoreReview = async () => {
      dispatch(GAME_STATE_ACTIONS.toggleAskedToReview());
      await StoreReview.requestReview();
    };
    if (showReviewPopup) {
      requestStoreReview();
    }
  }, [showReviewPopup]);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => getTimePassing(), 1000);
    }
    if (!isPlaying) {
      setTimePassing('00:00:00');
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    setGameMode(gameMode);

    const setSoundEffects = async () => {
      if (sceneConfig.SOUND_EFFECT) {
        const { sound: soundClickEffect } = await Audio.Sound.createAsync(
          require('../../../assets/sounds/click-change.mp3'),
        );
        const { sound: soundIncorrect } = await Audio.Sound.createAsync(
          require('../../../assets/sounds/click-incorrect.mp3'),
        );
        setIncorrectSound(soundIncorrect);
        setSoundClick(soundClickEffect);
      }
    };
    setSoundEffects();
    return () => {
      stop();
      if (soundClick) {
        soundClick.unloadAsync();
      }
      if (soundClickIncorrect) {
        soundClickIncorrect.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (winAttemps > 0) {
      setSelectedTextValue('');
    }

    if (
      difficultyConfig.tryAttemps === winAttemps &&
      gameMode === GameMode.COMPETITIVE
    ) {
      console.log('GAME OVER!');
    }
  }, [winAttemps]);

  useEffect(() => {
    const playSoundEffectOnChange = async () => {
      await soundClick?.replayAsync();
    };
    playSoundEffectOnChange();
  }, [circleValue]);

  useEffect(() => {
    const handleAttempWin = async () => {
      attempWin();
      await soundClickIncorrect?.playFromPositionAsync(0);
      await Haptics.impactAsync(vibrateWrongNumberLevel[playDifficulty]);
    };

    const handleWin = () => {
      finish(selectedTextValue);
    };
    if (isPlaying) {
      gameOver(selectedTextValue, numberToGuess, handleAttempWin, handleWin);
    }
  }, [selectedTextValue, numberToGuess, isPlaying]);

  // Handler for when circle value changes
  const handleCircleValueChange = useCallback(
    async (degreeValue: number) => {
      if (winAttemps === 0 && isIdle) {
        start();
      }

      if (!isPlaying) {
        changePlayingState(PlayingState.PLAYING);
      }

      if (`${degreeValue / 36}` === numberToGuess[selectedTextValue.length]) {
        setHelpInsight(true);
        await Haptics.impactAsync(vibrateLevel[playDifficulty]);
      }

      if (randomGameOverNumbers.includes(toNumber(`${degreeValue / 36}`))) {
        await Haptics.impactAsync(vibrateWrongNumberLevel[playDifficulty]);
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

  const getTimePassing = () => {
    const startTime = playScene.meta.startPlayTime;
    setTimePassing(
      DateUtils.getTimeLapsed(startTime, DateUtils.getDateInDayJs().unix()),
    );
    // return DateUtils.getTimeLapsed(
    //   startTime,
    //   DateUtils.getDateInDayJs().unix(),
    // );
  };

  // console.log(JSON.stringify({ timePassing: getTimePassing() }, null, 2));

  return (
    <PlayContainer
      timePassing={timePassing}
      difficulty={playDifficulty}
      isVisibleGameOverPopUp={
        difficultyConfig.tryAttemps - winAttemps === 0 ||
        (isAnyCharInArray(selectedTextValue, randomGameOverNumbers) &&
          selectedTextValue.length !== numberToGuess.length)
      }
      isGameOverByInvalidNumber={isAnyCharInArray(
        selectedTextValue,
        randomGameOverNumbers,
      )}
      tryAttemps={difficultyConfig.tryAttemps - winAttemps}
      withNumbersIndicator={
        lockerPickerConfig[LockerPickerConfigKey.NUMBER_INDICATOR]
      }
      shakeCircle={
        isAttemptedToWin ||
        lockerPickerConfig[LockerPickerConfigKey.SHAKE_ANIMATION] ||
        [PlayDifficulty.EXPERT].includes(playDifficulty)
      }
      shakeDrag={lockerPickerConfig[LockerPickerConfigKey.SHAKE_DRAG]}
      helpVibrate={
        helpInsight &&
        lockerPickerConfig[LockerPickerConfigKey.HAPTIC_FEEDBACK] &&
        [PlayDifficulty.NOVICE, PlayDifficulty.ADVANCED].includes(
          playDifficulty,
        )
      }
      showTipMessage={sceneConfig[SceneConfigKey.TIP_MESSAGE]}
      showHelpEmoji={
        gameMode === GameMode.SANDBOX
          ? false
          : sceneConfig[SceneConfigKey.HELP_KEY]
      }
      onCircleValueChange={handleCircleValueChange}
      onSelectValue={handleSelectValue}
      circleValue={circleValue}
      selectedTextValue={selectedTextValue}
      expectedTextValue={numberToGuess}
      circleInputColors={theme.components.lockThemes[themeActiveName]}
      squareInputColors={{
        backgroundColor: lockerPickerColors.circleNumberIndicatorColor,
        borderColor: lockerPickerColors.dragCTAColor,
      }}
      isVisibleWinPopup={isPlayWin}
      timeSpent={timeLapsed || ''}
      onCloseWinPopup={() => navigation.goBack()}
      onPlayAgain={() => {
        setSelectedTextValue('');
        stop();
      }}
    />
  );
};

export default PlayScreen;
