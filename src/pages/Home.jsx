import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import Spinner from '../assets/Spinner'
import MovieCard from '../components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = query
        ? await fetch(`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`, API_OPTIONS)
        : await fetch(`${API_BASE_URL}/movie/popular`, API_OPTIONS);

      if (!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch movies');
      }

      const data = await response.json();
      // console.log(data);

      if (data.response === 'False') {
        setMovieList([]);
        throw new Error(data.status_message || 'Failed to fetch movies');
      }

      setMovieList(data.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <main>
      <div className='pattern' />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy</h1>
          <div className='text-center text-amber-100/25'>Brought to you by dhaniverdant :)</div>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : movieList.length > 0 ? (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          ) : (
            <p>No movies found.</p>
          )}
        </section>

      </div>
    </main>
  )
}

export default Home