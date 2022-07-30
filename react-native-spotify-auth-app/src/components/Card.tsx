import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';

type Props = {
  title: string;
  subtitle?: string;
  featured: string;
};
export const Card = ({ title, subtitle, featured }: Props) => {
  return (
    <View width={120} height={150} marginL-5>
      <View flex>
        <Image source={{ uri: featured }} style={styles.image} />
      </View>
      <View>
        <Text white numberOfLines={1} ellipsizeMode="tail" text70>
          {title}
        </Text>
        {subtitle && (
          <Text white numberOfLines={1} ellipsizeMode="tail" $textNeutral>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
