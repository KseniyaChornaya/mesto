export default class Api {
    constructor(host, token){
        this._host = host;
        this._token = token;
    }

    getCards(){
        return fetch(`${this._host}/cards`, {
            headers:{
                authorization: this._token,
            },
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            throw new Error('Ошибка при загрузке данных'); 
        })
    }

    createCard(payload){
        return fetch(`${this._host}cards`, {
            method: 'POST',
            headers:{
                authorization: this._token,
                'content-type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (res.ok) {
                console.log(res.json());
                return res.json();
            }

            throw new Error('Ошибка при загрузке данных'); 
        })
    }

    deleteCard(id){
        console.log(id)
        return fetch(`${this._host}/cards/${id}`, {
            method: 'DELETE',
            headers:{
                authorization: this._token,
                'content-type': 'application/json',
            },
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            throw new Error('Ошибка при загрузке данных'); 
        })
    }

    getUserInfo(){
        return fetch(`${this._host}/users/me`, {
            method: 'GET',
            headers:{
                authorization: this._token,
                'content-type': 'application/json',
            },
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            throw new Error('Ошибка при загрузке данных'); 
        }) 
    }
}