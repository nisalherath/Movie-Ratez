'use client';

import { fetchTopRatedTVShows } from '@/services/tmdb';
import MovieTVPageTemplate from '@/components/MovieAndTv/MovieAndTv';

export default function TopRatedTVShowsPage() {
  return (
    <MovieTVPageTemplate
      title="Top Rated TV Shows"
      fetchFunction={fetchTopRatedTVShows}
      entityType="tv shows"
    />
  );
}