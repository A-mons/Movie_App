<p align="center">
  <h1 align="center">🎬 Movie App</h1>
  <p align="center">Discover and search movies with trending search tracking — powered by TMDB and Appwrite.</p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7.0-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/TMDB-API-01D277?logo=themoviedatabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Appwrite-19.0-FD366E?logo=appwrite&logoColor=white" />
</p>

---

## Overview

A modern movie discovery app built with React and Vite. Browse popular movies, search by title with debounced input, view detailed movie info, and see trending searches tracked via Appwrite's database.

## ✨ Features

- **Movie Discovery** — Browse popular movies from TMDB's discover endpoint
- **Search** — Debounced search with real-time results
- **Movie Details** — Full info including synopsis, budget, revenue, genres, and production studios
- **Trending Searches** — Most searched movies tracked and displayed via Appwrite
- **Responsive Design** — TailwindCSS-powered layout that works on any device

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19, Vite 7 |
| **Styling** | TailwindCSS 4 |
| **API** | TMDB (The Movie Database) |
| **Backend** | Appwrite (search tracking & persistence) |
| **Routing** | React Router v7 |
| **Utilities** | react-use (debounce), react-icons |

## 📁 Project Structure

```
Movie_App/
├── src/
│   ├── components/
│   │   ├── AllMovies.jsx       # Movie grid with search results
│   │   ├── Card.jsx            # Individual movie card
│   │   ├── Header.jsx          # Hero banner & search bar
│   │   ├── MovieDetails.jsx    # Full movie detail view
│   │   ├── Search.jsx          # Search input component
│   │   ├── Spinner.jsx         # Loading indicator
│   │   └── TrendingMovies.jsx  # Trending searches sidebar
│   ├── appwrite.js             # Appwrite client & search tracking
│   ├── App.jsx                 # Root component & state management
│   ├── App.css                 # App styles
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
│
├── vite.config.js
├── eslint.config.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **TMDB API Key** — [Get one here](https://www.themoviedb.org/settings/api)
- **Appwrite Instance** — [Cloud](https://cloud.appwrite.io) or self-hosted

### Installation

```bash
# Clone the repository
git clone https://github.com/A-mons/Movie_App.git
cd Movie_App

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_API_KEY=your_tmdb_bearer_token

VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_TABLE_ID=your_table_id
```

### Appwrite Setup

1. Create a database and table in your Appwrite console
2. Add the following columns to the table:
   - `searchTerm` (string)
   - `count` (integer)
   - `movie_id` (integer)
   - `poster_url` (string)

### Run

```bash
npm run dev
```

Opens at `http://localhost:5173`.

## 📡 API Integration

### TMDB Endpoints Used

| Endpoint | Description |
|----------|-------------|
| `/discover/movie` | Browse popular movies sorted by popularity |
| `/search/movie` | Search movies by title |
| `/movie/:id` | Get detailed movie information |

### Appwrite

- **Search tracking** — Every search query increments a counter in Appwrite
- **Trending display** — Top 5 most searched terms are shown as trending

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
