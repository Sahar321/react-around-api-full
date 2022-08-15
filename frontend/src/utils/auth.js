/* customFetch = (url, options) => {
  return fetch(url, options).then(
    async (res) => (res.ok ? res.json() : Promise.reject(await res.json()))
    // wait error message(and not only the status code)
    // from the server.
  );
};
 */

class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = { headers: headers };
  }
  customFetch = (url, options) => {
    return fetch(url, options).then(
      async (res) => (res.ok ? res.json() : Promise.reject(await res.json()))
      // wait error message(and not only the status code)
      // from the server.
    );
  };

  signin = (data) => {
    return this.customFetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers.headers,
      body: JSON.stringify(data),
    });
  };

  signup = (data) => {
    return this.customFetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers.headers,
      body: JSON.stringify(data),
    });
  };

  

  checkToken = (token) => {
    return this.customFetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}

const auth = new Auth({
  baseUrl: 'http://localhost:3000',
  headers: {
    authorization: '89275f46-d96a-420c-9a94-a2948b040a2e',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default auth;
