/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { View } from 'react-native-animatable';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
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
  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {},
    onActive: (event) => {
      (offsetX.value = event.translationX + 100), (offsetY.value = event.translationY + 100);
    },
    onEnd: () => {
      (offsetX.value = withSpring(0)), (offsetY.value = withSpring(0));
    },
  });
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
