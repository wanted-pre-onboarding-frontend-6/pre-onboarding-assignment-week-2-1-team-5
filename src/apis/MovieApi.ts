import Api from './Base';

interface ParamsString {
  params: string | object;
  movie_id?: string;
}

class MovieApi extends Api {
  public async getPopularMovies({ params }: ParamsString) {
    return await this.get(`/movie/popular`, { params });
  }

  public async getNowPlayingMovies({ params }: ParamsString) {
    return await this.get(`/now_playing`, { params });
  }

  public async getUpcomingMovies({ params }: ParamsString) {
    return await this.get(`/upcoming`, { params });
  }

  public async getTopRatedMovies({ params }: ParamsString) {
    return await this.get(`/top_rated`, { params });
  }
}
export default new MovieApi();
