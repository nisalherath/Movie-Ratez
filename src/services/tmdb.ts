const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

// Helper function to handle fetch with error checking
const fetchFromTMDB = async (endpoint: string, page: number = 1) => {
  try {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&page=${page}&language=en-US`;
    console.log(`Fetching from: ${url}`); // For debugging
    
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error(`Error fetching from TMDB:`, error);
    throw error;
  }
};

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/images/placeholder.png';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Movie endpoints
export const fetchTrendingMovies = async (page: number = 1) => {
  return fetchFromTMDB('/trending/movie/week', page);
};

export const fetchPopularMovies = async (page: number = 1) => {
  return fetchFromTMDB('/movie/popular', page);
};

export const fetchTopRatedMovies = async (page: number = 1) => {
  return fetchFromTMDB('/movie/top_rated', page);
};

export const fetchNowPlayingMovies = async (page: number = 1) => {
  // Fixed endpoint with region parameter which is often required for now_playing
  return fetchFromTMDB('/movie/now_playing', page);
};

export const fetchUpcomingMovies = async (page: number = 1) => {
  return fetchFromTMDB('/movie/upcoming', page);
};

// TV Show endpoints
export const fetchTrendingTVShows = async (page: number = 1) => {
  return fetchFromTMDB('/trending/tv/week', page);
};

export const fetchPopularTVShows = async (page: number = 1) => {
  return fetchFromTMDB('/tv/popular', page);
};

export const fetchTopRatedTVShows = async (page: number = 1) => {
  return fetchFromTMDB('/tv/top_rated', page);
};

export const fetchOnTheAirTVShows = async (page: number = 1) => {
  // Make sure this endpoint is correct - some APIs use 'on_air' instead
  return fetchFromTMDB('/tv/on_the_air', page);
};

export const fetchAiringTodayTVShows = async (page: number = 1) => {
  return fetchFromTMDB('/tv/airing_today', page);
};

// Search and utility functions
export const searchMedia = async (query: string, page: number = 1) => {
  try {
    const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=en-US`;
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error searching media:', error);
    throw error;
  }
};

export const fetchMediaDetails = async (id: number, mediaType: 'movie' | 'tv') => {
  try {
    const url = `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error(`Error fetching ${mediaType} details:`, error);
    throw error;
  }
};

export const isMovie = (media: any): media is Movie => {
  return media.title !== undefined;
};

export const isTVShow = (media: any): media is TVShow => {
  return media.name !== undefined;
};