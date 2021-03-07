import src from '../../images/movie.png';
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';

function MoviesCardList({ place }) {
  return (
    <section className='movies-card-list'>
      <MovieCard
        movie={{
          src: src,
          title:
            'Не грози южному централу, попивая сок у себя в квартале. Не грози южному централу, попивая сок у себя в квартале',
          length: '1ч 29м',
        }}
        place={place}
        isSaved={true}
      />
      <MovieCard
        movie={{
          src: src,
          title: 'Не грози южному централу, попивая сок у себя в квартале',
          length: '1ч 29м',
        }}
        place={place}
        isSaved={false}
      />
      <button className='movies-card-list__more'>Ещё</button>
    </section>
  );
}

export default MoviesCardList;
