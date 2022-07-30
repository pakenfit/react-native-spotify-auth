import { getMe } from './../services/spotify.service';
import { useQuery, UseQueryResult } from 'react-query';
import { User } from '../types/user.type';
import { Error, errorHandler } from '../utils/error-handler';

export const useUser = (): UseQueryResult<User, Error> => {
  const { refetch, ...rest } = useQuery<
    Promise<SpotifyApi.CurrentUsersProfileResponse>,
    Error,
    User
  >('user', getMe, {
    onError: (error: Error) => errorHandler(error, refetch),
  });
  return { refetch, ...rest };
};
