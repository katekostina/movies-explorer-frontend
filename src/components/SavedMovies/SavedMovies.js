import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ preloading }) {
  return (
    <section>
      <SearchForm />
      {preloading && <Preloader />}
      <MoviesCardList place='saved-movies' />
    </section>
  );
}

export default SavedMovies;
