import { getStorage } from './../hooks/useStorage';
import { getRefreshedToken } from '../services/spotify.service';

export type Error = {
  _response: string;
};

export const notAuthenticated = (error: Error | null): boolean => {
  if (error) {
    const message: string = JSON.parse(error._response).error.message;
    const status: number = JSON.parse(error._response).error.status;
    return status === 401 && message === 'No token provided';
  }
  return false;
};
export const errorHandler = async (error: Error, refetch: () => void) => {
  const { getItem, setItem } = getStorage();
  const message: string = JSON.parse(error._response).error.message;
  const status: number = JSON.parse(error._response).error.status;
  if (status === 401 && message !== 'No token provided') {
    const refreshed = await getRefreshedToken(
      (await getItem('refresh_token')) as string,
    );
    if (refreshed.data.access_token) {
      await setItem('access_token', refreshed.data.access_token);
      refetch();
    }
  }
};
