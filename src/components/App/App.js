import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Main from '../Main/Main';
import NoMatch from '../NoMatch/NoMatch';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import validate from '../../utils/formValidation';

function App() {
  const [isLogged, setIsLogged] = useState(true);

  const storedValues = {
    email: 'katekostina@yahoo.com',
    password: '12345',
  };

  return (
    <div className='app'>
      <Switch>
        <Route exact path='/'>
          <Header isLogged={isLogged} />
          <Main />
          <Footer />
        </Route>

        <Route path='/signin'>
          <Login initialValues={storedValues} validate={validate} />
        </Route>

        <Route path='/signup'>
          <Register validate={validate} />
        </Route>

        <Route path='/profile'>
          <Header isLogged={isLogged} />
          <Profile />
        </Route>

        <Route path='/movies'>
          <Header isLogged={isLogged} />
          <Movies />
          <Footer />
        </Route>

        <Route path='/saved-movies'>
          <Header isLogged={isLogged} />
          <SavedMovies />
          <Footer />
        </Route>

        <Route path='*'>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
