import { data } from "autoprefixer";

export default class Api {
  constructor(host, headers) {
    this._host = host;
    this._headers = headers;
    // this._getJsonErrors = this._getJsonErrors.bind(this)
  }

  _getJsonErrors(res){
    if (res.ok) {
        return res.json();
      }
      throw new Error("Ошибка при загрузке данных");
    }

  getCards() {
    return fetch(this._host + "cards", {
      headers: this._headers,
    })
    .then((res) => this._getJsonErrors(res))
  }

  getUserInfo() {
    return fetch(this._host + "/users/me", {
      method: "GET",
      headers: this._headers,
    })
    .then((res) => this._getJsonErrors(res))
  }

  editUserInfo(data) {
    return fetch(this._host + "users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then((res) => this._getJsonErrors(res))
  }

  createCard(payload) {
    return fetch(this._host + "cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(payload),
    })
    .then((res) => this._getJsonErrors(res))
  }

  setAvatar(data) {
    return fetch(this._host + "users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: data }),
    })
    .then((res) => this._getJsonErrors(res))
  }

  deleteCard(id) {
    return fetch(`${this._host}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => this._getJsonErrors(res))
  }

  toggleLike(id, isLike) {
    return fetch(`${this._host}cards/${id}/likes`, {
      method: isLike ? "DELETE" : "PUT",
      headers: this._headers,
    })
    .then((res) => this._getJsonErrors(res))
  }
}
