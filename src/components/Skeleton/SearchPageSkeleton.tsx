import { motion } from 'framer-motion';
import { SkeletonPulse } from './SkeletonPulse';
import styles from './Skeleton.module.css';

export const SearchPageSkeleton = () => {
  return (
    <div className={styles.pageContainer}>
      {/* Search title skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <SkeletonPulse 
          style={{ 
            height: '2.5rem', 
            width: '300px', 
            marginBottom: '1.5rem',
            borderRadius: '4px' 
          }} 
        />
        
        {/* Result count skeleton */}
        <SkeletonPulse 
          style={{ 
            height: '1rem', 
            width: '150px', 
            marginBottom: '2rem',
            borderRadius: '4px' 
          }} 
        />
        
        {/* Search results grid skeleton - fewer items initially */}
        <div className={styles.gridSkeleton}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className={styles.gridSkeletonItem}>
              <div className={styles.cardSkeleton}>
                <div className={styles.posterSkeleton}>
                  <SkeletonPulse className={styles.posterPulse} />
                </div>
                <div className={styles.cardInfoSkeleton}>
                  {/* Title skeleton */}
                  <SkeletonPulse style={{ height: '1rem', width: '90%', marginBottom: '0.5rem' }} />
                  
                  {/* Media type badge */}
                  <SkeletonPulse style={{ height: '0.8rem', width: '30%', marginBottom: '0.5rem' }} />
                  
                  {/* Year/info skeleton */}
                  <div className={styles.metaSkeleton}>
                    <SkeletonPulse style={{ height: '0.8rem', width: '40%' }} />
                    <SkeletonPulse style={{ height: '0.8rem', width: '30%' }} />
                  </div>
                </div>
                
                {/* Rating badge skeleton */}
                <div className={styles.ratingBadgeSkeleton}>
                  <SkeletonPulse style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};