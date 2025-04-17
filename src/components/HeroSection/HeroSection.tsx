'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Play, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Movie } from '@/types/types';
import styles from './HeroSection.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function HeroSection({ movies }: { movies: Movie[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <section className={styles.hero}>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        autoplay={{ 
          delay: 5000, 
          disableOnInteraction: false 
        }}
        pagination={{
          clickable: true,
          bulletClass: styles.indicator,
          bulletActiveClass: styles.indicatorActive,
          el: `.${styles.indicators}`
        }}
        loop
        effect="fade"
        speed={1000}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className={styles.swiper}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id} className={styles.slide}>
            <div className={styles.backdrop}>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt=""
                className={styles.backdropImage}
              />
              <div className={styles.overlay}></div>
            </div>
            
            <AnimatePresence mode="wait">
              {activeIndex === index && (
                <div className={styles.content}>
                  <motion.div 
                    className={styles.contentInner}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.h2
                      className={styles.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {movie.title}
                    </motion.h2>
                    
                    <motion.div
                      className={styles.info}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <span className={styles.rating}>★ {movie.vote_average?.toFixed(1)}</span>
                      <span className={styles.year}>{movie.release_date?.slice(0, 4)}</span>
                      <span className={styles.type}>Movie</span>
                    </motion.div>
                    
                    <motion.p
                      className={styles.overview}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {movie.overview?.length > 200 ? `${movie.overview.slice(0, 200)}...` : movie.overview}
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <button className={styles.button}>
                        <Play size={18} className="mr-2" /> Watch Trailer
                      </button>
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className={styles.indicators}></div>
    </section>
  );
}