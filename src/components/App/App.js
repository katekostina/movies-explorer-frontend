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
import { BASE_MOVIES_URL } from '../../constants';
import src from '../../images/movie.png';

function App() {
  const history = useHistory();

  // for authorization
  const enteredPath = history.location.pathname;
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('userData')) || null
  );

  // for film search
  const [inputKeyStringAll, setInputKeyStringAll] = useState('');
  const [onlyShortFilmsAll, setOnlyShortFilmsAll] = useState(false);
  const [allMovies, setAllMovies] = useState(
    JSON.parse(localStorage.getItem('allMovies')) || null
  );
  const [filteredAllMovies, setFilteredAllMovies] = useState(null);
  const [preloading, setPreloading] = useState(false);
  const [searchAllResultMessage, setSearchAllResultMessage] = useState('');

  // for InfoToolTip
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isResponseSuccessful, setIsResponseSuccessful] = useState();
  const [infoTooltipPositiveMessage, setInfoTooltipPositiveMessage] = useState(
    ''
  );

  // saved movies
  const [mySavedMovies, setMySavedMovies] = useState(null);
  const [filteredMySavedMovies, setFilteredMySavedMovies] = useState(null);
  const [searchSavedResultMessage, setSearchSavedResultMessage] = useState('');
  const [inputKeyStringSaved, setInputKeyStringSaved] = useState('');
  const [onlyShortFilmsSaved, setOnlyShortFilmsSaved] = useState(false);

  // on App did mount
  useEffect(() => {
    // auto authorization
    const token = localStorage.getItem('token');
    if (token) {
      authorize(token);
    } else {
      console.log('token is empty');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allMovies && inputKeyStringAll) {
      setFilteredAllMovies(
        filterMovies(
          inputKeyStringAll,
          onlyShortFilmsAll,
          allMovies,
          setSearchAllResultMessage
        )
      );
    }
  }, [inputKeyStringAll, onlyShortFilmsAll, allMovies]);

  useEffect(() => {
    if (mySavedMovies && inputKeyStringSaved) {
      setFilteredMySavedMovies(
        filterMovies(
          inputKeyStringSaved,
          onlyShortFilmsSaved,
          mySavedMovies,
          setSearchSavedResultMessage
        )
      );
    }
  }, [inputKeyStringSaved, onlyShortFilmsSaved, mySavedMovies]);

  useEffect(() => {
    if (currentUser) {
      setPreloading(true);
      mainApi
        .getAllSavedMovies()
        .then((data) => {
          setMySavedMovies(filterSavedMovies(data.data));
          setPreloading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentUser]);

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
        history.push('/movies');
      })
      .then(() => {
        loadUserData();
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

    localStorage.removeItem('allMovies');
    setAllMovies(null);
    setFilteredAllMovies(null);
    setMySavedMovies(null);
    setFilteredMySavedMovies(null);

    localStorage.removeItem('userData');
    setCurrentUser(null);
    setInputKeyStringAll('');
    setInputKeyStringSaved('');

    history.push('/');
  }

  function loadUserData() {
    mainApi
      .getUserProfile()
      .then((data) => {
        localStorage.setItem('userData', JSON.stringify(data.data));
        setCurrentUser(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function authorize(token) {
    authApi
      .checkToken(token)
      .then((res) => {
        setIsLogged(true);
        mainApi.setToken(token);
      })
      .then(() => {
        loadUserData();
        history.push(enteredPath);
      })
      .catch((error) => {
        setIsLogged(false);
        switch (error.status) {
          case 400:
            console.error(
              error.status + ': Токен не передан или передан не в том формате.'
            );
            break;
          case 401:
            console.error(
              error.status + ': Переданный токен некорректен или просрочен.'
            );
            break;
          default:
            console.error('Произошла ошибка:', error);
        }
      });
  }

  function updateProfile(name, email) {
    clearInfoTooltip();
    mainApi
      .patchUserProfile(name, email)
      .then((data) => {
        localStorage.setItem('userData', JSON.stringify(data.data));
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

  function filterSavedMovies(movies) {
    const myId = currentUser._id;
    const myMovies = movies.filter((movie) => {
      const { owner = '' } = movie;
      return myId === owner;
    });
    return myMovies;
  }

  function filterMovies(
    inputKeyString,
    onlyShortFilms,
    notFilteredMovies,
    setSearchResultMessage
  ) {
    const trimmedKey = inputKeyString
      .trim()
      .replace(/[-/\\^$*+?.()|[\]{}]/g, '');
    const reg = new RegExp(trimmedKey, 'gim');
    const filtered = notFilteredMovies.filter((movie) => {
      const {
        nameRU = '',
        nameEN = '',
        director = '',
        description = '',
        duration = 0,
      } = movie;
      return (
        ((nameRU && nameRU.search(reg) >= 0) ||
          (nameEN && nameEN.search(reg) >= 0) ||
          (director && director.search(reg) >= 0) ||
          (description && description.search(reg) >= 0)) &&
        (onlyShortFilms ? duration <= 40 : true)
      );
    });
    if (filtered.length === 0) {
      setSearchResultMessage('Ничего не найдено');
    }
    return filtered;
  }

  function searchAllMovies(inputString, onlyShortFilms) {
    setInputKeyStringAll(inputString);
    setOnlyShortFilmsAll(onlyShortFilms);

    if (!allMovies) {
      setPreloading(true);
      moviesApi
        .getMovies()
        .then((data) => {
          localStorage.setItem('allMovies', JSON.stringify(data));
          setAllMovies(data);
          setPreloading(false);
        })
        .catch((error) => {
          setSearchAllResultMessage(
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          );
          console.error(error);
        });
    }
  }

  function searchSavedMovies(inputString, onlyShortFilms) {
    setInputKeyStringSaved(inputString);
    setOnlyShortFilmsSaved(onlyShortFilms);
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function clearInfoTooltip() {
    setInfoTooltipPositiveMessage('');
    setIsResponseSuccessful();
  }

  function handleMovieSave(movie) {
    mainApi
      .postMovie(
        movie.country || 'unknown',
        movie.director || 'unknown',
        movie.duration || 0,
        movie.year || 'unknown',
        movie.description || 'unknown',
        movie.image.url ? BASE_MOVIES_URL + movie.image.url : src,
        movie.trailerLink ||
          `https://www.youtube.com/results?search_query=трейлер+фильма+${
            movie.nameRU.replace(/ /g, '+') || movie.nameEN.replace(/ /g, '+')
          }`,
        movie.image.formats.thumbnail.url
          ? BASE_MOVIES_URL + movie.image.formats.thumbnail.url
          : src,
        movie.id,
        movie.nameRU || 'unknown',
        movie.nameEN || 'unknown'
      )
      .then((savedMovie) => {
        setFilteredAllMovies(
          filterMovies(
            inputKeyStringAll,
            onlyShortFilmsAll,
            allMovies,
            setSearchAllResultMessage
          )
        );
        mainApi
          .getAllSavedMovies()
          .then((data) => {
            return filterSavedMovies(data.data);
          })
          .then((myMovies) => {
            setMySavedMovies(myMovies);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleMovieDeleteOnAllMoviesPage(movie) {
    const matchedSavedMovie = mySavedMovies.find(
      (savedMovie) => savedMovie.movieId === movie.id
    );
    deleteMovie(matchedSavedMovie._id);
  }

  function handleMovieDeleteOnSavedMoviesPage(movie) {
    deleteMovie(movie._id);
  }

  function deleteMovie(_id) {
    mainApi
      .deleteMovie(_id)
      .then((data) => {
        if (
          data.deleteInfo.n === 1 &&
          data.deleteInfo.ok === 1 &&
          data.deleteInfo.deletedCount === 1
        ) {
          setFilteredAllMovies(
            filterMovies(
              inputKeyStringAll,
              onlyShortFilmsAll,
              allMovies,
              setSearchAllResultMessage
            )
          );
          mainApi
            .getAllSavedMovies()
            .then((data) => {
              return filterSavedMovies(data.data);
            })
            .then((myMovies) => {
              setMySavedMovies(myMovies);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.error('Что-то пошло не так при удалении фильма.', data);
        }
      })
      .catch((error) => console.error(error));
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
              initialValues={currentUser || {}}
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
              preloading={preloading}
              search={searchAllMovies}
              filteredMovies={filteredAllMovies}
              mySavedMovies={mySavedMovies}
              inputKeyString={inputKeyStringAll}
              searchResult={searchAllResultMessage}
              handleMovieSave={handleMovieSave}
              handleMovieDelete={handleMovieDeleteOnAllMoviesPage}
            />
            <Footer />
          </ProtectedRoute>

          <ProtectedRoute
            path='/saved-movies'
            redirectTo='/signin'
            hasPermission={isLogged}>
            <Header isNavigation={isLogged} />
            <SavedMovies
              preloading={preloading}
              search={searchSavedMovies}
              mySavedMovies={mySavedMovies}
              inputKeyString={inputKeyStringSaved}
              searchResult={searchSavedResultMessage}
              handleMovieDelete={handleMovieDeleteOnSavedMoviesPage}
              filteredMySavedMovies={filteredMySavedMovies}
            />
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
