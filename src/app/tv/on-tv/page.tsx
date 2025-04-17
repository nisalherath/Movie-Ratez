'use client';

import { fetchOnTheAirTVShows } from '@/services/tmdb';
import MovieTVPageTemplate from '@/components/MovieAndTv/MovieAndTv';

export default function OnTvTVShowsPage() {
  return (
    <MovieTVPageTemplate
      title="ON TV"
      fetchFunction={fetchOnTheAirTVShows}
      entityType="tv shows"
    />
  );
}