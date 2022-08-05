import { escKeyButton } from "../utils/const.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  closePopup() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleOverlayClose(evt){
    if (
      this._popupElement.classList.contains(".popup_opened") !== null &&
      !(evt.target.closest(".popup__container") !== null)
    ) {
      if (evt.target.closest(".popup") !== null) {
        this.closePopup();
      }
    }
}

  _handleEscClose(evt) {
    if (evt.keyCode === escKeyButton) {
      this.closePopup();
    }
  }

  setEventListener() {
    this._popupElement.addEventListener("click", (evt) => {
      this._handleOverlayClose(evt);
        })
    this._popupElement.querySelector(".popup__close").addEventListener('click', () => this.closePopup());
  }
}
