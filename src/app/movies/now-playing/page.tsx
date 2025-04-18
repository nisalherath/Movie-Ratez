'use client';

import { fetchNowPlayingMovies } from '@/services/tmdb';
import MovieTVPageTemplate from '@/components/MovieAndTv/MovieAndTv';

export default function NowPlayingMoviesPage() {
  return (
    <MovieTVPageTemplate
      title="Now Playing Movies"
      fetchFunction={fetchNowPlayingMovies}
      entityType="movies"
    />
  );
}