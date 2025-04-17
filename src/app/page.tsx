import Link from 'next/link';
import HeroSection from '@/components/HeroSection/HeroSection';
import MovieCarousel from '@/components/MovieCarousel/MovieCarousel';
import { fetchTrendingMovies, fetchTrendingTVShows } from '@/services/tmdb';
import { Movie } from '@/types/types';
import { ChevronRight } from 'lucide-react';
import styles from './page.module.css';

export default async function Home() {
  // Fetch trending movies and TV shows
  const trendingMoviesData = await fetchTrendingMovies();
  const trendingTVShowsData = await fetchTrendingTVShows();
  
  // Get trending movies for hero section
  const heroMovies = trendingMoviesData?.results?.slice(0, 5) as Movie[] || [];
  
  // Get all trending movies and shows for the carousel sections
  // Using more items for the carousel display
  const trendingMovies = trendingMoviesData.results.slice(0, 10);
  const trendingTVShows = trendingTVShowsData.results.slice(0, 10);

  return (
    <div className={styles.pageContainer}>
      <HeroSection movies={heroMovies} />
      
      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Trending Movies</h2>
            <Link href="/movies/popular" className={styles.viewAllLink}>
              View All
              <ChevronRight size={16} />
            </Link>
          </div>
          <MovieCarousel 
            items={trendingMovies} 
            totalPages={1} 
            currentPage={1} 
          />
        </section>
        
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Trending TV Shows</h2>
            <Link href="/tv/popular" className={styles.viewAllLink}>
              View All
              <ChevronRight size={16} />
            </Link>
          </div>
          <MovieCarousel 
            items={trendingTVShows} 
            totalPages={1} 
            currentPage={1} 
          />
        </section>
      </div>
    </div>
  );
}