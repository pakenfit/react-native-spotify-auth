import React, { useEffect } from 'react';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Button, Text, View } from 'react-native-ui-lib';
import background from '../assets/images/background.jpg';
import spotify from '../assets/images/spotify.png';
import { Colors, Fonts } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authorize } from '../services/spotify.service';
import { useToast } from '../components/Toast';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Credentials } from '../types/credentials.type';
import { useLoading } from '../components/Loading';
import { Routes } from '../navigations/routes';
import { RootNavigationTypes } from '../types/navigation.type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUser } from '../hooks/useUser';
import { getStorage } from '../hooks/useStorage';
import { notAuthenticated } from '../utils/error-handler';

type RouteTypes = RouteProp<
  {
    params: Readonly<{
      data: string;
    }>;
  },
  'params'
>;

type WelcomeScreenProp = NativeStackNavigationProp<
  RootNavigationTypes,
  Routes.WELCOME
>;

export default function Welcome(): JSX.Element {
  const { height } = useWindowDimensions();
  const toast = useToast();
  const { show, hide, isLoading } = useLoading();
  const route = useRoute<RouteTypes>();
  const { data } = route.params || {};
  const navigation = useNavigation<WelcomeScreenProp>();
  const { data: userData, isLoading: userLoading, error } = useUser();
  const storage = getStorage();

  useEffect(() => {
    if (userLoading) {
      show();
    } else if (notAuthenticated(error)) {
      hide();
      toast.show({
        message: 'Please log in again',
        type: 'failure',
      });
    } else if (userData) {
      hide();
      navigation.navigate(Routes.HOMETABNAV);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoading, userData]);

  useEffect(() => {
    const setCredentials = async () => {
      if (data) {
        show();
        const credentials: Credentials = JSON.parse(decodeURI(data));
        const { access_token, refresh_token } = credentials || {};
        await storage.setItem('refresh_token', refresh_token);
        await storage.setItem('access_token', access_token);
        hide();
        navigation.navigate(Routes.HOMETABNAV);
      }
    };
    setCredentials();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const authenticate = async () => {
    try {
      await authorize();
    } catch (err) {
      toast.show({
        message: 'An error occured, please try again',
        type: 'failure',
      });
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ImageBackground
        source={background}
        style={[styles.image, { height: (height * 3) / 5 }]}
      />
      <View padding-20 flex>
        <Text white style={styles.text}>
          React Native Spotify Auth
        </Text>
        <Text grey50>Your brand new spotify audio player</Text>
      </View>
      <View center marginB-10>
        <Button
          label="Sign in with Spotify"
          backgroundColor={Colors.SPOTIFY}
          iconSource={spotify}
          iconStyle={styles.icon}
          onPress={authenticate}
          disabled={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK,
    flex: 1,
  },
  image: {
    width: '100%',
  },
  text: {
    fontFamily: Platform.OS === 'android' ? Fonts.ROBOTO : Fonts.GEORGIA_BOLD,
    fontSize: 40,
    fontWeight: '900',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
