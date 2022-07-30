import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import { AnimatedFlatlist } from './AnimatedFlatList';

type Props = {
  data: any[];
  title: string;
  renderItem: (item: any) => JSX.Element;
  keyExtractor: (item: any) => string;
};
export const AnimatedListContainer = ({
  data,
  keyExtractor,
  renderItem,
  title,
}: Props) => {
  return (
    <View>
      <Text white text30 marginB-5 numberOfLines={1}>
        {title}
      </Text>
      <AnimatedFlatlist
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};
