import { CategoriesResponse } from './../types/categories.type';
import { Error, errorHandler } from './../utils/error-handler';
import { getListOfCategories } from './../services/spotify.service';
import { useQuery, UseQueryResult } from 'react-query';

export const useCategories = (): UseQueryResult<CategoriesResponse, Error> => {
  const { refetch, ...rest } = useQuery<
    Promise<SpotifyApi.MultipleCategoriesResponse>,
    Error,
    CategoriesResponse
  >('categories', getListOfCategories, {
    onError: (error: Error) => errorHandler(error, refetch),
  });
  return { refetch, ...rest };
};
