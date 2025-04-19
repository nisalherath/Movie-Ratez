import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, CalendarDays, Film, Tv } from 'lucide-react';
import { getImageUrl, isMovie } from '@/services/tmdb';
import { mapGenreIdsToNames } from '@/services/genre';
import { MediaItem } from '@/types/types';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  item: MediaItem;
}

// get title and date
const getTitle = (item: MediaItem): string => {
  if (item.name) return item.name;
  return item.title || 'Unknown Title';
};

//get releae date
const getReleaseDate = (item: MediaItem): string => {
  return item.media_type === 'tv' || (!item.media_type && item.first_air_date) 
    ? (item.first_air_date || '') 
    : (item.release_date || '');
};

//get type of media
const getMediaType = (item: MediaItem): 'movie' | 'tv' => {
  if (item.media_type) return item.media_type;
  return isMovie(item) ? 'movie' : 'tv';
};

// format the rating and returning it
const formatRating = (rating: number | undefined | null): string => {
  if (rating === undefined || rating === null) {
    return 'N/A';
  }
  return rating.toFixed(1);
};

const MovieCard = ({ item }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const title = getTitle(item);
  const releaseDate = getReleaseDate(item);
  const formattedDate = releaseDate ? new Date(releaseDate).getFullYear() : 'Unknown';
  const posterPath = getImageUrl(item.poster_path);
  const mediaType = getMediaType(item);
  const isMovieItem = mediaType === 'movie';
  
  // New Released in the last Two Weeks
  const isNewRelease = () => {
    if (!releaseDate) return false;
    const releaseDay = new Date(releaseDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - releaseDay.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 14 && releaseDay <= today;
  };
  
  // Rating Calc with null safety
  const getRatingClass = (rating: number | undefined | null) => {
    if (rating === undefined || rating === null) return styles.ratingLow;
    if (rating >= 7) return styles.ratingHigh;
    if (rating >= 5) return styles.ratingMedium;
    return styles.ratingLow;
  };

  // Map genre IDs to names using our utility function
  // we need to make sure genre_ids is neva null or returns a string of numbers(sometimes the number value returns, thats why)
  // in genre service
  const genreNames = mapGenreIdsToNames(
    item.genre_ids || [], 
    mediaType
  );

  return (
    <motion.div 
      className={styles.card}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/${mediaType}/${item.id}`}>
        <div className={styles.imageContainer}>
          <Image 
            src={posterPath}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.poster}
            priority={false}
          />
          
          <motion.div 
            className={`${styles.rating} ${getRatingClass(item.vote_average)}`}
          >
            <Star size={10} style={{ marginRight: '2px' }} />
            {formatRating(item.vote_average)}
          </motion.div>
          
          {isNewRelease() && (
            <div className={styles.ribbon}>NEW</div>
          )}
          
          {/* When hover, show the Overlay of details */}
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.overlayContent}>
              <h3>{title}</h3>
              <p className={styles.genres}>
                {genreNames.slice(0, 2).map((genreName, i, arr) => (
                  <span key={i}>
                    {genreName}{i !== arr.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
              <div className={styles.details}>
                <div>
                  <CalendarDays size={14} />
                  <span>{formattedDate}</span>
                </div>
                <div>
                  {isMovieItem ? <Film size={14} /> : <Tv size={14} />}
                  <span>{isMovieItem ? 'Movie' : 'TV'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.year}>{formattedDate}</div>
          <div className={styles.type}>{mediaType === 'movie' ? 'Movie' : 'TV Show'}</div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;