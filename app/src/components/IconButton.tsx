import React, { ReactNode, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  children: ReactNode;
  isActive?: boolean;
};
export function IconButton({ children, isActive }: Props): JSX.Element {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isActive) {
      scale.value = withTiming(2.3, { duration: 1000 });
      scale.value = withDelay(1000, withSpring(1.5));
    }
  }, [isActive, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity>{children}</TouchableOpacity>
    </Animated.View>
  );
}
