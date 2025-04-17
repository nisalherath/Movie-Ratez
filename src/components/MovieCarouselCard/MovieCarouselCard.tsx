import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { getImageUrl, isMovie } from '@/services/tmdb';
import { MediaItem } from '@/types/types';
import styles from './MovieCarouselCard.module.css';

interface MovieCarouselCardProps {
  item: MediaItem;
}

const MovieCarouselCard = ({ item }: MovieCarouselCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMovieItem = isMovie(item);
  const title = isMovieItem ? item.title : item.name;
  const posterPath = getImageUrl(item.poster_path);
  const mediaType = item.media_type || (isMovieItem ? 'movie' : 'tv');
  
  // Calculate rating class based on vote average
  const getRatingClass = (rating: number) => {
    if (rating >= 7) return styles.ratingHigh;
    if (rating >= 5) return styles.ratingMedium;
    return styles.ratingLow;
  };

  // Check if it's a new release (within 14 days)
  const isNewRelease = () => {
    const releaseDate = isMovieItem ? item.release_date : item.first_air_date;
    if (!releaseDate) return false;
    const releaseDay = new Date(releaseDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - releaseDay.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 14 && releaseDay <= today;
  };

  return (
    <div 
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/${mediaType}/${item.id}`}>
        <div className={styles.imageContainer}>
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          >
            <Image 
              src={posterPath}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.poster}
              priority={false}
            />
          </motion.div>
          
          <motion.div 
            className={`${styles.rating} ${getRatingClass(item.vote_average)}`}
          >
            <Star size={10} style={{ marginRight: '2px' }} />
            {item.vote_average.toFixed(1)}
          </motion.div>
          
          {isNewRelease() && (
            <div className={styles.ribbon}>NEW</div>
          )}
          
          {/* Overlay appears on hover */}
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.overlayContent}>
              <h3>{title}</h3>
              <p className={styles.genres}>
                {item.genre_ids?.slice(0, 2).map((genreId, i, arr) => (
                  <span key={genreId}>
                    {/* This would need a genre mapping function */}
                    {`Genre ${genreId}`}{i !== arr.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
              <div className={styles.watchNow}>
                Watch Now
              </div>
            </div>
          </motion.div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCarouselCard;