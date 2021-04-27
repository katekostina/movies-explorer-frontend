import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import { useState } from 'react';

function MoviesCardList({
  place,
  moviesToRender,
  mySavedMovies,
  handleMovieSave,
  handleMovieDelete,
}) {
  const [showMovies, setShowMovies] = useState(4);
  function handleMore() {
    setShowMovies(Math.min(moviesToRender.length, showMovies + 4));
  }

  const idsOfMySavedMovies = {};
  if (place === 'all-movies') {
    for (const movie of mySavedMovies) {
      idsOfMySavedMovies[movie.movieId] = true;
    }
  }

  return (
    <section className='movies-card-list'>
      {moviesToRender &&
        moviesToRender.slice(0, showMovies).map((movie) => {
          let isSaved;
          switch (place) {
            case 'all-movies':
              if (idsOfMySavedMovies[movie.id]) {
                isSaved = true;
              } else {
                isSaved = false;
              }
              break;
            case 'saved-movies':
              isSaved = true;
              break;
            default:
              console.error('Что-то пошло не так.');
              break;
          }

          return (
            <MovieCard
              movieData={movie}
              place={place}
              isSaved={isSaved}
              key={movie.id || movie.movieId}
              handleMovieDelete={handleMovieDelete}
              handleMovieSave={handleMovieSave}
            />
          );
        })}

      {moviesToRender && moviesToRender.length > showMovies && (
        <button className='movies-card-list__more' onClick={handleMore}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
