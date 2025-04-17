import { motion } from 'framer-motion';
import { SkeletonPulse } from './SkeletonPulse';
import styles from './Skeleton.module.css';

export const HeroSkeleton = () => {
  return (
    <motion.div 
      className={styles.heroSkeleton}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.heroBackdropSkeleton}>
        <SkeletonPulse className={styles.heroBackdropPulse} />
        
        <div className={styles.heroContentSkeleton}>
          <motion.div 
            className={styles.heroContentInnerSkeleton}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Title skeleton */}
            <SkeletonPulse 
              style={{ 
                height: '3rem', 
                width: '70%', 
                maxWidth: '500px',
                marginBottom: '1rem'
              }} 
            />
            
            {/* Info line skeleton */}
            <div className={styles.heroInfoSkeleton}>
              <SkeletonPulse style={{ height: '1rem', width: '60px' }} />
              <SkeletonPulse style={{ height: '1rem', width: '40px' }} />
              <SkeletonPulse style={{ height: '1rem', width: '50px' }} />
            </div>
            
            {/* Overview paragraph skeleton */}
            <div className={styles.heroOverviewSkeleton}>
              <SkeletonPulse style={{ height: '0.8rem', width: '100%', marginBottom: '0.5rem' }} />
              <SkeletonPulse style={{ height: '0.8rem', width: '95%', marginBottom: '0.5rem' }} />
              <SkeletonPulse style={{ height: '0.8rem', width: '90%', marginBottom: '0.5rem' }} />
              <SkeletonPulse style={{ height: '0.8rem', width: '60%' }} />
            </div>
            
            {/* Button skeleton */}
            <SkeletonPulse 
              style={{ 
                height: '2.5rem', 
                width: '180px',
                borderRadius: '2rem',
                marginTop: '1.5rem'
              }} 
            />
          </motion.div>
        </div>
      </div>
      
      {/* Indicators skeleton */}
      <div className={styles.heroIndicatorsSkeleton}>
        {Array.from({ length: 5 }, (_, i) => (
          <SkeletonPulse 
            key={i}
            style={{ 
              height: '10px', 
              width: '10px', 
              borderRadius: '50%',
              margin: '0 5px' 
            }} 
          />
        ))}
      </div>
    </motion.div>
  );
};