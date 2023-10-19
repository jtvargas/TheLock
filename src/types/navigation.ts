import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GameMode } from './gameState';

type RootStackParamList = {
  Home: undefined;
  Play: { gameMode: GameMode };
  Difficulty: undefined;
  Stats: undefined;
  Personalize: undefined;
  Settings: undefined;
  About: undefined;
  Acknowledgements: undefined;
};
type ScreenKey = keyof RootStackParamList;

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type PlayScreenProps = NativeStackScreenProps<RootStackParamList, 'Play'>;
type DifficultyScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Difficulty'
>;
type StatsScreenProps = NativeStackScreenProps<RootStackParamList, 'Stats'>;
type PersonalizeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Personalize'
>;
type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;
type AboutScreenProps = NativeStackScreenProps<RootStackParamList, 'About'>;
type AcknowledgementsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Acknowledgements'
>;

export {
  RootStackParamList,
  NativeStackScreenProps,
  HomeScreenProps,
  DifficultyScreenProps,
  PlayScreenProps,
  StatsScreenProps,
  PersonalizeScreenProps,
  SettingsScreenProps,
  AboutScreenProps,
  ScreenKey,
  AcknowledgementsScreenProps,
};
