import { useInfiniteQuery } from 'react-query';
import MovieApi from 'apis/MovieApi';

const useUpcomingMoviesList = () => {
  return useInfiniteQuery(
    ['UpcomingMoviesList'],
    ({ pageParam = 1 }) => MovieApi.getUpcomingMovies({ params: { page: pageParam } }),
    {
      getNextPageParam: lastPage => {
        return lastPage.data.page + 1;
      },
      retry: false,
      refetchOnWindowFocus: false,
      onError: (err: any) => {
        throw new Error(err);
      },
    },
  );
};

export default useUpcomingMoviesList;
