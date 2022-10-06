class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;

    this._headers = { headers: headers };
  }

  customFetch = (url, options) => {
    const token = localStorage.getItem('jwt')
    options.headers.authorization = `Bearer ${token}`;

    return fetch(url, options).then(
      async (res) => (res.ok ? res.json() : Promise.reject(await res.json()))
      // wait error message(and not only the status code)
      // from the server.
    );
  };

  getUserInfo() {
    return this.customFetch(`${this._baseUrl}/users/me`, this._headers);
  }

  getInitialCards() {
    return this.customFetch(`${this._baseUrl}/cards`, this._headers);
  }

  createNewCard(data) {
    return this.customFetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers.headers,
      body: JSON.stringify(data),
    });
  }

  setProfileInfo(data) {
    return this.customFetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers.headers,
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this.customFetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers.headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.addLike(cardId) : this.removeLike(cardId);
  }

  addLike(cardId) {
    return this.customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers.headers,
    });
  }

  removeLike(cardId) {
    return this.customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers.headers,
    });
  }

  setAvatar(link) {
    return this.customFetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers.headers,
      body: JSON.stringify(link),
    });
  }
}

const one1 = 'http://localhost:3000'
const one2 = 'https://api.sam.students.nomoredomainssbs.ru'
const api = new Api({
  baseUrl: one1, //  "http://localhost:3000"
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
