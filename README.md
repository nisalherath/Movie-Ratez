# PALXIWatch - Movie & TV Show Discovery App

A modern web application built with Next.js, React, and TypeScript for browsing popular movies and TV shows using the TMDB API.

## Features

- Browse popular/trending movies
- Discover top-rated movies
- Explore popular/trending TV shows
- Find top-rated TV shows
- Search for movies and TV shows
- Responsive design for all screen sizes

## Tech Stack

- **Frontend Framework**: React 18
- **Meta Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- TMDB API key (get one from [themoviedb.org](https://www.themoviedb.org/documentation/api))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/palxi-watch.git
   cd palxi-watch
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the project root and add your TMDB API key:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

### Development

Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

Build the application for production:
```bash
npm run build
# or
yarn build
```

Start the production server:
```bash
npm start
# or
yarn start
```

## Project Structure

```
palxi-watch/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── movies/
│   │   │   ├── popular/
│   │   │   └── top-rated/
│   │   ├── tv/
│   │   │   ├── popular/
│   │   │   └── top-rated/
│   │   ├── search/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── HeroSection/
│   │   ├── MovieCard/
│   │   ├── MovieGrid/
│   │   └── Navbar/
│   ├── services/
│   │   └── tmdb.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   └── types/
│       └── types.ts
├── .env.local
├── package.json
└── README.md
```

## Pages

- **Home (/)**: Landing page with trending movies and shows
- **Movies**
  - **/movies/popular**: Popular and trending movies
  - **/movies/top-rated**: Top-rated movies
- **TV Shows**
  - **/tv/popular**: Popular and trending TV shows
  - **/tv/top-rated**: Top-rated TV shows
- **Search (/search)**: Search results for movies and TV shows

## API Integration

This project uses the TMDB API for fetching movie and TV show data. The API service functions are located in `src/services/tmdb.ts`.

## Deployment

This is a Next.js application that can be deployed to various platforms:

- **Vercel** (recommended): Simply connect your GitHub repository to Vercel and deploy.
- **Netlify**: Can also be deployed to Netlify with minimal configuration.
- **Self-hosted**: Build the application and serve the output from the `.next` directory.

## License

This project is for educational purposes and is not affiliated with TMDB.

## Acknowledgements

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [Next.js](https://nextjs.org/) for the framework
- [React](https://reactjs.org/) for the UI library

---

This project was created as part of a coding exercise for Palxi.