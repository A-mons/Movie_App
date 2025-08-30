import React, {useEffect, useState} from 'react'
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import Card from "./components/Card.jsx";
import { useDebounce } from 'react-use'
import {updateSearchCount, getTopSearches} from "./appwrite.js";

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
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [trending, setTrending] = useState([]);


    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])
    const fetchMovies = async (query='') => {

        setIsLoading(true);
        setErrorMessage('')

        try {
            const endpoint = query
                ?`${API_BASE_URL}/search/movie?query= ${encodeURIComponent(query)}`
                :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
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
            if (query && data.results.length > 0) {
                await updateSearchCount(query,data.results[0]);}

        } catch (error) {
            console.error(`Error fetching movies: ${error}`);
            setErrorMessage('Failed to fetch movies. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    const fetchTopSearches = async () => {
        try {
            const movies = await getTopSearches();
            setTrending(movies);
        } catch (error) {
            console.error(`Error fetching trending movies: ${error}`);
        }
    };

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    useEffect(()=>{
        fetchTopSearches();
    },[])

    return (
        <main>
            <div className="pattern" />
                <div className="wrapper">
                    <header >
                        <img src= "./hero.png" alt= "hero" />
                        <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy </h1>
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </header>

                    {trending.length > 0 && (
                    <section className="trending">
                        <h2 >Trending Movies</h2>
                            <ul>
                                {trending.map((movie, index) => (
                                    <li key={movie.$id}>
                                        <p>{index+1}</p>
                                        {console.log(movie.count)}
                                        <img src={movie.poster_url} alt={movie.title}  />
                                    </li>
                                ))}
                            </ul>
                    </section>
                    )}

                    <section className="all-movies">
                        <h2 >All Movies</h2>

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

