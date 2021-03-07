import './Profile.css';

function Profile() {
  return (
    <section className='profile'>
      <div className='profile__info'>
        <h1 className='profile__heading'>Привет, Катя!</h1>
        <div className='profile__unit'>
          <p className='profile__key'>Имя</p>
          <p className='profile__value'>Катя</p>
        </div>
        <hr className='profile__line' />
        <div className='profile__unit'>
          <p className='profile__key'>Почта</p>
          <p className='profile__value'>katekostina@yahoo.com</p>
        </div>
      </div>
      <div className='profile__buttons'>
        <button className='profile__button'>Редактировать</button>
        <button className='profile__button profile__button_quit'>
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;
