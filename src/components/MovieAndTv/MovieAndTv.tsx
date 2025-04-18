'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieGrid from '@/components/MovieGrid/MovieGrid';
import { PageSkeleton } from '@/components/Skeleton/PageSkeleton';
import { TMDBResponse } from '@/types/types';
import { AlertTriangle } from 'lucide-react';
import styles from './MoviesPage.module.css';

interface MovieTVPageProps {
  title: string;
  fetchFunction: (page: number, query?: string) => Promise<TMDBResponse>;
  entityType: 'movies' | 'tv shows' | 'results';
  searchMode?: boolean;
}

function MovieTVContent({ title, fetchFunction, entityType, searchMode = false }: MovieTVPageProps) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const queryParam = searchMode ? searchParams.get('q') || '' : undefined;
  
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam, 10) : 1);
  const [data, setData] = useState<TMDBResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [responseData] = await Promise.all([
          fetchFunction(currentPage, queryParam),
          new Promise(resolve => setTimeout(resolve, 1500))
        ]);
        
        setData(responseData);
      } catch (error) {
        console.error(`Error fetching ${entityType}:`, error);
        setError(searchMode 
          ? 'Failed to load search results. Please try again.' 
          : `Failed to load ${entityType}. Please try again later.`
        );
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentPage, queryParam, fetchFunction, entityType, searchMode]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const url = new URL(window.location.href);
    url.searchParams.set('page', newPage.toString());
    window.history.pushState({}, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <PageSkeleton />;
  if (error) return (
    <div className={styles.errorContainer}>
      <AlertTriangle size={32} />
      <p className={styles.errorMessage}>{error}</p>
      <button 
        className={styles.retryButton}
        onClick={() => fetchFunction(currentPage, queryParam).then(setData).catch(() => setError(error))}
      >
        Retry
      </button>
    </div>
  );

  if (!data || data.results.length === 0) {
    return (
      <div className={styles.noResultsContainer}>
        <h1 className={styles.pageTitle}>
          {searchMode ? `Results for "${queryParam}"` : title}
        </h1>
        <p>{searchMode ? 'No results found' : 'No data available'}</p>
        {searchMode && (
          <p className={styles.searchTips}>
            Try checking your spelling or using different keywords
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.pageTitle}>
          {searchMode ? `Results for "${queryParam}"` : title}
        </h1>
        <p className={styles.resultCount}>
          {searchMode 
            ? `Found ${data.total_results} results`
            : `Showing ${data.results.length} of ${data.total_results} ${entityType}`}
        </p>
        <MovieGrid
          items={data.results}
          totalPages={data.total_pages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default function MovieTVPageTemplate(props: MovieTVPageProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <MovieTVContent {...props} />
    </Suspense>
  );
}