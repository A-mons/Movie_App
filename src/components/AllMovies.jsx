import React from 'react'
import Spinner from "./Spinner.jsx";
import Card from "./Card.jsx";

const AllMovies = ({isLoading,errorMessage, movieList, onMovieSelect}) => {
    return (
        <section className="all-movies">
            <h2 >All Movies</h2>

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
