import { recentTracksResponse } from './../types/tracks.type';
import { Error, errorHandler } from './../utils/error-handler';
import { getRecentlyPlayedTracks } from './../services/spotify.service';
import { useQuery, UseQueryResult } from 'react-query';

export const useRecentTracks = (): UseQueryResult<
  recentTracksResponse,
  Error
> => {
  const { refetch, ...rest } = useQuery<
    Promise<SpotifyApi.UsersRecentlyPlayedTracksResponse>,
    Error,
    recentTracksResponse
  >('recentTracks', getRecentlyPlayedTracks, {
    onError: (error: Error) => errorHandler(error, refetch),
  });
  return { refetch, ...rest };
};
