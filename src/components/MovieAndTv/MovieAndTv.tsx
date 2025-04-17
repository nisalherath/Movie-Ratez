'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieGrid from '@/components/MovieGrid/MovieGrid';
import { PageSkeleton } from '@/components/Skeleton/PageSkeleton';
import { TMDBResponse } from '@/types/types';
import { AlertTriangle } from 'lucide-react';
import styles from './MoviesPage.module.css';

interface MovieTVPageProps {
  title: string;
  fetchFunction: (page: number) => Promise<TMDBResponse>;
  entityType: 'movies' | 'tv shows';
}

export default function MovieTVPageTemplate({ 
  title, 
  fetchFunction, 
  entityType 
}: MovieTVPageProps) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [data, setData] = useState<TMDBResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // delay 1.5
        const delayPromise = new Promise(resolve => setTimeout(resolve, 1500));
        
        // Fetch data after delay
        const [responseData] = await Promise.all([
          fetchFunction(currentPage),
          delayPromise
        ]);
        
        setData(responseData);
      } catch (error) {
        console.error(`Error fetching ${entityType}:`, error);
        setError(`Failed to load ${entityType}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentPage, entityType, fetchFunction]);
  
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
        {loading ? (
          <PageSkeleton />
        ) : error ? (
          <div className={styles.errorContainer}>
            <AlertTriangle size={32} />
            <p className={styles.errorMessage}>{error}</p>
            <button 
              className={styles.retryButton}
              onClick={() => fetchFunction(currentPage).then(setData).catch(() => setError(`Failed to load ${entityType}`))}
            >
              Retry
            </button>
          </div>
        ) : !data ? (
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>No data available. Please try again later.</p>
            <button 
              className={styles.retryButton}
              onClick={() => fetchFunction(currentPage).then(setData).catch(() => setError(`Failed to load ${entityType}`))}
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <h1 className={styles.pageTitle}>{title}</h1>
            <p className={styles.resultCount}>
              Showing <span className={styles.highlight}>{data.results.length}</span> of <span className={styles.highlight}>{data.total_results}</span> {entityType}
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