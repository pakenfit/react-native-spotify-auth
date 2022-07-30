import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { AnimatedListContainer } from '../../components/AnimatedListContainer';
import { Card } from '../../components/Card';
import { Layout } from '../../components/Layout';
import { useLoading } from '../../components/Loading';
import { useCategories } from '../../hooks/useCategories';
import { useRecentTracks } from '../../hooks/useRecentTracks';
import { useUser } from '../../hooks/useUser';
import { Category } from '../../types/categories.type';
import { Track } from '../../types/tracks.type';
import { uniquifyTracks } from '../../utils';

export default function HomeScreen(): JSX.Element {
  const { data } = useUser();
  const { data: categories, isLoading: categoryLoading } = useCategories();
  const { data: recentTracks, isLoading: recentTrackLoading } =
    useRecentTracks();
  const loading = useLoading();

  useEffect(() => {
    if (categoryLoading || recentTrackLoading) {
      loading.show();
    } else {
      loading.hide();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryLoading, recentTrackLoading]);

  if (categoryLoading || recentTrackLoading) {
    return <Layout />;
  }
  return (
    <Layout
      headerProps={{ text: `Hi ${data?.display_name}` }}
      hasBackArrow
      onBackArrowPress={() => console.log('wesh')}>
      <View style={styles.categories}>
        <AnimatedListContainer
          title="Genre"
          data={categories?.categories.items ?? []}
          renderItem={(item: { index: number; item: Category }) => {
            return (
              <Card
                title={item?.item?.name}
                featured={item?.item?.icons?.[0]?.url}
              />
            );
          }}
          keyExtractor={(item: Category) => item.id}
        />
      </View>
      <View style={styles.categories}>
        <AnimatedListContainer
          title="Recently Played Tracks"
          data={uniquifyTracks(recentTracks?.items ?? [])}
          renderItem={(item: { index: number; item: Track }) => {
            return (
              <Card
                title={item?.item?.track.name}
                featured={item?.item?.track.album.images[0].url}
                subtitle={item?.item?.track?.album.album_type}
              />
            );
          }}
          keyExtractor={(item: Track) => item.track.id}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  categories: {
    marginTop: 50,
  },
});
