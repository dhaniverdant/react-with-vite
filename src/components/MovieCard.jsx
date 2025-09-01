import React from 'react'

const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language, id } }) => {
  
  return (
    <div className="movie-card">
      <a href={`/movie/${id}`}>
        <img
          src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'no-image-available.png'}
          alt={title}
        />
      </a>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1): 'N/A'}</p>

            <span>.</span>
            <p className='lang'>{original_language ? original_language.toUpperCase() : 'N/A'}</p>

            <span>.</span>
            <p className="year">
              {release_date ? new Date(release_date).getFullYear() : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default MovieCard