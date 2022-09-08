import { useInfiniteQuery } from 'react-query';
import MovieApi from 'apis/MovieApi';

const usePopularMoviesList = () => {
  return useInfiniteQuery(
    ['popularMovieList'],
    ({ pageParam = 1 }) => MovieApi.getPopularMovies({ params: { page: pageParam } }),
    {
      getNextPageParam: lastPage => {
        return lastPage.data.page + 1;
      },
      retry: false,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 30,
    },
  );
};

export default usePopularMoviesList;
