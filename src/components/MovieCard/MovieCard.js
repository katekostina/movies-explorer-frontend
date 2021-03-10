import src from '../../images/movie.png';
import { BASE_MOVIES_URL } from '../../constants';
import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard({ movieData, place, isSaved }) {
  const { nameRU, duration, image, trailerLink } = movieData;

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

  return (
    <figure className='movie-card'>
      <a
        className='movie-card__link'
        href={trailerLink ? trailerLink : '#'}
        target='_blank'
        rel='noreferrer'>
        <img
          src={image ? BASE_MOVIES_URL + image.url : src}
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
          <button className='movie-card__btn movie-card__btn_type_cross' />
        )}

        {place === 'all-movies' && (
          <button
            className={`movie-card__btn movie-card__btn_type_${
              isSaved ? 'full-heart' : 'empty-heart'
            }`}
          />
        )}
      </figcaption>
    </figure>
  );
}

export default MovieCard;
