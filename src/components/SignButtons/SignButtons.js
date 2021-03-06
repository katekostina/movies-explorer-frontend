import './SignButtons.css';
import { NavLink } from 'react-router-dom';

function SignButtons() {
  function handleSignIn() {
    console.log('click');
  }

  function handleSignUp() {
    console.log('click');
  }

  return (
    <div className='sign-buttons'>
      <NavLink
        className='sign-buttons__signup'
        to='/signup'
        onClick={handleSignUp}>
        Регистрация
      </NavLink>
      <NavLink
        className='sign-buttons__signin'
        to='/signin'
        onClick={handleSignIn}>
        Войти
      </NavLink>
    </div>
  );
}

export default SignButtons;
