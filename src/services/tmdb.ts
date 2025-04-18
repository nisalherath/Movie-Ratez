import { Movie, TvShow, MediaItem } from '@/types/types';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

// Helper function to validate response data
const validateMediaItem = (item: any): any => {
  return {
    ...item,
    vote_average: item.vote_average ?? 0,
    genre_ids: item.genre_ids || [],
    poster_path: item.poster_path || null,
    backdrop_path: item.backdrop_path || null
  };
};

// Fetch from TMDB with improved error handling
const fetchFromTMDB = async (endpoint: string, page: number = 1) => {
  try {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&page=${page}&language=en-US`;
    console.log(`Fetching from: ${url}`);
    
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    
    // Validate results to prevent undefined values
    if (data && data.results) {
      data.results = data.results.map(validateMediaItem);
    }
    
    return data;
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
  // Fixed endpoint to match API
  return fetchFromTMDB('/tv/on_the_air', page);
};

export const fetchAiringTodayTVShows = async (page: number = 1) => {
  return fetchFromTMDB('/tv/airing_today', page);
};

// Search with improved error handling
export const searchMedia = async (query: string, page: number = 1) => {
  try {
    if (!query.trim()) {
      // Return empty results if query is empty
      return {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0
      };
    }
    
    const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=en-US`;
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    
    // Validate results to prevent undefined values
    if (data && data.results) {
      data.results = data.results.map(validateMediaItem);
    }
    
    return data;
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
    
    const data = await res.json();
    return validateMediaItem(data);
  } catch (error) {
    console.error(`Error fetching ${mediaType} details:`, error);
    throw error;
  }
};

// Type guards
export const isMovie = (media: Movie | TvShow | MediaItem): media is Movie => {
  return media && typeof (media as Movie).title !== 'undefined';
};

export const isTVShow = (media: Movie | TvShow | MediaItem): media is TvShow => {
  return media && typeof (media as TvShow).name !== 'undefined';
};