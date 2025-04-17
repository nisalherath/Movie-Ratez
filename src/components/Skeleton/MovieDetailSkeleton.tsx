import { motion } from 'framer-motion';
import { SkeletonPulse } from './SkeletonPulse';
import styles from './Skeleton.module.css';

export const MovieDetailSkeleton = () => {
  return (
    <motion.div 
      className={styles.detailSkeleton}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop skeleton */}
      <div className={styles.backdropSkeleton}>
        <SkeletonPulse className={styles.backdropPulse} />
      </div>
      
      <div className={styles.detailContentSkeleton}>
        {/* Poster and info container */}
        <div className={styles.detailInfoContainerSkeleton}>
          {/* Poster skeleton */}
          <div className={styles.detailPosterSkeleton}>
            <SkeletonPulse className={styles.posterDetailPulse} />
          </div>
          
          {/* Info skeleton */}
          <div className={styles.detailInfoSkeleton}>
            {/* Title */}
            <SkeletonPulse 
              style={{ 
                height: '2.5rem', 
                width: '80%', 
                marginBottom: '1rem' 
              }} 
            />
            
            {/* Metadata */}
            <div className={styles.metadataSkeleton}>
              <SkeletonPulse style={{ height: '1rem', width: '60px' }} />
              <SkeletonPulse style={{ height: '1rem', width: '40px' }} />
              <SkeletonPulse style={{ height: '1rem', width: '70px' }} />
            </div>
            
            {/* Rating */}
            <div className={styles.ratingSkeleton}>
              <SkeletonPulse 
                style={{ 
                  height: '3rem', 
                  width: '3rem', 
                  borderRadius: '50%',
                  marginRight: '1rem'
                }} 
              />
              <div>
                <SkeletonPulse style={{ height: '1rem', width: '100px', marginBottom: '0.5rem' }} />
                <SkeletonPulse style={{ height: '0.8rem', width: '80px' }} />
              </div>
            </div>
            
            {/* Genres */}
            <div className={styles.genresSkeleton}>
              {Array.from({ length: 3 }, (_, i) => (
                <SkeletonPulse 
                  key={i}
                  style={{ 
                    height: '1.8rem', 
                    width: `${60 + (i * 10)}px`,
                    borderRadius: '20px',
                    margin: '0 8px 8px 0'
                  }} 
                />
              ))}
            </div>
            
            {/* Overview */}
            <div className={styles.overviewSkeleton}>
              <SkeletonPulse style={{ height: '1.2rem', width: '150px', marginBottom: '1rem' }} />
              <SkeletonPulse style={{ height: '0.9rem', width: '100%', marginBottom: '0.5rem' }} />
              <SkeletonPulse style={{ height: '0.9rem', width: '95%', marginBottom: '0.5rem' }} />
              <SkeletonPulse style={{ height: '0.9rem', width: '98%', marginBottom: '0.5rem' }} />
              <SkeletonPulse style={{ height: '0.9rem', width: '90%' }} />
            </div>
            
            {/* Action buttons */}
            <div className={styles.actionButtonsSkeleton}>
              <SkeletonPulse 
                style={{ 
                  height: '2.5rem', 
                  width: '150px',
                  borderRadius: '2rem',
                  marginRight: '1rem'
                }} 
              />
              <SkeletonPulse 
                style={{ 
                  height: '2.5rem', 
                  width: '150px',
                  borderRadius: '2rem'
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};