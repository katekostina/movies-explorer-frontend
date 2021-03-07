import './MovieCard.css';

function MovieCard({ movie, place, isSaved }) {
  return (
    <figure className='movie-card'>
      <img src={movie.src} alt={movie.title} className='movie-card__image' />
      <figcaption className='movie-card__caption'>
        <div className='movie-card__text-block'>
          <p className='movie-card__title'>{movie.title}</p>
          <p className='movie-card__length'>{movie.length}</p>
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
