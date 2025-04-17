'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from '@/components/MovieCard/MovieCard';
import { MediaItem } from '@/types/types';
import { isMovie } from '@/services/tmdb';
import styles from './MovieGrid.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieGridProps {
  items: MediaItem[];
  totalPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

const MovieGrid = ({ 
  items, 
  totalPages, 
  currentPage, 
  onPageChange,
  isLoading = false
}: MovieGridProps) => {
  const [visiblePage, setVisiblePage] = useState(currentPage || 1);
  const [isMounted, setIsMounted] = useState(false);
  
  // For smooth animation when changing pages
  useEffect(() => {
    setIsMounted(true);
    setVisiblePage(currentPage || 1);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (onPageChange && newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
      // First update the visual state for smooth transition
      setVisiblePage(newPage);
      // Then trigger the actual page change
      onPageChange(newPage);
      
      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    const page = currentPage || 1;
    
    // Always show first page
    buttons.push(
      <motion.button 
        key={1}
        onClick={() => handlePageChange(1)}
        className={`${styles.pageButton} ${page === 1 ? styles.active : ''}`}
        disabled={page === 1}
        whileHover={{ scale: page !== 1 ? 1.1 : 1 }}
        whileTap={{ scale: 0.95 }}
      >
        1
      </motion.button>
    );
    
    // Calculate start and end page numbers
    let startPage = Math.max(2, page - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisibleButtons - 3);
    
    // Adjust start page if end page is maxed out
    if (endPage === totalPages - 1) {
      startPage = Math.max(2, endPage - maxVisibleButtons + 3);
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      buttons.push(<span key="ellipsis1" className={styles.ellipsis}>...</span>);
    }
    
    // Add page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <motion.button 
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${styles.pageButton} ${page === i ? styles.active : ''}`}
          whileHover={{ scale: page !== i ? 1.1 : 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {i}
        </motion.button>
      );
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1 && totalPages > 1) {
      buttons.push(<span key="ellipsis2" className={styles.ellipsis}>...</span>);
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      buttons.push(
        <motion.button 
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`${styles.pageButton} ${page === totalPages ? styles.active : ''}`}
          disabled={page === totalPages}
          whileHover={{ scale: page !== totalPages ? 1.1 : 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {totalPages}
        </motion.button>
      );
    }
    
    return buttons;
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          {Array(12).fill(0).map((_, i) => (
            <div key={i} className={styles.loadingCard}></div>
          ))}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <motion.div 
        className={styles.noResults}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        No results found
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={visiblePage}
          className={styles.grid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {items.map((item) => (
            <motion.div 
              key={`${item.id}-${isMovie(item) ? 'movie' : 'tv'}`} 
              className={styles.gridItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: isMounted ? 0 : Math.random() * 0.3 }}
            >
              <MovieCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <motion.button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.pageButton}
            whileHover={{ scale: currentPage !== 1 ? 1.1 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </motion.button>
          
          {renderPaginationButtons()}
          
          <motion.button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
            whileHover={{ scale: currentPage !== totalPages ? 1.1 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default MovieGrid;