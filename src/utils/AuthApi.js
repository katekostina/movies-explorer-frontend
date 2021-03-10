import { BASE_MAIN_SERVER_URL } from '../constants';

class AuthApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  signUp(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    }).then(handleOriginalResponse);
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(handleOriginalResponse);
  }

  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Accept: 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }).then(handleOriginalResponse);
  }
}

const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json();
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

const authApi = new AuthApi({
  baseUrl: BASE_MAIN_SERVER_URL,
  headers: basicHeaders,
});

export default authApi;
