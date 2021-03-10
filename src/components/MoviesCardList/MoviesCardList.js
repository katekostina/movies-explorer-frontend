import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import { useState, useEffect } from 'react';

function MoviesCardList({ place, movies }) {
  const [showMovies, setShowMovies] = useState(4);

  function handleMore() {
    setShowMovies(Math.min(movies.length, showMovies + 4));
  }

  return (
    <section className='movies-card-list'>
      {movies &&
        movies
          .slice(0, showMovies)
          .map((movie) => (
            <MovieCard
              movieData={movie}
              place={place}
              isSaved={true}
              key={movie.id}
            />
          ))}

      {movies && movies.length > showMovies && (
        <button className='movies-card-list__more' onClick={handleMore}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
