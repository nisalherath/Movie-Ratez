import { motion } from 'framer-motion';
import { SkeletonPulse } from './SkeletonPulse';
import styles from './Skeleton.module.css';

export const PageSkeleton = () => {
  return (
    <div className={styles.pageContainer}>
      {/* Page title skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <SkeletonPulse 
          style={{ 
            height: '2.5rem', 
            width: '250px', 
            marginBottom: '1.5rem',
            borderRadius: '4px' 
          }} 
        />
        
        {/* Result count skeleton */}
        <SkeletonPulse 
          style={{ 
            height: '1rem', 
            width: '180px', 
            marginBottom: '2rem',
            borderRadius: '4px' 
          }} 
        />
        
        {/* Grid skeleton */}
        <div className={styles.gridSkeleton}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={styles.gridSkeletonItem}>
              <div className={styles.cardSkeleton}>
                <div className={styles.posterSkeleton}>
                  <SkeletonPulse className={styles.posterPulse} />
                </div>
                <div className={styles.cardInfoSkeleton}>
                  {/* Title skeleton */}
                  <SkeletonPulse style={{ height: '1rem', width: '90%', marginBottom: '0.5rem' }} />
                  
                  {/* Year/type skeleton */}
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
          
          {/* Pagination skeleton */}
          <div className={styles.paginationSkeleton}>
            {Array.from({ length: 5 }, (_, i) => (
              <SkeletonPulse 
                key={i}
                style={{ 
                  height: '36px', 
                  width: '36px', 
                  borderRadius: '50%',
                  margin: '0 5px' 
                }} 
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};