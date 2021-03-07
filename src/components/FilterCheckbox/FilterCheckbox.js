import './FilterCheckbox.css';

function FilterCheckbox({ label }) {
  return (
    <label className='filter-checkbox'>
      <input className='filter-checkbox__default' type='checkbox' />
      <span className='filter-checkbox__slider' />
      <span className='filter-checkbox__label'>{label}</span>
    </label>
  );
}

export default FilterCheckbox;
