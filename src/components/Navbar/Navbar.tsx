'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import styles from './Navbar.module.css';
import MovieRatez from "../Logo";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const lastScrollY = useRef(0);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if window is defined (client-side) before accessing it
    if (typeof window !== 'undefined') {
      // Initial check for mobile viewport
      setIsMobile(window.innerWidth <= 1024);
      
      // Set up scroll event listener with improved handling
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        // Determine if scrolled for styling
        setIsScrolled(currentScrollY > 50);
        
        // Only hide navbar when menu and search are closed
        if (!isMenuOpen && !isSearchOpen) {
          // Control navbar visibility based on scroll direction
          if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
            // Scrolling down & past initial threshold - hide navbar
            setIsVisible(false);
          } else {
            // Scrolling up or at the top - show navbar
            setIsVisible(true);
          }
        }
        
        // Update the scroll position
        lastScrollY.current = currentScrollY;
      };
      
      // Set up resize event listener
      const handleResize = () => {
        const mobile = window.innerWidth <= 1024;
        setIsMobile(mobile);
        if (!mobile) {
          setIsSearchOpen(false); // Reset search state when going to desktop
          setIsMenuOpen(false);   // Reset menu state when going to desktop
          document.body.style.overflow = ''; // Ensure body scroll is enabled when resizing to desktop
        }
      };
      
      // Handle clicks outside navbar to close menu
      const handleClickOutside = (event: MouseEvent) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
          if (isMenuOpen) {
            setIsMenuOpen(false);
            document.body.style.overflow = ''; // Re-enable scrolling
          }
          if (isSearchOpen) {
            setIsSearchOpen(false);
          }
        }
      };
      
      // Use passive listener for better scroll performance
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);
      document.addEventListener('mousedown', handleClickOutside);
      
      // Clean up event listeners
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = ''; // Ensure body scroll is enabled on unmount
      };
    }
  }, [isMenuOpen, isSearchOpen]);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Lock body scroll when menu is open on mobile
  useEffect(() => {
    if (isMobile) {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      } else {
        document.body.style.overflow = ''; // Allow scrolling
      }
    }
    
    // Always show navbar when menu is open
    if (isMenuOpen || isSearchOpen) {
      setIsVisible(true);
    }
    
    return () => {
      document.body.style.overflow = ''; // Cleanup
    };
  }, [isMenuOpen, isSearchOpen, isMobile]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      if (isMobile) {
        setIsSearchOpen(false);
      }
    }
  };

  const toggleDropdown = (id: string) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
  };

  const handleNavLinkClick = () => {
    // Close menu after navigation on mobile
    if (isMobile) {
      setIsMenuOpen(false);
      setActiveDropdown(null);
      document.body.style.overflow = ''; // Re-enable scrolling
    }
  };

  const navbarClass = `${styles.navbar} ${isScrolled ? styles.scrolled : ''}`;
  const navLinksClass = `${styles.navLinks} ${isMenuOpen ? styles.open : ''}`;
  const searchFormClass = `${styles.searchForm} ${isSearchOpen ? styles.searchOpen : ''}`;

  return (
    <>
      {/* Overlay for mobile menu */}
      {isMobile && isMenuOpen && (
        <div className={styles.menuOverlay} onClick={() => setIsMenuOpen(false)} />
      )}
    
      <motion.nav 
        ref={navbarRef}
        className={navbarClass}
        initial={{ y: -100 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={handleNavLinkClick}>
            <MovieRatez size="small" />
              MOVIE<span>ratez</span>
        </Link>
          
          <div className={navLinksClass}>
            <div className={`${styles.dropdown} ${activeDropdown === 'movies' ? styles.active : ''}`}>
              <button 
                className={styles.dropbtn} 
                onClick={() => toggleDropdown('movies')}
              >
                Movies
                <ChevronDown size={16} style={{ marginLeft: '4px' }} />
              </button>
              <AnimatePresence>
                {(activeDropdown === 'movies' || !isMobile) && (
                  <motion.div 
                    className={styles.dropdownContent}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href="/movies/popular" onClick={handleNavLinkClick}>Popular</Link>
                    <Link href="/movies/top-rated" onClick={handleNavLinkClick}>Top Rated</Link>
                    <Link href="/movies/upcoming" onClick={handleNavLinkClick}>Upcoming</Link>
                    <Link href="/movies/now-playing" onClick={handleNavLinkClick}>Now Playing</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className={`${styles.dropdown} ${activeDropdown === 'tv' ? styles.active : ''}`}>
              <button 
                className={styles.dropbtn}
                onClick={() => toggleDropdown('tv')}
              >
                TV Shows
                <ChevronDown size={16} style={{ marginLeft: '4px' }} />
              </button>
              <AnimatePresence>
                {(activeDropdown === 'tv' || !isMobile) && (
                  <motion.div 
                    className={styles.dropdownContent}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href="/tv/popular" onClick={handleNavLinkClick}>Popular</Link>
                    <Link href="/tv/top-rated" onClick={handleNavLinkClick}>Top Rated</Link>
                    <Link href="/tv/on-the-air" onClick={handleNavLinkClick}>On TV</Link>
                    <Link href="/tv/airing-today" onClick={handleNavLinkClick}>Airing Today</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className={styles.rightActions} id='search-flex'>
            <AnimatePresence>
              {(isSearchOpen && isMobile) && (
                <motion.form 
                  onSubmit={handleSearch} 
                  className={searchFormClass}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search movies & TV shows..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                  <button type="submit" className={styles.searchButton}>
                    <Search size={16} />
                  </button>
                  <button 
                    type="button" 
                    className={styles.closeSearchButton}
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X size={16} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            
            {/* Desktop search form or mobile search button */}
            {(!isMobile || !isSearchOpen) && (
              <>
                {!isMobile && (
                  <form onSubmit={handleSearch} className={searchFormClass}>
                    <input
                      type="text"
                      placeholder="Search movies & TV shows..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                      <Search size={16} />
                      <span className={styles.searchButtonText}>Search</span>
                    </button>
                  </form>
                )}
                
                {isMobile && (
                  <button 
                    className={styles.mobileSearchBtn}
                    onClick={toggleSearch}
                    aria-label="Open search"
                  >
                    <Search size={20} />
                  </button>
                )}
                
                {/* Mobile Only Render */}
                {isMobile && (
                  <button 
                    className={styles.mobileMenuBtn}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;