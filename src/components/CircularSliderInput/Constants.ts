import { Dimensions } from 'react-native';

const { width: DIMENSION_WIDTH, height: DIMENSION_HEIGHT } =
  Dimensions.get('window');

const RADIUS = DIMENSION_WIDTH * 0.3;
const CENTER_X = DIMENSION_WIDTH / 2;
const CENTER_Y = DIMENSION_WIDTH / 2;

export { RADIUS, CENTER_X, CENTER_Y, DIMENSION_WIDTH, DIMENSION_HEIGHT };
