import { BASE_MAIN_SERVER_URL } from '../constants';

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  setToken(token) {
    this._headers = {
      ...basicHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  removeToken() {
    this._headers = basicHeaders;
  }

  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      handleOriginalResponse
    );
  }

  patchUserProfile(email, name) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    }).then(handleOriginalResponse);
  }

  getAllSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, { headers: this._headers }).then(
      handleOriginalResponse
    );
  }

  postMovie(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN
  ) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: image,
        trailer: trailer,
        thumbnail: thumbnail,
        movieId: movieId,
        nameRU: nameRU,
        nameEN: nameEN,
      }),
    }).then(handleOriginalResponse);
  }

  deleteMovie(_id) {
    return fetch(`${this._baseUrl}/movies/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(handleOriginalResponse);
  }
}

// helper
const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json().then((result) => result);
  }

  res
    .json()
    .then((result) => console.log('AuthApi error:', result))
    .catch((err) => console.log('AuthApi error:', err));

  return Promise.reject(res);
};

const basicHeaders = {
  'Content-Type': 'application/json',
  'User-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
};

const mainApi = new MainApi({
  baseUrl: BASE_MAIN_SERVER_URL,
  headers: basicHeaders,
});

export default mainApi;
