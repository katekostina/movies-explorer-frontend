import { NavLink } from 'react-router-dom';
import './SignNav.css';

function SignNav({ label, link, to }) {
  return (
    <nav className='sign-nav'>
      <p className='sign-nav__label'>{label}</p>
      <NavLink className='sign-nav__link' to={to}>
        {link}
      </NavLink>
    </nav>
  );
}

export default SignNav;
