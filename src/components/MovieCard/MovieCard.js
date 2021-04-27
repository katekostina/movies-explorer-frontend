import src from '../../images/movie.png';
import { BASE_MOVIES_URL } from '../../constants';
import './MovieCard.css';

function MovieCard({
  movieData,
  place,
  isSaved,
  handleMovieDelete,
  handleMovieSave,
}) {
  const { nameRU, duration, image, trailerLink, trailer } = movieData;

  let imageUrl;
  let trailerUrl;
  switch (place) {
    case 'all-movies':
      imageUrl = image ? BASE_MOVIES_URL + image.url : src;
      trailerUrl = trailerLink ? trailerLink : '#';
      break;
    case 'saved-movies':
      imageUrl = image ? image : src;
      trailerUrl = trailer ? trailer : '#';
      break;
    default:
      break;
  }

  function formatDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    let formattedDuration = '';
    if (hours > 0) {
      formattedDuration += hours + 'ч';
    }
    if (hours > 0 && minutes > 0) {
      formattedDuration += ' ';
    }
    if (minutes > 0) {
      formattedDuration += minutes + 'м';
    }

    return formattedDuration;
  }
  const formattedDuration = formatDuration(duration);

  function movieDelete(params) {
    handleMovieDelete(movieData);
  }

  function movieSave(params) {
    handleMovieSave(movieData);
  }

  return (
    <figure className='movie-card'>
      <a
        className='movie-card__link'
        href={trailerUrl}
        target='_blank'
        rel='noreferrer'>
        <img
          src={imageUrl}
          alt={nameRU ? nameRU : 'Фильм без названия'}
          className='movie-card__image'
        />
      </a>

      <figcaption className='movie-card__caption'>
        <div className='movie-card__text-block'>
          <p className='movie-card__title'>
            {nameRU ? nameRU : 'Фильм без названия'}
          </p>
          <p className='movie-card__length'>{formattedDuration}</p>
        </div>

        {place === 'saved-movies' && (
          <button
            className='movie-card__btn movie-card__btn_type_cross'
            onClick={movieDelete}
          />
        )}

        {place === 'all-movies' && (
          <button
            className={`movie-card__btn movie-card__btn_type_${
              isSaved ? 'full-heart' : 'empty-heart'
            }`}
            onClick={isSaved ? movieDelete : movieSave}
          />
        )}
      </figcaption>
    </figure>
  );
}

export default MovieCard;
