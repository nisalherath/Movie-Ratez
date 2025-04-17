import { motion } from 'framer-motion';
import { SkeletonPulse } from './SkeletonPulse';
import styles from './Skeleton.module.css';

export const CarouselSkeleton = () => {
  // Create an array for carousel items
  const carouselItems = Array.from({ length: 5 }, (_, i) => i);
  
  return (
    <motion.div 
      className={styles.carouselSkeleton}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Skeleton */}
      <div className={styles.carouselHeaderSkeleton}>
        <SkeletonPulse className={styles.carouselTitleSkeleton} />
        <div className={styles.carouselControlsSkeleton}>
          <SkeletonPulse style={{ height: '1rem', width: '80px' }} />
          <SkeletonPulse style={{ height: '1rem', width: '30px', borderRadius: '50%' }} />
        </div>
      </div>
      
      {/* Carousel Track Skeleton */}
      <div className={styles.carouselTrackSkeleton}>
        <div className={styles.navButtonSkeleton}>
          <SkeletonPulse style={{ height: '100%', width: '100%', borderRadius: '50%' }} />
        </div>
        
        <div className={styles.slidesSkeleton}>
          {carouselItems.map((item) => (
            <motion.div 
              key={item} 
              className={styles.slideSkeleton}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: item * 0.05 }}
            >
              <div className={styles.slideInnerSkeleton}>
                <SkeletonPulse className={styles.slidePulse} />
                
                {/* Rating badge skeleton */}
                <div className={styles.ratingBadgeSkeleton}>
                  <SkeletonPulse />
                </div>
                
                {/* Random "NEW" badge on some slides */}
                {item % 3 === 0 && (
                  <div className={styles.ribbonSkeleton}>
                    <SkeletonPulse />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className={styles.navButtonSkeleton}>
          <SkeletonPulse style={{ height: '100%', width: '100%', borderRadius: '50%' }} />
        </div>
      </div>
      
      {/* Dots pagination skeleton */}
      <div className={styles.dotsPaginationSkeleton}>
        {Array.from({ length: 5 }, (_, i) => (
          <SkeletonPulse 
            key={i}
            style={{ 
              height: '8px', 
              width: '8px', 
              borderRadius: '50%',
              margin: '0 4px' 
            }} 
          />
        ))}
      </div>
    </motion.div>
  );
};