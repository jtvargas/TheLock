import React from 'react';
import { View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useStyles } from '@src/core/Theme';
import { Colors } from '@utils';

type ModalPopup = {
  isVisible: boolean;
  containerStyle?: ViewStyle;
  children: React.ReactElement;
  position: 'bottom' | 'center' | 'top';
  size: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  onClose: () => void;
};

const ModalPopup: React.FC<ModalPopup> = props => {
  const {
    containerStyle,
    position,
    size,
    backgroundColor = '#ffff',
    children,
    onClose,
    isVisible,
  } = props;
  const { theme } = useStyles();
  const { top, bottom } = useSafeAreaInsets();

  const getPosition = () => {
    switch (position) {
      case 'top':
        return 'flex-start';
      case 'bottom':
        return 'flex-end';
      default:
        return 'center';
    }
  };
  const getSizeScale = () => {
    switch (size) {
      case 'small':
        return '45%';
      case 'medium':
        return '65%';
      default:
        return '45%';
    }
  };

  return (
    <Modal
      swipeThreshold={200}
      onSwipeComplete={onClose}
      useNativeDriverForBackdrop
      swipeDirection={['down', 'up']}
      style={{
        marginHorizontal: theme.spacing.sm,
        marginTop: top,
        marginBottom: bottom,
        justifyContent: getPosition(),
      }}
      isVisible={isVisible}
      backdropOpacity={1}
      customBackdrop={
        <BlurView
          style={{
            flex: 1,
          }}
          intensity={20}
        />
      }
    >
      <View
        style={{
          padding: theme.spacing.md,
          backgroundColor: Colors.hexToRGBA(theme.colors.onMainBackground, 0.2),
          height: getSizeScale(),
          borderRadius: 35,
        }}
      >
        <View
          style={[
            containerStyle,
            {
              flex: 1,
              backgroundColor:
                theme.colors.cardPrimaryBackground || backgroundColor,
              borderRadius: 35 - theme.spacing.md,
            },
          ]}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalPopup;
