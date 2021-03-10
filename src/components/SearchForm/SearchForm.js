import { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ search, keyWord }) {
  const [error, setError] = useState();
  const [inputValue, setInputValue] = useState(keyWord);

  function handleChange(e) {
    clearError();
    setInputValue(e.target.value);
  }

  function handleSearch(e) {
    clearError();
    e.preventDefault();

    if (!inputValue) {
      setError('Нужно ввести ключевое слово');
    } else if (inputValue.length < 3) {
      setError('Введите не менее трёх букв');
    } else {
      search(inputValue);
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
      <FilterCheckbox label='Короткометражки' />
      <hr className='search-form__line' />
    </form>
  );
}

export default SearchForm;
