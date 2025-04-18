'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, PanInfo } from 'framer-motion';
import MovieCarouselCard from '@/components/MovieCarouselCard/MovieCarouselCard';
import { MediaItem } from '@/types/types';
import { isMovie } from '@/services/tmdb';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import styles from './MovieCarousel.module.css';
import { CarouselSkeleton } from '@/components/Skeleton/CarouselSkeleton';

interface MovieCarouselProps {
  items: MediaItem[];
  title?: string;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  autoplaySpeed?: number;
}

const MovieCarousel = ({
  items,
  title,
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  isLoading = false,
  autoplaySpeed = 5000
}: MovieCarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const getMaxSlide = useCallback(() => {
    return Math.max(0, items.length - slidesToShow);
  }, [items.length, slidesToShow]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 900) {
        setSlidesToShow(3);
      } else if (window.innerWidth < 1200) {
        setSlidesToShow(4);
      } else {
        setSlidesToShow(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if (isLoading) {
      setLocalLoading(true);
      return;
    }
    
    const timer = setTimeout(() => {
      setLocalLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [isLoading, items]);

  const nextSlide = useCallback(() => {
    const maxSlide = getMaxSlide();
    if (activeSlide < maxSlide) {
      setActiveSlide(prev => Math.min(prev + 1, maxSlide));
    } else if (currentPage < (totalPages || 1) && onPageChange) {
      onPageChange(currentPage + 1);
      setActiveSlide(0);
    } else {
      setActiveSlide(0);
    }
  }, [activeSlide, getMaxSlide, currentPage, totalPages, onPageChange]);

  const prevSlide = useCallback(() => {
    const maxSlide = getMaxSlide();
    if (activeSlide > 0) {
      setActiveSlide(prev => Math.max(prev - 1, 0));
    } else if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
      setActiveSlide(maxSlide);
    } else {
      setActiveSlide(maxSlide);
    }
  }, [activeSlide, getMaxSlide, currentPage, onPageChange]);

  const resetAutoplayTimer = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    if (isAutoPlaying) {
      autoplayTimerRef.current = setTimeout(() => {
        nextSlide();
      }, autoplaySpeed);
    }
  }, [isAutoPlaying, nextSlide, autoplaySpeed]);

  useEffect(() => {
    if (isAutoPlaying && !isDragging) {
      autoplayTimerRef.current = setTimeout(() => {
        nextSlide();
      }, autoplaySpeed);
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [activeSlide, isAutoPlaying, isDragging, autoplaySpeed, nextSlide]);

  const goToSlide = useCallback((index: number) => {
    const maxSlide = getMaxSlide();
    setActiveSlide(Math.min(index, maxSlide));
    resetAutoplayTimer();
  }, [getMaxSlide, resetAutoplayTimer]);

  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
  };

  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      
      const cardWidth = carouselRef.current?.offsetWidth 
        ? carouselRef.current.offsetWidth / slidesToShow 
        : 0;
      
      if (Math.abs(info.velocity.x) > 500) {
        if (info.velocity.x < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      } else if (Math.abs(info.offset.x) > cardWidth / 3) {
        if (info.offset.x < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      
      resetAutoplayTimer();
    },
    [slidesToShow, nextSlide, prevSlide, resetAutoplayTimer]
  );

  const visibleSlideGroups = Math.ceil(items.length / slidesToShow);
  const maxSlide = getMaxSlide();

  if (isLoading || localLoading) {
    return <CarouselSkeleton />;
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
      {title && (
        <div className={styles.carouselHeader}>
          <h2 className={styles.title}>{title}</h2>
          
          <div className={styles.carouselControls}>
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            )}
            
            <button 
              onClick={toggleAutoplay}
              className={styles.autoplayButton}
              aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
            >
              {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
        </div>
      )}

      <div className={styles.carouselWrapper}>
        <button
          onClick={prevSlide}
          className={`${styles.navButton} ${styles.prevButton}`}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <div 
          className={styles.carousel}
          ref={carouselRef}
        >
          <motion.div 
            className={styles.track}
            drag="x"
            dragConstraints={{ left: -(maxSlide * (100 / slidesToShow)), right: 0 }}
            dragElastic={0.1}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            animate={{ 
              x: `calc(-${activeSlide * (100 / slidesToShow)}%)` 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30, 
              restDelta: 0.01
            }}
          >
            {items.map((item) => (
              <div 
                key={`${item.id}-${isMovie(item) ? 'movie' : 'tv'}`}
                className={styles.slide}
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <MovieCarouselCard item={item} />
              </div>
            ))}
          </motion.div>
        </div>

        <button
          onClick={nextSlide}
          className={`${styles.navButton} ${styles.nextButton}`}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className={styles.paginationDots}>
        {Array.from({ length: visibleSlideGroups }).map((_, groupIndex) => {
          const dotPosition = groupIndex * slidesToShow;
          return (
            <button
              key={groupIndex}
              onClick={() => goToSlide(dotPosition)}
              className={`${styles.paginationDot} ${
                activeSlide >= dotPosition && activeSlide < dotPosition + slidesToShow
                  ? styles.activeDot
                  : ''
              }`}
              aria-label={`Go to slide group ${groupIndex + 1}`}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default MovieCarousel;