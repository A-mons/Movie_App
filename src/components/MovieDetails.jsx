import React, { useState, useEffect } from 'react'
import { HiArrowLeft } from 'react-icons/hi';

const API_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};


const MovieDetails = ({ movie, onBackClick } ) => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const displayMovie = movieDetails || movie;

    const fetchDetails = async () => {
        console.log('fetchDetails called');
        setIsLoading(true);
        setErrorMessage('');
        try {
            const response = await fetch(`${API_BASE_URL}/movie/${movie.id}`, options);
            console.log('📡 Response:', response);
            if (!response.ok) {
                throw new Error('Failed to fetch movie details');
            }
            const data = await response.json();
            setMovieDetails(data);
        } catch (error) {
            console.log('❌ Error:', error);
            console.error(`Error fetching movie details: ${error}`);
            setErrorMessage('Failed to fetch movie details. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (movie && movie.id)
        fetchDetails();
    }, [movie.id]);

    if (!movie) return null;
    if (isLoading) return <div className="loading-spinner">Chargement...</div>;
    if (errorMessage) return <div className="error-message">{errorMessage}</div>;

    return (
        <section className="movie_details_section">

            <button className="nav-button nav-button--secondary" onClick={onBackClick}>
                <HiArrowLeft className="nav-button__icon" />
                <span>Back To Movie List</span>
            </button>

            <div className="movie-details-content">
                <div className="movie-details-layout">

                    <div className="movie-poster-container">

                        <img  src={displayMovie.poster_path
                                ?`https://image.tmdb.org/t/p/w500/${displayMovie.poster_path}`
                                : '/no-movie.png'}
                              alt={displayMovie.title}
                              className="movie-poster"
                        />

                    </div>
                    <div className="movie-info-container">

                        <h1 className="movie-title">{ displayMovie.title }</h1>

                        {displayMovie.tagline && (
                            <p className="tagline">"{ displayMovie.tagline }"</p>
                        )}

                        <div className="info-badges">
                            <span>
                                { displayMovie.release_date ? new Date(displayMovie.release_date).getFullYear() : 'N/A' }
                            </span>
                            <span >
                                ⭐ { displayMovie.vote_average ? displayMovie.vote_average.toFixed(1) : 'N/A' }
                            </span>
                            <span>
                                { displayMovie.runtime } min
                            </span>
                        </div>
                        <div className="synopsis">
                            <h2>Synopsis</h2>
                            <p>{ displayMovie.overview || ' synopsis not available.' }</p>
                        </div>
                        <div className="movie-info-grid">
                            <div className="info-item">
                                <h3>Status</h3>
                                <p>{displayMovie.status || 'N/A'}</p>
                            </div>
                            <div className="info-item">
                                <h3>Budget</h3>
                                <p>{displayMovie.budget ? `$${displayMovie.budget.toLocaleString()}` : 'N/A'}</p>
                            </div>
                            <div className="info-item">
                                <h3>Revenue</h3>
                                <p>{displayMovie.revenue ? `$${displayMovie.revenue.toLocaleString()}` : 'N/A'}</p>
                            </div>
                            <div className="info-item">
                                <h3>Popularity</h3>
                                <p>{displayMovie.popularity ? displayMovie.popularity.toFixed(0) : 'N/A'}</p>
                            </div>
                        </div>

                        {displayMovie.genres && displayMovie.genres.length > 0 && (
                            <div className="genres-section">
                                <h3>Genres</h3>
                                <div className="badges-container">
                                    {displayMovie.genres.map(genre => (
                                        <span key={genre.id} className="genre-badge">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {displayMovie.production_companies && displayMovie.production_companies.length > 0 && (
                            <div className="companies-section">
                                <h3>Production Studios</h3>
                                <div className="badges-container">
                                    {displayMovie.production_companies.map(company => (
                                        <span key={company.id} className="company-badge">
                                             {company.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </section>
    )
}
export default MovieDetails
