import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies() {
  return (
    <section>
      <SearchForm />
      <Preloader />
      <MoviesCardList place='all-movies' />
    </section>
  );
}

export default Movies;
