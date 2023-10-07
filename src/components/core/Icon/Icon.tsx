import * as React from 'react';
import FontAwesomeIcons from '@expo/vector-icons/FontAwesome5';

enum IconName {
  practice = 'codepen',
  theme = 'palette',
  difficulty = 'tachometer-alt',
  settings = 'cogs',
  about = 'info-circle',
  play = 'play-circle',
  stats = 'share-alt-square',
}
type IconProps = {
  name: keyof typeof IconName;
  color: string;
  size: number;
};

const Icon = (props: IconProps) => {
  const { name, color, size } = props;
  return <FontAwesomeIcons name={IconName[name]} size={size} color={color} />;
};

export default Icon;
