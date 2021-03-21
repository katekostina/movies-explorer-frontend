import './Profile.css';
import { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ signOut, validate, updateProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const [submitPossible, setSubmitPossible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (errors && Object.keys(errors).length === 0)
      if (
        userInfo.name !== currentUser.name ||
        userInfo.email !== currentUser.email
      ) {
        setSubmitPossible(true);
      } else {
        setSubmitPossible(false);
      }
  }, [
    errors,
    currentUser.email,
    currentUser.name,
    userInfo.email,
    userInfo.name,
  ]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });

    const { [name]: removedError, ...rest } = errors;
    const error = validate[name](value);
    setErrors({
      ...rest,
      ...(error && { [name]: userInfo[name] && error }),
    });
  }

  function handleSignOut() {
    signOut();
  }

  function handleEditProfile(e) {
    e.preventDefault();
    const { name, email } = userInfo;
    updateProfile(email, name);
  }

  return (
    <form className='profile' onSubmit={handleEditProfile}>
      <div className='profile__info'>
        <h1 className='profile__heading'>Привет, {currentUser.name}!</h1>
        <div className='profile__unit'>
          <label className='profile__key' htmlFor='profile-name'>
            Имя
          </label>
          <input
            className='profile__value'
            name='name'
            id='profile-name'
            type='text'
            value={userInfo.name || ''}
            onChange={handleChange}
            placeholder={userInfo.name || ''}
          />
        </div>
        {errors.name && <p className='profile__error'>{errors.name}</p>}
        <hr className='profile__line' />
        <div className='profile__unit'>
          <label className='profile__key' htmlFor='profile-email'>
            Почта
          </label>
          <input
            className='profile__value'
            name='email'
            id='profile-email'
            type='email'
            value={userInfo.email || ''}
            onChange={handleChange}
            placeholder={userInfo.email || ''}
          />
        </div>
        {errors.email && <p className='profile__error'>{errors.email}</p>}
      </div>
      <div className='profile__buttons'>
        <button
          type='submit'
          className={`profile__button profile__button_active_${submitPossible}`}
          disabled={!submitPossible}>
          Редактировать
        </button>
        <button
          className='profile__button profile__button_quit'
          onClick={handleSignOut}>
          Выйти из аккаунта
        </button>
      </div>
    </form>
  );
}

export default withRouter(Profile);
