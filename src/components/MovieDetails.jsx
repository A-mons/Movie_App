import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HiHome, HiArrowLeft } from 'react-icons/hi';


const MovieDetails = ({ movie, onBackClick } ) => {

    if(!movie) return null;

    return (
        <section className="movie_details_section">
            <h2>MovieDetails</h2>
            <button className="nav-button" onClick={onBackClick}>
               <HiArrowLeft  className="nav-button__icon nav-button--secondary " />
                   <h2>Back To Movie List</h2>
            </button>

            <div className="movie-details-content">
                <div className="movie-details-layout">

                    <div className="movie-poster-container">

                        <img  src={movie.poster_path
                                ?`https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                : '/no-movie.png'}
                              alt={movie.title}
                              className="movie-poster"
                        />

                    </div>
                    <div className="movie-info-container">

                        <h1 className="movie-title">{ movie.title }</h1>

                        {movie.tagline && (
                            <p className="tagline">"{ movie.tagline }"</p>
                        )}

                        <div className="info-badges">
                            <span className = "info-badge">
                                { movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A' }
                            </span>
                            <span className = "info-badge flex items-center">
                                ⭐ { movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A' }
                            </span>
                            <span className = "info-badge">
                                { movie.runtime } min
                            </span>
                        </div>
                        <div className="synopsis">
                            <h2>Synopsis</h2>
                            <p>{ movie.overview || ' synopsis not available.' }</p>
                        </div>
                        <div className="movie-info-grid">
                            <div className="info-item">
                                <h3>Statut</h3>
                                <p>{movie.status || 'N/A'}</p>
                            </div>
                            <div className="info-item">
                                <h3>Budget</h3>
                                <p>{movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}</p>
                            </div>
                            <div className="info-item">
                                <h3>Recettes</h3>
                                <p>{movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}</p>
                            </div>
                            <div className="info-item">
                                <h3>Popularité</h3>
                                <p>{movie.popularity ? movie.popularity.toFixed(0) : 'N/A'}</p>
                            </div>
                        </div>

                        {movie.genres && movie.genres.length > 0 && (
                            <div className="genres-section">
                                <h3>Genres</h3>
                                <div className="badges-container">
                                    {movie.genres.map(genre => (
                                        <span key={genre.id} className="genre-badge">
                                            {genre.name}
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
