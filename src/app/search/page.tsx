'use client';

import { Suspense } from 'react';
import MovieTVPageTemplate from '@/components/MovieAndTv/MovieAndTv';
import { searchMedia } from '@/services/tmdb';
import { SearchPageSkeleton } from '@/components/Skeleton/SearchPageSkeleton';
import styles from './MoviesPage.module.css';

export default function SearchPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <Suspense fallback={<SearchPageSkeleton />}>
          <MovieTVPageTemplate
            title="Search Results"
            fetchFunction={(page, query) => {
              // Making sure no empty queries getting injected
              if (!query || !query.trim()) {
                return Promise.resolve({
                  page: 1,
                  results: [],
                  total_pages: 0,
                  total_results: 0
                });
              }
              return searchMedia(query, page);
            }}
            entityType="results"
            searchMode={true}
          />
        </Suspense>
      </div>
    </div>
  );
}