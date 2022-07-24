import { escKeyButton } from "../utils/const.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupOpened = false;
  }

  openPopup() {
    this._popupElement.classList.add("popup_opened");
    this._popupOpened = true;
    document.addEventListener("keydown", (evt) => this._closePopupByEcs(evt));
    this._setEventListener();
  }

  closePopup() {
    this._popupElement.classList.remove("popup_opened");
    this._popupOpened = false;
    document.removeEventListener("keydown", this._closePopupByEcs);
  }

  _closePopupByEcs(evt) {
    if (evt.keyCode === escKeyButton) {
      this.closePopup();
    }
  }

  _setEventListener() {
    document.addEventListener("click", (evt) => {
      if (
        document.querySelector(".popup_opened") !== null &&
        !(evt.target.closest(".popup__container") !== null)
      ) {
        if (evt.target.closest(".popup") !== null) {
          this.closePopup();
        }
      }
    });
    this._popupElement.querySelector(".popup__close").addEventListener('click', () => this.closePopup());
  }
}
