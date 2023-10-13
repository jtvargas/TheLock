import * as React from 'react';
import { scale } from 'react-native-size-matters';
import FontAwesomeIcons from '@expo/vector-icons/FontAwesome5';

export enum IconName {
  practice = 'codepen',
  personalize = 'palette',
  difficulty = 'tachometer-alt',
  settings = 'cogs',
  about = 'info-circle',
  play = 'play-circle',
  stats = 'history',
}
type IconProps = {
  name: keyof typeof IconName;
  color: string;
  size: number;
};

const Icon = (props: IconProps) => {
  const { name, color, size } = props;
  return (
    <FontAwesomeIcons name={IconName[name]} size={scale(size)} color={color} />
  );
};

export default Icon;
