import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  return (
    <section>
      <SearchForm />
      <MoviesCardList place='saved-movies' />
    </section>
  );
}

export default SavedMovies;
