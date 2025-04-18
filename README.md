***

<div align="center">

# `🍿Movie Ratez🍿`


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Next.js](https://img.shields.io/badge/Next.js-13.5-blue)
![React](https://img.shields.io/badge/React-18.2-blue)
![Made with TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

#### `A modern movie database application built with Next.js and TypeScript, powered by TMDB API.`

  <a href="https://movies.nisal.lk" target="_blank" rel="noopener noreferrer">
    <img src="https://res.cloudinary.com/dlnhogbjy/image/upload/v1744914525/movieratez_i9sm1w.png" width="100" height="100" style="border-radius: 15px;" alt="Visit Nisal.lk" />
  </a>

</div>



<br><br><br>





***

# Getting Started 🎬
<br>

***


### - [🍿 Project Overview](#project-overview-%EF%B8%8F)
### - [🍿 User Interface](#%EF%B8%8F-user-interface-%EF%B8%8F)
### - [🍿 Dependencies](#dependencies-%EF%B8%8F)
### - [🍿 How To Run](#how-to-run-this-project-%EF%B8%8F)
### - [🍿 File Structure](#file-structure-%EF%B8%8F)
### - [🍿 License](#license-)


***



# Project Overview 📽️

## `Some early, Low-Fidelity Prototypes`
## `1. HomePage 📽️`

<div align="center">
  <a href="https://movies.nisal.lk" target="_blank" rel="noopener noreferrer">
    <img src="https://res.cloudinary.com/dlnhogbjy/image/upload/v1744929467/moviehome_pboavt.webp"  style="border-radius: 15px;" alt="Visit Nisal.lk" />
  </a>
</div>

***
## `2. Movie/TV - Page/Grid 📽️`

<div align="center">
  <a href="https://movies.nisal.lk" target="_blank" rel="noopener noreferrer">
    <img src="https://res.cloudinary.com/dlnhogbjy/image/upload/v1744929467/moviegrid_os84xs.webp"  style="border-radius: 15px;" alt="Visit Nisal.lk" />
  </a>
</div>


<hr>
<br><br><br><br><br><br><br><br>


***


#  📽️ User Interface 📽️

<br>
<hr>



## `1. Hero Section with Trending Movies 📽️`

<div align="center">
  <a href="https://movies.nisal.lk" target="_blank" rel="noopener noreferrer">
    <img src="./public/demo1.gif"  style="border-radius: 15px;" alt="Visit Nisal.lk" />
  </a>
</div>

<hr>
<br><br><br>

***

## `2. Movie / TV Show Grid 📽️`

<div align="center">
  <a href="https://movies.nisal.lk" target="_blank" rel="noopener noreferrer">
    <img src="./public/demo2.gif"  style="border-radius: 15px;" alt="Visit Nisal.lk" />
  </a>
</div>

<hr>

<br><br><br>

***

## `3. Search Movies / TV Shows 📽️`

<div align="center">
  <a href="https://movies.nisal.lk" target="_blank" rel="noopener noreferrer">
    <img src="./public/demo3.gif"  style="border-radius: 15px;" alt="Visit Nisal.lk" />
  </a>
</div>

<hr>


<br><br><br>

***

## `4. Responsive Design 📽️`

<div align="center">
  <a href="https://movies.nisal.lk" target="_blank" rel="noopener noreferrer">
    <img src="./public/demo4.gif" width="250" style="border-radius: 15px;" alt="Visit Nisal.lk" />
  </a>
</div>

<hr>

<br><br><br>
<hr>


# Dependencies 📽️

### `To run this project, you need to install the following npm Packages:`

### - `axios`: 
#### For fetching Data from TMDB.
### - `netlify`:
#### For a typical Local Project, you would just run it as ``` npm run dev ``` but I've chosen Netlify cli to help with the Hosting on `Netlify Hosting Platform`  .
### - `Framer` : 
#### For Animations used on the Web Page Elements.
### - `Swiper` : 
#### Used in Ever Carousel of this Project.
### - `Lenis` : 
#### For Silky Smooth Scrolling on the Site.
### - `lucide-react` : 
#### For the Icons Used in the Project.
### - `prettier` : 
#### For keeping the codes in the Project, Organized.

<br><br>
***


# How to Run This Project 📽️

### `Follow these steps to get the movie app up and running on your local machine:`

### Minimal Requirements
`- Node.js v18 or higher` <br>
`- npm v9 or higher`<br>
`- TMDB API key` ( [Get it here](https://www.themoviedb.org/settings/api) )

<br><br>
***

## Installation Guide

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/movie-ratez.git
```


2. **You can install the required `npm` packages using:**
```bash
npm install 
```
### `or`

```bash
npm install axios netlify-cli framer-motion swiper @studio-freight/lenis lucide-react prettier
```

3. **Set up environment variables**<br>
   create a `.env.local` file in the root directory and add these into that.
```bash
NEXT_PUBLIC_TMDB_API_KEY=Your_API_Key
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

4. **Start development server**
```bash
netlify dev
```
5. **Open the Browser and Visit**<br>
```bash
http://localhost:8888/
```

<br><br><br><br><br><br>
<hr>

# File Structure 📽️

## `The project directory is structured as follows:`

```
movie-ratez/
├── .env.local # Environment variables
├──────── public/
│                ├── movieratez.ai  # The Illustrator file that containes the designed Logo
│                └── images/        # Static assets
├──────── src/
│          ├── app/
│          │       ├── layout.tsx # Root layout component
│          │       ├── page.tsx # Homepage
│          │       ├── movies/
│          │       │       ├── popular/
│          │       │       │      └── page.tsx    # Popular Movies page
│          │       │       ├── top-rated/
│          │       │       │       └── page.tsx   # Top-rated Movies page
│          │       │       ├── nowplaying/
│          │       │       │       └── page.tsx   # Now Playing Movies page
│          │       │       ├── upcoming/
│          │       │               └── page.tsx   # Upcoming Movies page
│          │       ├── tv/
│          │       │       ├── popular/
│          │       │       │      └── page.tsx    # Popular TV Shows page
│          │       │       ├── top-rated/
│          │       │       │       └── page.tsx   # Top-rated TV Shows page
│          │       │       ├── airing-today/
│          │       │       │       └── page.tsx   # Airing Today TV Shows page
│          │       │       ├── on-tv/
│          │       │               └── page.tsx   # On-Tv TV Shows page
│          │       └── search/
│          │               ├── MoviePage.module.css  # Styles for Search Page
│          │               └── page.tsx              # Search page
│          │
│          │  
│          ├── components/
│          │        ├── HeroSection/
│          │        │              ├── HeroSection.tsx              # Swiper hero component
│          │        │              └── HeroSection.module.css       # Hero section styles
│          │        ├── MovieCard/
│          │        │              ├── MovieCard.tsx                # Movie card component
│          │        │              └── MovieCard.module.css         # Card specific styles
│          │        ├── MovieGrid/
│          │        │              ├── MovieGrid.tsx                # Grid layout component
│          │        │              └── MovieGrid.module.css         # Grid styles
│          │        ├── MovieCarousel/
│          │        │              ├── MovieCarousel.tsx            # Movie carousel component
│          │        │              └── MovieCarousel.module.css     # Carousel specific styles
│          │        ├── MovieCarouselCard/
│          │        │              ├── MovieCarouselCard.tsx        # Movie carousel Card component
│          │        │              └── MovieCarouselCard.module.css # Carousel Card specific styles
│          │        ├── Footer/
│          │        │              ├── Footer.tsx                   # Footer Component
│          │        │              └── Footer.module.css            # Footer specific styles
│          │        ├── LenisProvider/
│          │        │              ├── LenisProvider.tsx            # LenisProvider for Scrolling
│          │        │  
│          │        ├── MovieAndTv/
│          │        │              ├── MovieAndTv.tsx               # MovieAndTv layout component for page rendering
│          │        │              └── MovieAndTv.module.css        # MovieAndTv styles
│          │        ├── Skeleton/
│          │        │              ├── CarouselSkeleton.tsx         # Carousel Skeleton
│          │        │              ├── HeroSkeleton.tsx             # Hero Section Skeleton
│          │        │              ├── MovieDetailSkeleton.tsx      # Movie Card Skeleton
│          │        │              ├── PageSkeleton.tsx             # Page Skeleton for Movie/Tv Pages
│          │        │              ├── SearchPageSkeleton.tsx       # Search Page Skeleton
│          │        │              └── Skeletom.module.css          # Skeleton styles
│          │        ├── Navbar/
│          │        │              ├── Navbar.tsx # Navigation component
│          │        │              └── Navbar.module.css # Navbar styles
│          │        │  
│          │        │  
│          │        ├── Logo.tsx         # Logo SVG
│          │        └── Logo.module.css  # Logo svg styles
│          │
│          │                       
│          ├── services/
│          │        ├── genre.ts     # Genre service functions for movie and tv
│          │        └── tmdb.ts      # TMDB API service functions
│          ├── types/
│          │        └── types.ts     # TypeScript interfaces
│          └── styles/
│                    ├── globals.css # Global CSS styles
│                    └── variables.css # CSS custom properties
│
├──────── README.md    # Documentation
│ 
└──────── package.json # Project dependencies
```
***

<br><br><br>

***

##  `Key Files Explained`
<br>

| File / Folder                                | Purpose                                                               |
|---------------------------------------------|-----------------------------------------------------------------------|
| `.env.local`                                 | Environment variables (e.g., API keys for TMDB)                       |
| `public/images/`                             | Folder for static assets like logos, posters, or placeholders         |
| `src/app/layout.tsx`                         | Root layout wrapper applied to all pages                              |
| `src/app/page.tsx`                           | Main landing page of the app                                          |
| `src/app/movies/[category]/page.tsx`         | Pages for various movie categories: Popular, Top-rated, Now Playing   |
| `src/app/tv/[category]/page.tsx`             | Pages for TV show categories: Popular, Top-rated, Airing Today, On-TV |
| `src/app/search/page.tsx`                    | Search results page for movies and TV shows                           |
| `src/app/search/MoviePage.module.css`        | Scoped CSS styles for the search page                                 |
| `src/components/HeroSection/`                | Swiper-based Hero section with related styles                         |
| `src/components/MovieCard/`                  | Reusable card component for movie display                             |
| `src/components/MovieGrid/`                  | Grid layout wrapper for cards                                         |
| `src/components/MovieCarousel/`              | Horizontal movie swiper component                                     |
| `src/components/MovieCarouselCard/`          | Carousel's individual card component                                  |
| `src/components/Footer/`                     | Website footer and its styling                                        |
| `src/components/Navbar/`                     | Top navigation bar with CSS module                                    |
| `src/components/LenisProvider/LenisProvider.tsx` | Scroll smoothness using Lenis                                         |
| `src/components/MovieAndTv/`                 | Wrapper layout for rendering Movie/TV pages                           |
| `src/components/Skeleton/`                   | Placeholder skeletons shown during data loading                       |
| `src/components/Logo.tsx`                    | SVG logo as a component                                               |
| `src/services/genre.ts`                      | Handles fetching movie/TV genres from TMDB                            |
| `src/services/tmdb.ts`                       | Core API functions to interact with TMDB                              |
| `src/types/types.ts`                         | TypeScript interfaces for TMDB data                                   |
| `src/styles/globals.css`                     | Global CSS across the entire project                                  |
| `src/styles/variables.css`                   | CSS variables (colors, fonts, etc.)                                   |
| `README.md`                                  | Project documentation and setup guide                                 |
| `package.json`                               | Project dependencies and scripts                                      |

***
<br>

## `Specialized Components`
| Component | Purpose                                                   |
|-----------|-----------------------------------------------------------|
| `Skeleton/*` | Loading placeholders for different sections               |
| `LenisProvider` | Enables smooth scrolling behavior                         |
| `MovieAndTv` | Shared layout template for content pages                  |
| `MovieCarousel` | Horizontal content slider implementation (on the HomePage)|

<br><br><br>
<hr>



## License 😽😽

This project is licensed under the [MIT License](LICENSE).

### Copyright (c) 2025 Nisal Herath

<hr>



<div align="center">

`This repository is maintained by Nisal Herath. All rights reserved.`
<br>
`By using this code, you agree to the terms outlined in the LICENSE file.`


### [nisal@nisal.lk](mailto:nisal@nisal.lk)

### [nisal.lk](https://nisal.lk)
</div>
