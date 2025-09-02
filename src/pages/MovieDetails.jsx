import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from '../assets/Spinner';

const API_BASE_URL = 'https://api.themoviedb.org/3/movie';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const MovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovieDetails = async (movieId) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/${movieId}`, API_OPTIONS);
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id);
    }
  }, [id]);

  return (
    <main>
      <div className='pattern' />
      <div className="wrapper">
        <header>
        </header>
        <div className='text-white'>
          {isLoading ? <Spinner /> : (
            <div className='text-white'>
              <div className='flex justify-center mb-4'>
                <img className='w-xs' src={details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}/` :'no-image-available.png'} alt={details.title} />
              </div>
              <h1 className='text-white'>{details.title}</h1>
              <p>{details.overview}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;