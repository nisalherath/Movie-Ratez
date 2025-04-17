'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchMedia } from '@/services/tmdb';
import MovieGrid from '@/components/MovieGrid/MovieGrid';
import { SearchPageSkeleton } from '@/components/Skeleton/SearchPageSkeleton';
import { TMDBResponse } from '@/types/types';
import { Search, AlertTriangle } from 'lucide-react';
import styles from './MoviesPage.module.css';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [data, setData] = useState<TMDBResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Reset to page 1 when the query changes
    if (query !== searchParams.get('q')) {
      setCurrentPage(1);
    }
    
    const fetchData = async () => {
      if (!query) {
        setData(null);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const searchResults = await searchMedia(query, currentPage);
        setData(searchResults);
      } catch (error) {
        console.error('Error searching media:', error);
        setError('Failed to load search results. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [query, currentPage, searchParams]);
  
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Update URL with the new page parameter while preserving the search query
    const url = new URL(window.location.href);
    url.searchParams.set('page', newPage.toString());
    window.history.pushState({}, '', url);
    
    // Scroll to top smoothly on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        {!query ? (
          <div className={styles.emptySearchContainer}>
            <h1 className={styles.pageTitle}>Search</h1>
            <Search size={48} />
            <p>Enter a search term in the search bar above to find movies and TV shows</p>
          </div>
        ) : loading ? (
          <SearchPageSkeleton />
        ) : error ? (
          <div className={styles.errorContainer}>
            <h1 className={styles.pageTitle}>Error</h1>
            <AlertTriangle size={32} />
            <p>{error}</p>
            <button 
              className={styles.retryButton}
              onClick={() => searchMedia(query, currentPage).then(setData)}
            >
              Retry
            </button>
          </div>
        ) : !data || data.results.length === 0 ? (
          <div className={styles.noResultsContainer}>
            <h1 className={styles.pageTitle}>Results for &ldquo;{query}&rdquo;</h1>
            <p>No results found</p>
            <p className={styles.searchTips}>
              Try checking your spelling or using different keywords
            </p>
          </div>
        ) : (
          <>
            <h1 className={styles.pageTitle}>Results for &ldquo;{query}&rdquo;</h1>
            <p className={styles.resultCount}>
              Found {data.total_results} results
            </p>
            <MovieGrid
              items={data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv')}
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