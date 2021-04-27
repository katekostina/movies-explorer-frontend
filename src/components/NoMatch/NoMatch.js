import { useHistory } from 'react-router-dom';
import './NoMatch.css';

function NoMatch() {
  const history = useHistory();

  function goToPreviousPath() {
    history.goBack();
  }

  return (
    <section className='no-match'>
      <div className='no-match__heading'>
        <h1 className='no-match__number'>404</h1>
        <p className='no-match__caption'>Страница не найдена</p>
      </div>
      <button className='no-match__go-back' to='/' onClick={goToPreviousPath}>
        Назад
      </button>
    </section>
  );
}

export default NoMatch;
