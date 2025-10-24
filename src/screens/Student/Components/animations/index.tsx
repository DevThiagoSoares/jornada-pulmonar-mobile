/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { View } from 'react-native-animatable';
import { GestureEvent, PanGestureHandler, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';
import imgArm from 'src/assets/image/Arm.png';

import { styledSelect } from './styles';

interface SelectProps {
  newLocationX?: number;
  newLocationY?: number;
}

export function SelectPosition(props: SelectProps) {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  useEffect(() => {
    if (props.newLocationX && props.newLocationY) {
      (offsetX.value = props.newLocationX + 100), (offsetY.value = props.newLocationY + 100);
    }
  }, [props]);
  
  const panGestureEvent = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    'worklet';
    (offsetX.value = event.nativeEvent.translationX + 100), (offsetY.value = event.nativeEvent.translationY + 100);
  };
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
    zIndex: 9999,
  }));

  return (
    <View style={{ height: 100, position: 'relative' }}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.Image source={imgArm} style={[styledSelect.img, animatedStyles]} />
      </PanGestureHandler>
    </View>
  );
}
