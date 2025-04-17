'use client';

import { fetchAiringTodayTVShows } from '@/services/tmdb';
import MovieTVPageTemplate from '@/components/MovieAndTv/MovieAndTv';

export default function AiringTodayTVShowsPage() {
  return (
    <MovieTVPageTemplate
      title="Airing Today"
      fetchFunction={fetchAiringTodayTVShows}
      entityType="tv shows"
    />
  );
}