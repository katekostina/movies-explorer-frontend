import './Navigation.css';
import { ReactComponent as NavigationIcon } from '../../images/burger.svg';
import { ReactComponent as CrossIcon } from '../../images/cross.svg';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  function updateScreenType() {
    setIsMobile(window.innerWidth <= 800);
  }

  function openPopup() {
    setIsNavigationOpen(true);
  }

  function closePopup() {
    setIsNavigationOpen(false);
  }

  useEffect(() => {
    window.addEventListener('resize', updateScreenType);
    return () => {
      window.removeEventListener('resize', updateScreenType);
    };
  }, []);

  return (
    <>
      {/* markup for mobile devices */}
      {isMobile && (
        <section className='navigation'>
          <NavigationIcon className='navigation__icon' onClick={openPopup} />
          {isNavigationOpen && (
            <>
              <div className='navigation__overlay' onClick={closePopup} />
              <div className='navigation__popup'>
                <CrossIcon className='navigation__cross' onClick={closePopup} />
                <div className='navigation__main-nav'>
                  <NavLink
                    exact
                    to='/'
                    className='navigation__link'
                    activeClassName='navigation__link_current'
                    onClick={closePopup}>
                    Главная
                  </NavLink>
                  <NavLink
                    to='/movies'
                    className='navigation__link'
                    activeClassName='navigation__link_current'
                    onClick={closePopup}>
                    Фильмы
                  </NavLink>
                  <NavLink
                    to='/saved-movies'
                    className='navigation__link'
                    activeClassName='navigation__link_current'
                    onClick={closePopup}>
                    Сохранённые фильмы
                  </NavLink>
                </div>
                <NavLink
                  to='/profile'
                  className='navigation__profile-link'
                  onClick={closePopup}>
                  Аккаунт
                  <div className='navigation__user-icon' />
                </NavLink>
              </div>
            </>
          )}
        </section>
      )}

      {/* markup for desktop - when screen width > 800px */}
      {!isMobile && (
        <section className='navigation'>
          <div className='navigation__main-nav'>
            <NavLink
              to='/movies'
              className='navigation__link'
              activeClassName='navigation__link_current'>
              Фильмы
            </NavLink>
            <NavLink
              to='/saved-movies'
              className='navigation__link'
              activeClassName='navigation__link_current'>
              Сохранённые фильмы
            </NavLink>
          </div>
          <NavLink to='/profile' className='navigation__profile-link'>
            Аккаунт
            <div className='navigation__user-icon' />
          </NavLink>
        </section>
      )}
    </>
  );
}

export default Navigation;
