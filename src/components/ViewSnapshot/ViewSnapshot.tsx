import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import ViewShot, { ViewShotProperties } from 'react-native-view-shot';
import { View, Text } from 'react-native';
import * as Sharing from 'expo-sharing';

type ViewSnapshotRefProps = {
  onCaptureView: (uri: string) => null;
};
interface ViewSnapshotProps {}

const ViewSnapshot = forwardRef<ViewSnapshotProps, ViewSnapshotRefProps>(
  (props, ref) => {
    const internalRef = useRef<any>();

    useImperativeHandle(ref, () => ({
      onCaptureView: () => {
        console.log('function called from Child');
        // internalRef.current.
        internalRef.current.capture().then(uri => {
          console.log('do something with ', uri);
          Sharing.shareAsync(uri);
        });
        return null;
      },
    }));

    return (
      <ViewShot
        style={props.style}
        ref={internalRef}
        options={{ format: 'png', quality: 0.8 }}
        onLayout={() => console.log('On Layout ready! ')}
      >
        {props.children}
      </ViewShot>
    );
  },
);

export default ViewSnapshot;
