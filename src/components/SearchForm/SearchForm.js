import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ search, inputKeyString }) {
  const [error, setError] = useState();
  const [inputValue, setInputValue] = useState(inputKeyString);
  const [onlyShortFilms, setOnlyShortFilms] = useState(false);

  function handleChange(e) {
    clearError();
    setInputValue(e.target.value);
  }

  function handleSwitch(e) {
    setOnlyShortFilms(!onlyShortFilms);
  }

  function handleSearch(e) {
    clearError();
    e.preventDefault();

    if (!inputValue) {
      setError('Нужно ввести ключевое слово');
    } else if (inputValue.length < 3) {
      setError('Введите не менее трёх букв');
    } else {
      search(inputValue, onlyShortFilms);
    }
  }

  function clearError() {
    setError(null);
  }

  return (
    <form className='search-form'>
      <fieldset className='search-form__search'>
        <input
          className='search-form__input'
          placeholder='Фильм'
          type='search'
          onFocus={clearError}
          value={inputValue || ''}
          onChange={handleChange}
        />

        <button
          type='submit'
          className='search-form__button'
          onClick={handleSearch}>
          Найти
        </button>
      </fieldset>
      {error && <p className='search-form__error'>{error}</p>}

      <label className='filter-checkbox'>
        <input
          className='filter-checkbox__default'
          type='checkbox'
          checked={onlyShortFilms || false}
          onChange={handleSwitch}
        />
        <span className='filter-checkbox__slider' />
        <span className='filter-checkbox__label'>Короткометражки</span>
      </label>
      <hr className='search-form__line' />
    </form>
  );
}

export default SearchForm;
