'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Mail, ChevronUp } from 'lucide-react';
import styles from './Footer.module.css';
import MovieRatez from "../Logo";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  {/*Scroll to Tp Button Logic*/}
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
        <div className={styles.footerLogo}>
          <MovieRatez size="medium" />
          MOVIE<span>ratez</span>
        </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h3>Discover</h3>
              <Link href="/movies/popular">Popular Movies</Link>
              <Link href="/movies/top-rated">Top Rated Movies</Link>
              <Link href="/movies/upcoming">Upcoming Movies</Link>
              <Link href="/movies/now-playing">Now Playing</Link>
            </div>

            <div className={styles.linkColumn}>
              <h3>TV Shows</h3>
              <Link href="/tv/popular">Popular Shows</Link>
              <Link href="/tv/top-rated">Top Rated Shows</Link>
              <Link href="/tv/on-the-air">On TV</Link>
              <Link href="/tv/airing-today">Airing Today</Link>
            </div>

            <div className={styles.linkColumn}>
              <h3>About</h3>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.socialLinks}>
            <a href="https://github.com/nisalherath/Movie-Ratez" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="mailto:nisal@nisal.lk" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>

          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} Made with ❤️ by <a href="https://nisal.lk/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              Nisal.
            </a>{" "} <br></br>
             All rights reserved.
          </div>
        </div>
      </div>

      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={styles.scrollTopButton}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;