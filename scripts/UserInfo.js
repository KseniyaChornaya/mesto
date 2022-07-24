export default class UserInfo {
    constructor (nameSelector, jobSelector){
        this._nameInput = document.querySelector(nameSelector);
        this._jobInput = document.querySelector(jobSelector);
        this._profileName = document.querySelector(".profile__name");
        this._profileJob = document.querySelector(".profile__job");
    }

    getUserInfo() {
        this._nameInput.value = this._profileName.textContent;
        this._jobInput.value = this._profileJob.textContent;
    }

    setUserInfo() {
        this._profileName.textContent = this._nameInput.value;
        this._profileJob.textContent = this._jobInput.value;
    }
}