import './Form.css';

function Form({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className='form'>
      {children}
    </form>
  );
}

export default Form;
