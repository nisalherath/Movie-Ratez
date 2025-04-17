'use client';

import { fetchTopRatedMovies } from '@/services/tmdb';
import MovieTVPageTemplate from '@/components/MovieAndTv/MovieAndTv';

export default function TopRatedMoviesPage() {
  return (
    <MovieTVPageTemplate
      title="Top Rated Movies"
      fetchFunction={fetchTopRatedMovies}
      entityType="movies"
    />
  );
}