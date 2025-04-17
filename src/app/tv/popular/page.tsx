'use client';

import { fetchPopularTVShows } from '@/services/tmdb';
import MovieTVPageTemplate from '@/components/MovieAndTv/MovieAndTv';

export default function PopularTVShowsPage() {
  return (
    <MovieTVPageTemplate
      title="Popular TV Shows"
      fetchFunction={fetchPopularTVShows}
      entityType="tv shows"
    />
  );
}