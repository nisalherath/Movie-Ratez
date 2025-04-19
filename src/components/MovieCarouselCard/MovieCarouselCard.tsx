import React from 'react';
import Image from 'next/image';
import { MediaItem } from '@/types/types';
import styles from './MovieCarouselCard.module.css';
import { mapGenreIdsToNames } from '@/services/genre';

interface MovieCarouselCardProps {
  item: MediaItem;
  onClick?: (item: MediaItem) => void;
}

// get title and date
// I ran into a problem where the Movie Type and the TV type would get mumbo Jumbod
const getTitle = (item: MediaItem): string => {
  return item.media_type === 'tv' ? item.name! : item.title || '';
};

//get releae date
const getReleaseDate = (item: MediaItem): string => {
  return item.media_type === 'tv' ? item.first_air_date! : item.release_date || '';
};

// format the rating and returning it
const getRatingClass = (rating: number): string => {
  if (rating >= 7.5) return styles.ratingHigh;
  if (rating >= 6) return styles.ratingMedium;
  return styles.ratingLow;
};

//get new releases
const isNewRelease = (dateString: string): boolean => {
  if (!dateString) return false;
  const releaseDate = new Date(dateString);
  const now = new Date();
  // released in the last 30 days
  return (now.getTime() - releaseDate.getTime()) < (30 * 24 * 60 * 60 * 1000);
};

  // Map genre IDs to names using our utility function
  // we need to make sure genre_ids is neva null or returns a string of numbers(sometimes the number value returns, thats why)
const formatGenres = (genreIds: number[], mediaType: 'movie' | 'tv'): string => {
  // This method is in genre service
  const genreNames = mapGenreIdsToNames(genreIds, mediaType);
  return genreNames.slice(0, 3).join(', ');
};

const MovieCarouselCard: React.FC<MovieCarouselCardProps> = ({ item, onClick }) => {
  const title = getTitle(item);
  const releaseDate = getReleaseDate(item);
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  const mediaType = item.media_type || 'movie'; // Default to 'movie' if media_type is undefined
  
  return (
    <div 
      className={styles.card}
      onClick={() => onClick && onClick(item)}
    >
      <div className={styles.imageContainer}>
        {item.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={title}
            fill
            className={styles.poster}
            priority={false}
          />
        ) : (
          <div className={styles.noPoster}>No Image Available</div>
        )}
        
        {/* Rating on Movie/TV card */}
        <div className={`${styles.rating} ${getRatingClass(item.vote_average)}`}>
          ★ {item.vote_average.toFixed(1)}
        </div>
        
        {/*ribbon on Movie/TV card*/}
        {isNewRelease(releaseDate) && (
          <div className={styles.ribbon}>NEW</div>
        )}
        
        {/* Information on Movie/TV card*/}
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <h3>{title} {year && `(${year})`}</h3>
            <div className={styles.genres}>
              {formatGenres(item.genre_ids, mediaType)}
            </div>
            <div className={styles.watchNow}>Watch Now</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCarouselCard;