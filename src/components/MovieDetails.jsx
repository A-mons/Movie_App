import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HiHome, HiArrowLeft } from 'react-icons/hi';


const MovieDetails = ({ movie, onBackClick } ) => {

    if(!movie) return null;

    return (
        <section className="movie_details_section">
            <h2>MovieDetails</h2>
            <button className="nav-button" onClick={onBackClick}>
               <HiArrowLeft />
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
                        <h1>{ movie.title }</h1>
                        {movie.tagline && (
                            <p className="tagline">"{ movie.tagline }"</p>
                        )

                        }
                    </div>

                </div>

            </div>
        </section>
    )
}
export default MovieDetails
