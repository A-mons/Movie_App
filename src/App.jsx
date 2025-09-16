import React, {useEffect, useState} from 'react'
import { useDebounce } from 'react-use'
import {updateSearchCount, getTopSearches} from "./appwrite.js";
import AllMovies from "./components/AllMovies.jsx";
import Header from "./components/Header.jsx";
import TrendingMovies from "./components/TrendingMovies.jsx";
import MovieDetails from "./components/MovieDetails.jsx";

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
    const [selectedMovie, setSelectedMovie] = useState(null);


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


    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
    }

    const handleBackToList = () => {
        setSelectedMovie(null);
    }


    return (
        <main>
            <div className="pattern" />
                <div className="wrapper">
                    <Header
                        searchTerm = {searchTerm}
                        setSearchTerm = {setSearchTerm}
                    />
                    < TrendingMovies trending = {trending}/>

                    {selectedMovie ? (
                            <MovieDetails
                                movie={selectedMovie}
                                onBackClick={handleBackToList}
                            />
                        ):(
                            <AllMovies
                             isLoading= {isLoading}
                             errorMessage= {errorMessage}
                             movieList= {movieList}
                             onMovieSelect = {handleMovieSelect}
                            />
                        )
                    }

                </div>

        </main>
    )
}
export default App

