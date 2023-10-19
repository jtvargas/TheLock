import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';

import { AcknowledgementsScreenProps } from '@type';
import Acknowledgements from '@containers/acknowledgements';
import { ModalPopup, Text } from '@src/components';
import { FlatList } from 'react-native-gesture-handler';

const AcknowledgementsScreen: React.FC<AcknowledgementsScreenProps> = () => {
  const [isAcknowledgementsVisible, setVisible] = useState(false);

  return (
    <Acknowledgements
      onPressAcknowledgements={() => setVisible(true)}
      onPressBuyMeACoffe={() => null}
    />
  );
};

export default AcknowledgementsScreen;
