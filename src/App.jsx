import React, {useEffect, useState} from 'react'
import Search from "./components/Search.jsx";

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


    const fetchMovies = async () => {
        try {
            const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, options);
        } catch (error) {
            console.error(`Error fetching movies: ${error}`);
            setErrorMessage('Failed to fetch movies. Please try again later.');
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
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </section>

                </div>

        </main>
    )
}
export default App

