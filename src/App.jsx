import React, {useEffect, useState} from 'react'
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import Card from "./components/Card.jsx";

const API_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};


const App = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = async () => {

        setIsLoading(true);
        setErrorMessage('')

        try {
            const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, options);

            if (!response.ok){
                throw new Error('Failed to fetch movies');
            }
            const data = await response.json();

            if(data.Response === 'False') {
                setErrorMessage(data.Error || 'Failed to fetch movies');
                setMovieList([]);
                return;
            }
            setMovieList(data.results || []);

        } catch (error) {
            console.error(`Error fetching movies: ${error}`);
            setErrorMessage('Failed to fetch movies. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
    fetchMovies();
    }, []);

    return (
        <main>
            <div className="pattern" />
                <div className="wrapper">
                    <header >
                        <img src= "./hero.png" alt= "hero" />
                        <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy </h1>
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </header>

                    <section className="all-movies">
                        <h2 className="text-white mt-[30px]" >All Movies</h2>

                        { isLoading ? (<Spinner/>)
                            : errorMessage ? (<p className="error-message">{errorMessage}</p>)
                                : <ul>
                                    {movieList.map((movie) => (
                                    <Card key={movie.id} movie={movie}/>

                                    ))}
                                   </ul>
                                }
                    </section>

                </div>

        </main>
    )
}
export default App

