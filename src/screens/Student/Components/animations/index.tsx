import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withDecay } from 'react-native-reanimated';
import imgArm from 'src/assets/image/Arm.png';

import { styledSelect } from './styles';

const SIZE = 120;

export function SelectPosition() {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const onLayout = (event: any) => {
    width.value = event.nativeEvent.layout.width;
    height.value = event.nativeEvent.layout.height;
  };

  const pan = Gesture.Pan()
    .onChange((event) => {
      offsetX.value += event.translationX;
      offsetY.value += event.translationY;
    })
    .onFinalize((event) => {
      offsetX.value = withDecay({
        velocity: event.velocityX * 0.5, // Reduzindo a velocidade pela metade
        clamp: [-(width.value / 2) + SIZE / 2, width.value / 2 - SIZE / 2],
      });
      offsetY.value = withDecay({
        velocity: event.velocityY * 0.5, // Reduzindo a velocidade pela metade
        clamp: [-(height.value / 2) + SIZE / 2, height.value / 2 - SIZE / 2],
      });
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
    zIndex: 9999,
  }));

  return (
    <GestureHandlerRootView>
      <TouchableOpacity onLayout={onLayout} style={styledSelect.container}>
        <GestureDetector gesture={pan}>
          <Animated.Image source={imgArm} style={[styledSelect.img, animatedStyles]} />
        </GestureDetector>
      </TouchableOpacity>
      {/* {props.children} */}
    </GestureHandlerRootView>
  );
}
