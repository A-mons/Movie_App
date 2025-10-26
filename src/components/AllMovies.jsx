import React from 'react'
import Spinner from "./Spinner.jsx";
import Card from "./Card.jsx";

const AllMovies = ({isLoading,errorMessage, movieList, onMovieSelect, searchTerm, onResetSearch}) => {
    return (
        <section className="all-movies">
            <div className="all-movies-header">
            <h2 >{searchTerm ? `Result for ${searchTerm}`: "All Movies"}</h2>
                {searchTerm && (
                    <button onClick={onResetSearch} className="nav-button nav-button--all-movies">
                        All Movies
                    </button>
                )}
            </div>

            { isLoading ? (<Spinner/>)
                : errorMessage ? (<p className="error-message">{errorMessage}</p>)
                    : <ul>
                        {movieList.map((movie) => (
                                <Card  key={movie.id} movie={movie} onSelect = {onMovieSelect} />
                        ))}
                    </ul>
            }
        </section>
    )
}
export default AllMovies
