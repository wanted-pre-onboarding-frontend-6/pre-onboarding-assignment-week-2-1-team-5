import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import MovieContent from 'components/content/MovieContent';
import { LoadingSpinner } from 'styles/Common';
import useUpcomingMoviesList from 'queries/movie/UpcomingMoviesList';

interface UpComingContentProps {
  movieListItem: any;
  setMovieListItem: any;
}

const UpComingContent: FC<UpComingContentProps> = ({ movieListItem, setMovieListItem }) => {
  const { data, isFetching, fetchNextPage } = useUpcomingMoviesList();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!data) return;
    setMovieListItem(data);
  }, [data]);

  useEffect(() => {
    if (!inView || isFetching) return;
    fetchNextPage();
  }, [inView]);

  return (
    <UpComingContentWrapper>
      <>
        {movieListItem &&
          movieListItem.pages?.map(
            (page: { data: { results: any[] } }, i: React.Key | null | undefined) => (
              <React.Fragment key={i}>
                {page.data.results.map((movie: any) => (
                  <MovieContent key={movie.id} data={movie} />
                ))}
              </React.Fragment>
            ),
          )}
        <div ref={ref}>{isFetching && <LoadingSpinner />}</div>
      </>
    </UpComingContentWrapper>
  );
};

export default UpComingContent;

const UpComingContentWrapper = styled.div`
  min-height: 100vh;
  width: calc(100% - 340px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 64px;
`;