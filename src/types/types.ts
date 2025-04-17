export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
  }
  
  export interface TvShow {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    first_air_date: string;
    vote_average: number;
    genre_ids: number[];
  }
  
  export interface MediaItem {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    media_type?: 'movie' | 'tv';
    genre_ids: number[];
  }
  
  export interface ApiResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
  }
  
  export type MoviesResponse = ApiResponse<Movie>;
  export type TvShowsResponse = ApiResponse<TvShow>;
  export type TrendingResponse = ApiResponse<MediaItem>;