'use client';

import { fetchUpcomingMovies } from '@/services/tmdb';
import MovieTVPageTemplate from '@/components/MovieAndTv/MovieAndTv';

export default function UpcomingMoviesPage() {
  return (
    <MovieTVPageTemplate
      title="Upcoming Movies"
      fetchFunction={fetchUpcomingMovies}
      entityType="movies"
    />
  );
}