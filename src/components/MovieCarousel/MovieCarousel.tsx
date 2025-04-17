'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
  autoplaySpeed = 5000 // Speed of the autoplay
}: MovieCarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle responsive slidesToShow based on screen width
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
  
  // Add artificial delay to show skeleton
  useEffect(() => {
    // If parent component already handles loading state, respect it
    if (isLoading) {
      setLocalLoading(true);
      return;
    }
    
    const timer = setTimeout(() => {
      setLocalLoading(false);
    }, 2000); // 2 second delay
    
    return () => clearTimeout(timer);
  }, [isLoading, items]);

  // Calculate maximum number of slides
  // when dealing with multiple movie cards, the size of the movie card and the card count changes , cause you can only fit some of the cards on screen
  const maxSlide = Math.max(0, items.length - slidesToShow);

  // Autoplay
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
  }, [activeSlide, isAutoPlaying, isDragging, autoplaySpeed]);

  // Navigation
  const nextSlide = () => {
    if (activeSlide < maxSlide) {
      setActiveSlide(prev => Math.min(prev + 1, maxSlide));
    } else if (currentPage < (totalPages || 1) && onPageChange) {
      onPageChange(currentPage + 1);
      setActiveSlide(0);
    } else {
      // Loop back
      setActiveSlide(0);
    }
  };

  const prevSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(prev => Math.max(prev - 1, 0));
    } else if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
      // Set to last slide
      setActiveSlide(maxSlide);
    } else {
      // Loop to the end
      setActiveSlide(maxSlide);
    }
  };

  const goToSlide = (index: number) => {
    setActiveSlide(Math.min(index, maxSlide));
    resetAutoplayTimer();
  };

  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const resetAutoplayTimer = () => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    if (isAutoPlaying) {
      autoplayTimerRef.current = setTimeout(() => {
        nextSlide();
      }, autoplaySpeed);
    }
  };

  // Drag handlers on mobile or mouse drag
  const handleDragStart = () => {
    setIsDragging(true);
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
  };

  const handleDragEnd = (info: any) => {
    setIsDragging(false);
    
    // Calculate which slide to snap
    // I wanted to have some snap to the slide changings.
    const cardWidth = carouselRef.current?.offsetWidth ? carouselRef.current.offsetWidth / slidesToShow : 0;
    
    if (Math.abs(info.velocity.x) > 500) {
      // Fast swipe
      if (info.velocity.x < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else if (Math.abs(info.offset.x) > cardWidth / 3) {
      // Slow
      if (info.offset.x < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    resetAutoplayTimer();
  };

  const visibleSlideGroups = Math.ceil(items.length / slidesToShow);

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
            dragConstraints={{ left: -(maxSlide * (100 / slidesToShow)) + '%', right: 0 }}
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
            {items.map((item, index) => (
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

      {/* Pagination dots */}
      <div className={styles.paginationDots}>
        {Array.from({ length: visibleSlideGroups }).map((_, index) => {
          const dotPosition = index * slidesToShow;
          return (
            <button
              key={index}
              onClick={() => goToSlide(dotPosition)}
              className={`${styles.paginationDot} ${
                activeSlide >= dotPosition && activeSlide < dotPosition + slidesToShow
                  ? styles.activeDot
                  : ''
              }`}
              aria-label={`Go to slide group ${index + 1}`}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default MovieCarousel;