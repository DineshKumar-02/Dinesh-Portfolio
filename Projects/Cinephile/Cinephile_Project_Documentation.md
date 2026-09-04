# Cinephile — Full-Stack Netflix Streaming & Movie Discovery Platform

## Project Overview

Cinephile (CinePulse) is a responsive, full-stack movie discovery and streaming web application inspired by Netflix. It allows users to authenticate securely, browse trending and categorized movies fetched live from The Movie Database (TMDB) API, preview embedded YouTube trailers, search titles with debounced inputs, and manage a personalized Watchlist synchronized with a cloud database.

---

## Problem Statement

Modern video and movie streaming platforms require dynamic content aggregation, instant trailer previews, and multi-user personalization without page reloads or excessive API rate-limiting. Developers building streaming platforms frequently face challenges such as:
- Coordinating frontend UI states with external rate-limited third-party APIs
- Maintaining secure, isolated user watchlists without unauthorized data leaks
- Ensuring smooth failover when free-tier cloud backend containers experience cold starts
- Preventing Single Page Application (SPA) routing drops on direct URL refreshes

---

## Solution

Cinephile addresses these engineering challenges through a decoupled full-stack architecture:

- **Decoupled Architecture** — Fast React 19 + Vite frontend communicating with a modular Node.js/Express backend server
- **Live Movie Streaming Feeds** — TMDB REST API integration structured across 6+ genre channels (Trending Now, Top Rated, Action, Comedy, Horror, Romance)
- **Persistent User Watchlist** — Cloud PostgreSQL database managed via Supabase with strict Row-Level Security (RLS) policies
- **Interactive Trailer Previews** — Embedded modal video player fetching YouTube keys directly with backdrop metadata and vote ratings
- **Debounced Instant Search** — Real-time search bar with client-side debounce timing to prevent API spamming
- **Dual-Tier Resilient Fallback** — Automatic client-side fallback to direct Supabase SDK if the Express server is waking from cold start

---

## Architecture Overview

```text
[React 19 / Vite Frontend] ──(REST API / Watchlist)──> [Node.js / Express Server]
│                                                        │
│ (Dual-Tier Fallback / Direct Auth)                     │ (CRUD Watchlist API)
↓                                                        ↓
[Supabase Auth & PostgreSQL DB with Row-Level Security (RLS)]
│
[TMDB REST API] ──(Dynamic Posters, Backdrops, Trailers, Genres)──> [React 19 Client]
```

---

## How I Built Cinephile

### 1. Frontend Layer
- **Framework:** React 19, Vite, JavaScript (ES6+)
- **Styling:** Custom Vanilla CSS with dark Netflix aesthetics, shimmer skeleton loaders, and responsive grid layouts
- **State Management:** React Context API (`AuthContext`, `WatchlistContext`) for global session tracking and synchronized state updates
- **Key Components:**
  - `Navbar.jsx` — Responsive sticky navbar with genre links, expandable search bar, and profile dropdown
  - `Banner.jsx` — Dynamic hero banner displaying random trending movies with backdrop art, synopsis, and action buttons
  - `MovieRow.jsx` — Horizontally scrollable poster rows categorized by genre
  - `MovieModal.jsx` — High-resolution backdrop modal showing movie details, cast, rating, and embedded trailer
  - `SearchBar.jsx` — Expandable, debounced input filter for instantaneous title lookups
  - `Login.jsx` & `Signup.jsx` — Authentication portals with input validation and show/hide password toggles
  - `MyList.jsx` — Dedicated Watchlist page displaying user-saved movies with one-click removal

### 2. Backend Layer
- **Environment:** Node.js, Express.js
- **Routing & Controllers:**
  - `GET /api/health` — Server health check endpoint
  - `GET /api/watchlist/:userId` — Fetch all movies in a user's watchlist
  - `POST /api/watchlist` — Add a movie record to watchlist
  - `DELETE /api/watchlist/:userId/:movieId` — Remove a movie from watchlist
- **Security & Middleware:**
  - `cors` configuration supporting cross-domain requests
  - Body parser with payload limits handling JSON payloads
  - Port binding on `0.0.0.0` for cloud container hosting on Render

### 3. Database Layer
- **Platform:** Supabase (PostgreSQL)
- **Row-Level Security (RLS):**
  - Users can ONLY read their own watchlist items (`auth.uid() = user_id`)
  - Users can ONLY insert items under their authenticated UID
  - Users can ONLY delete records belonging to their authenticated UID
  - Unique composite index on `(user_id, movie_id)` preventing duplicate additions

---

## Key Features Implemented

1. **User Authentication & Authorization**
   - Secure email and password registration powered by Supabase Auth
   - Persistent session storage across browser reloads
   - Protected routes redirecting unauthenticated users to `/login`

2. **Dynamic Content Discovery**
   - Real-time movie posters and high-resolution backdrops fetched from TMDB
   - Categorized horizontal scrolling rows with hover animations
   - Seamless trailer preview modal with YouTube player

3. **Cloud Watchlist CRUD**
   - Instant "Add to Watchlist" toggle on movie cards and modal previews
   - Instant feedback with optimistic state updates
   - PostgreSQL persistence with Row-Level Security

4. **Instant Debounced Search**
   - Debounced search query listener preventing unnecessary network roundtrips
   - Responsive grid displaying filtered matching movies

5. **Cloud Deployment & SPA Resilience**
   - Frontend deployed on Render Cloud with `_redirects` configuration (`/* /index.html 200`)
   - Backend API hosted on Render Cloud with automated health monitoring

---

## Challenges & Solutions

- **Challenge 1: Free-Tier Cold Starts**
  - *Solution:* Engineered a dual-tier service layer where the React client queries the Express backend first; if the backend is waking up, it seamlessly falls back to direct Supabase database calls.
- **Challenge 2: SPA Sub-Route 404 Drops**
  - *Solution:* Added static rewrite rules inside public directory (`_redirects`) ensuring deep links (`/login`, `/signup`, `/my-list`) route cleanly to `index.html`.
- **Challenge 3: CORS & HTTP Options Handlers**
  - *Solution:* Explicitly configured Express CORS headers and preflight responders to allow cross-origin requests from the deployed frontend.
- **Challenge 4: Rate-Limiting & Performance**
  - *Solution:* Implemented debounce timers on search input and lazy image loading to ensure smooth 60fps scrolling performance.

---

## Project Links

- **Live Application:** https://netflix-clone-frontend-4dsa.onrender.com/login
- **Live Backend Health API:** https://netflix-clone-backend-6ouo.onrender.com/api/health
- **GitHub Repository:** https://github.com/DineshKumar-02/netflix-clone

---

## Summary

Cinephile showcases modern full-stack web engineering: combining React 19, custom CSS, Supabase PostgreSQL with Row-Level Security, Express backend APIs, and external REST API integrations to deliver a production-ready streaming user experience.
