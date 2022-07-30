import React from 'react';
import Animated from 'react-native-reanimated';

type Props = {
  data: any[];
  renderItem: (item: any) => JSX.Element;
  keyExtractor: (item: any) => string;
};
export const AnimatedFlatlist = ({ data, renderItem, keyExtractor }: Props) => {
  return (
    <Animated.FlatList
      data={data}
      renderItem={renderItem}
      horizontal
      keyExtractor={keyExtractor}
    />
  );
};
