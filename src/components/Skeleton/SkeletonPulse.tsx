import { motion } from 'framer-motion';
import styles from './Skeleton.module.css';

interface SkeletonPulseProps {
  className?: string;
  style?: React.CSSProperties;
}

export const SkeletonPulse = ({ className, style }: SkeletonPulseProps) => {
  return (
    <motion.div
      className={`${styles.skeletonPulse} ${className || ''}`}
      style={style}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ 
        repeat: Infinity, 
        duration: 1.5, 
        ease: "easeInOut" 
      }}
    />
  );
};
