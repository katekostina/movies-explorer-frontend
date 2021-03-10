import './Header.css';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/logo.svg';
import SignButtons from '../SignButtons/SignButtons';
import Navigation from '../Navigation/Navigation';

function Header({ isNavigation }) {
  return (
    <header className='header'>
      <NavLink to='/' className='header__home'>
        <Logo className='header__logo' />
      </NavLink>
      {isNavigation && <Navigation />}
      {!isNavigation && <SignButtons />}
    </header>
  );
}

export default Header;
