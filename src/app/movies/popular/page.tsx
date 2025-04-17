'use client';

import { fetchPopularMovies } from '@/services/tmdb';
import MovieTVPageTemplate from '@/components/MovieAndTv/MovieAndTv';

export default function PopularMoviesPage() {
  return (
    <MovieTVPageTemplate
      title="Popular Movies"
      fetchFunction={fetchPopularMovies}
      entityType="movies"
    />
  );
}