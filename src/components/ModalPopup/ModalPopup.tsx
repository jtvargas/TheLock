import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Button, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useStyles } from 'react-native-unistyles';
import { Colors } from '@utils';
import { ViewSnapshot } from '@components';

type ModalPopup = {
  isVisible: boolean;
  containerStyle?: ViewStyle;
  children: React.ReactElement;
  position: 'bottom' | 'center' | 'top';
  size: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  customBackgroundColor?: string;
  onClose: () => void;
  style: ViewStyle;
};

const ModalPopup: React.FC<ModalPopup> = forwardRef((props, ref) => {
  const {
    containerStyle,
    position,
    size,
    backgroundColor = '#ffff',
    children,
    onClose,
    style,
    isVisible,
    customBackgroundColor,
  } = props;
  const { theme } = useStyles();
  const { top, bottom } = useSafeAreaInsets();
  const modalContentRef = useRef(null);

  useImperativeHandle(ref, () => modalContentRef.current);

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
        return '100%';
    }
  };

  // const onCaptureContent = () => {
  //   snapshotRef.current?.onCaptureView?.();
  // };

  return (
    <Modal
      swipeThreshold={100}
      onSwipeComplete={onClose}
      useNativeDriverForBackdrop
      swipeDirection={['down']}
      style={[
        {
          marginHorizontal: theme.spacing.sm,
          marginTop: top,
          marginBottom: bottom,
          justifyContent: getPosition(),
        },
        style,
      ]}
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
        ref={modalContentRef}
        style={[
          {
            padding: theme.spacing.md,
            backgroundColor: Colors.hexToRGBA(
              customBackgroundColor ?? theme.colors.onMainBackground,
              0.5,
            ),
            height: getSizeScale(),
          },
          containerStyle,
        ]}
      >
        <View
          style={[
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
});

export default ModalPopup;
