import SpotifyWebApi from 'spotify-web-api-js';
import { Linking } from 'react-native';
import { SERVER_CORE } from '@env';
import axios from 'axios';
import { getStorage } from '../hooks/useStorage';

const getInstance = async () => {
  const spotifyApi = new SpotifyWebApi();
  const { getItem } = getStorage();
  spotifyApi.setAccessToken(await getItem('access_token'));
  return spotifyApi;
};

export const authorize = async (): Promise<any> =>
  Linking.openURL(`${SERVER_CORE}/user/authorize`);

export const getMe =
  async (): Promise<SpotifyApi.CurrentUsersProfileResponse> => {
    const api = await getInstance();
    return api.getMe();
  };

export const getRefreshedToken = async (refresh_token: string) =>
  axios.post(`${SERVER_CORE}/user/refresh_token`, { refresh_token });

export const getListOfCategories =
  async (): Promise<SpotifyApi.MultipleCategoriesResponse> => {
    const api = await getInstance();
    return api.getCategories();
  };

export const getRecentlyPlayedTracks =
  async (): Promise<SpotifyApi.UsersRecentlyPlayedTracksResponse> => {
    const api = await getInstance();
    return api.getMyRecentlyPlayedTracks();
  };
