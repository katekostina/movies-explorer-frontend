import { Route, Switch, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import validate from '../../utils/formValidation';
import moviesApi from '../../utils/MoviesApi';
import authApi from '../../utils/AuthApi';
import mainApi from '../../utils/MainApi';

function App() {
  const history = useHistory();
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [preloading, setPreloading] = useState(false);
  const [keyWord, setKeyWord] = useState(
    localStorage.getItem('searchInputString' || '')
  );
  const [searchResult, setSearchResult] = useState('');
  const [storedValues, setStoredValues] = useState({
    email: '',
    password: '',
  });

  // for InfoToolTip
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isResponseSuccessful, setIsResponseSuccessful] = useState();
  const [infoTooltipPositiveMessage, setInfoTooltipPositiveMessage] = useState(
    ''
  );

  // on App did mount
  useEffect(() => {
    // auto authorization
    const token = localStorage.getItem('token');
    if (token) {
      authorize(token);
    } else {
      console.log('token is empty');
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');
      setStoredValues({ email: email, password: password });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLogged) {
      mainApi
        .getUserProfile()
        .then((data) => {
          setCurrentUser(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLogged]);

  function filterMovies(key, movies) {
    const trimmedKey = key.trim().replace(/[-/\\^$*+?.()|[\]{}]/g, '');
    const reg = new RegExp(trimmedKey, 'gim');

    const filtered = movies.filter((movie) => {
      const {
        nameRU = '',
        nameEN = '',
        director = '',
        description = '',
      } = movie;
      return (
        (nameRU && nameRU.search(reg) >= 0) ||
        (nameEN && nameEN.search(reg) >= 0) ||
        (director && director.search(reg) >= 0) ||
        (description && description.search(reg) >= 0)
      );
    });
    return filtered;
  }

  function handleSearch(inputString) {
    setKeyWord(inputString);
    localStorage.setItem('searchInputString', inputString);
    setFilteredMovies([]);
    setPreloading(true);
    moviesApi
      .getMovies()
      .then((data) => {
        return filterMovies(inputString, data);
      })
      .then((filtered) => {
        setPreloading(false);
        setFilteredMovies(filtered);
        if (filtered.length > 0) {
          setSearchResult(`Найдено ${filtered.length} фильмов`);
        } else {
          setSearchResult('Ничего не найдено');
        }
      })
      .catch((error) => {
        setSearchResult(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
        console.log(error);
      });
  }

  function signUp(email, password, name) {
    clearInfoTooltip();
    authApi
      .signUp(email, password, name)
      .then(() => {
        setIsResponseSuccessful(true);
        setIsInfoTooltipOpen(true);
        setInfoTooltipPositiveMessage('Вы успешно зарегистрировались!');
        signIn(email, password);
      })
      .catch((error) => {
        setIsResponseSuccessful(false);
        setIsInfoTooltipOpen(true);
        switch (error.status) {
          case 400:
            console.error('Некорректно заполнено одно из полей');
            break;
          default:
            console.error(error.status + ': Произошла ошибка.');
        }
      });
  }

  function signIn(email, password) {
    authApi
      .signIn(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        mainApi.setToken(data.token);
        setIsLogged(true);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        setStoredValues({ email: email, password: password });
        history.push('/movies');
      })
      .catch((error) => {
        switch (error.status) {
          case 400:
            console.error(error.status + ': Не передано одно из полей.');
            break;
          case 401:
            console.error(error.status + ': Пользователь с email не найден.');
            break;
          default:
            console.error(error.status + ': произошла ошибка.');
        }
      });
  }

  function signOut() {
    setIsLogged(false);
    localStorage.removeItem('token');
    mainApi.removeToken();
    history.push('/');
  }

  function authorize(token) {
    authApi
      .checkToken(token)
      .then((res) => {
        mainApi.setToken(token);
        setIsLogged(true);
        // restore last search from local storage
        if (keyWord) {
          handleSearch(keyWord);
        }
      })
      .catch((error) => {
        switch (error.status) {
          case 400:
            console.error(
              error.status + ': Токен не передан или передан не в том формате.'
            );
            break;
          case 401:
            console.error(error.status + ': Переданный токен некорректе.');
            break;
          default:
            console.error(error.status + ': произошла ошибка.');
        }
      });
  }

  function updateProfile(name, email) {
    clearInfoTooltip();
    mainApi
      .patchUserProfile(name, email)
      .then((data) => {
        setCurrentUser(data.data);
        setIsInfoTooltipOpen(true);
        setInfoTooltipPositiveMessage('Новые данные профиля сохранены');
        setIsResponseSuccessful(true);
      })
      .catch((error) => {
        console.log(error);
        setIsInfoTooltipOpen(true);
        setIsResponseSuccessful(false);
      });
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function clearInfoTooltip() {
    setInfoTooltipPositiveMessage('');
    setIsResponseSuccessful();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Switch>
          <Route exact path='/'>
            <Header isNavigation={isLogged} />
            <Main />
            <Footer />
          </Route>

          <Route path='/signin'>
            <Login
              initialValues={storedValues}
              validate={validate}
              signIn={signIn}
            />
          </Route>

          <Route path='/signup'>
            <Register validate={validate} signUp={signUp} />
          </Route>

          <ProtectedRoute
            path='/profile'
            redirectTo='/signin'
            hasPermission={isLogged}>
            <Header isNavigation={isLogged} />
            <Profile
              signOut={signOut}
              history={history}
              validate={validate}
              updateProfile={updateProfile}
            />
          </ProtectedRoute>

          <ProtectedRoute
            path='/movies'
            redirectTo='/signin'
            hasPermission={isLogged}>
            <Header isNavigation={isLogged} />
            <Movies
              search={handleSearch}
              preloading={preloading}
              filteredMovies={filteredMovies}
              keyWord={keyWord}
              searchResult={searchResult}
            />
            <Footer />
          </ProtectedRoute>

          <ProtectedRoute
            path='/saved-movies'
            redirectTo='/signin'
            hasPermission={isLogged}>
            <Header isNavigation={isLogged} />
            <SavedMovies preloading={preloading} />
            <Footer />
          </ProtectedRoute>

          <Route path='*'>
            <NoMatch />
          </Route>
        </Switch>

        {/* popup */}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccessful={isResponseSuccessful}
          onClose={closeInfoTooltip}
          positiveMessage={infoTooltipPositiveMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
