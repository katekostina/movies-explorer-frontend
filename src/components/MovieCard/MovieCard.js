import './MovieCard.css';
import { useEffect, useState } from 'react';

function MovieCard({ movie, place, isSaved }) {
  const [buttonType, setButtonType] = useState();

  useEffect(() => {
    if (place === 'saved-movies') {
      setButtonType('cross');
    } else if (place === 'all-movies') {
      if (isSaved) {
        setButtonType('full-heart');
      } else {
        setButtonType('empty-heart');
      }
    }
  }, [place, isSaved]);

  return (
    <figure className='movie-card'>
      <img src={movie.src} alt={movie.title} className='movie-card__image' />
      <figcaption className='movie-card__caption'>
        <div className='movie-card__text-block'>
          <p className='movie-card__title'>{movie.title}</p>
          <p className='movie-card__length'>{movie.length}</p>
        </div>
        <button
          className={`movie-card__btn movie-card__btn_type_${buttonType}`}
        />
      </figcaption>
    </figure>
  );
}

export default MovieCard;
