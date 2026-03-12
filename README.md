# 🎬 Movie App

A movie discovery app built with React + Vite. Browse popular movies, search by title, and view detailed info — powered by the TMDB API with Appwrite-backed trending search tracking.

## Features

- **Browse** popular movies from TMDB
- **Search** movies with debounced input
- **Movie details** — synopsis, budget, revenue, genres, production studios
- **Trending searches** — tracks top searched terms via Appwrite

## Tech Stack

- **React 19** + **Vite 7**
- **Tailwind CSS 4**
- **TMDB API** for movie data
- **Appwrite** for search analytics
- **react-router-dom** for routing
- **react-icons** for UI icons

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/A-mons/Movie_App.git
   cd Movie_App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in your API keys:
   ```bash
   cp .env.example .env
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_TMDB_BASE_URL` | TMDB API base URL |
| `VITE_TMDB_API_KEY` | TMDB Bearer token |
| `VITE_APPWRITE_ENDPOINT` | Appwrite endpoint |
| `VITE_APPWRITE_PROJECT_ID` | Appwrite project ID |
| `VITE_APPWRITE_DATABASE_ID` | Appwrite database ID |
| `VITE_APPWRITE_TABLE_ID` | Appwrite table ID |

## License

MIT
