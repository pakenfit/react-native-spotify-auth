import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { View } from 'react-native-ui-lib';
import { Colors } from '../theme';

type Props = {
  right?: ReactNode;
  left?: ReactNode;
  text?: string;
};
export function Header({ right, text, left }: Props) {
  return (
    <View style={styles.container}>
      <View row marginB-20>
        <View>{left}</View>
        <View>{right}</View>
      </View>
      <View>
        <Animated.Text
          style={styles.text}
          numberOfLines={1}
          entering={SlideInLeft}>
          {text}
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 25,
    fontWeight: '800',
    color: Colors.WHITE,
  },
});
