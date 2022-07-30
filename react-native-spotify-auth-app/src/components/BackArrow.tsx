import React from 'react';
import { Colors } from '../theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  onPress: () => void;
};
export function BackArrow({ onPress }: Props): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesign name="leftcircleo" color={Colors.WHITE} size={30} />
    </TouchableOpacity>
  );
}
