import './SignButtons.css';
import { NavLink } from 'react-router-dom';

function SignButtons() {
  return (
    <div className='sign-buttons'>
      <NavLink className='sign-buttons__signup' to='/signup'>
        Регистрация
      </NavLink>
      <NavLink className='sign-buttons__signin' to='/signin'>
        Войти
      </NavLink>
    </div>
  );
}

export default SignButtons;
