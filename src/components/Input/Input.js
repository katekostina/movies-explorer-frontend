import './Input.css';

function Input({
  label,
  type,
  value,
  onChange,
  onBlur,
  name,
  errors,
  placeholder,
  autoComplete,
}) {
  return (
    <label className='input__outside'>
      {label}
      <input
        className={`input__inside ${errors ? 'input__inside__error' : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      {errors && <p className='input__error'>{errors}</p>}
    </label>
  );
}

export default Input;
