import { data } from "autoprefixer";
import { placeLinkInput } from "../utils/const";

export default class Api {
    constructor(host, token){
        this._host = host;
        this._token = token;
    }

    getCards(){
        return fetch(this._host + 'cards', {
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

    getUserInfo(){
        return fetch(this._host + '/users/me', {
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

    editUserInfo(data){
        return fetch(this._host + 'users/me', {
            method: 'PATCH',
            headers:{
                authorization: this._token,
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            throw new Error('Ошибка при загрузке данных'); 
        }) 
    }

    createCard(payload){
        return fetch(this._host + 'cards', {
            method: 'POST',
            headers:{
                authorization: this._token,
                'content-type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            throw new Error('Ошибка при загрузке данных'); 
        })
    }

    setAvatar(data){
        return fetch(this._host + 'users/me/avatar', {
            method: 'PATCH',
            headers:{
                authorization: this._token,
                'content-type': 'application/json',
            },
            body: JSON.stringify({avatar: data})
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            throw new Error('Ошибка при загрузке данных'); 
        }) 
    }

    deleteCard(id){
        return fetch(`${this._host}cards/${id}`, {
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

    setLike(id){        
    return fetch(`${this._host}cards/${id}/likes`, {
        method: 'PUT',
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

    deleteLike(id){
        return fetch(`${this._host}cards/${id}/likes`, {
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
}