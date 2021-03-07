import { ReactComponent as Logo } from '../../images/logo.svg';
import './FormHeader.css';

function FormHeader({ text }) {
  return (
    <header className='form-header'>
      <Logo className='form-header__logo' />
      <h1 className='form-header__caption'>{text}</h1>
    </header>
  );
}

export default FormHeader;
