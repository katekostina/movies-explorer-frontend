import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchInfo from '../SearchInfo/SearchInfo';

function Movies({ search, preloading, filteredMovies, keyWord, searchResult }) {
  return (
    <section>
      <SearchForm search={search} keyWord={keyWord} />
      {preloading && <Preloader />}
      {filteredMovies.length > 0 && (
        <MoviesCardList place='all-movies' movies={filteredMovies} />
      )}
      {keyWord && !preloading && filteredMovies.length === 0 && (
        <SearchInfo text={searchResult} />
      )}
    </section>
  );
}

export default Movies;
