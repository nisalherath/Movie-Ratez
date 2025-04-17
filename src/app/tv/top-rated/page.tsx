'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchTopRatedTVShows } from '@/services/tmdb';
import MovieGrid from '@/components/MovieGrid/MovieGrid';
import { TMDBResponse } from '@/types/types';
import { Loader2 } from 'lucide-react';
import styles from '../../movies/popular/MoviesPage.module.css';

export default function TopRatedTVShowsPage() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [data, setData] = useState<TMDBResponse | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const tvShowsData = await fetchTopRatedTVShows(currentPage);
        setData(tvShowsData);
      } catch (error) {
        console.error('Error fetching top rated TV shows:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentPage]);
  
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Update URL with the new page parameter
    const url = new URL(window.location.href);
    url.searchParams.set('page', newPage.toString());
    window.history.pushState({}, '', url);
    
    // Scroll to top smoothly on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.pageTitle}>Top Rated TV Shows</h1>
        
        {loading ? (
          <div className={styles.loadingContainer}>
            <Loader2 className={styles.loadingSpinner} size={40} />
            <p>Loading top rated TV shows...</p>
          </div>
        ) : !data ? (
          <div className={styles.errorContainer}>
            <p>Failed to load TV shows. Please try again later.</p>
            <button 
              className={styles.retryButton}
              onClick={() => fetchTopRatedTVShows(currentPage).then(setData)}
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <p className={styles.resultCount}>
              Showing {data.results.length} of {data.total_results} TV shows
            </p>
            <MovieGrid
              items={data.results}
              totalPages={data.total_pages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}