import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSendForm) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputs = this._popupElement.querySelectorAll(".popup__input");
    this._handleSendForm = handleSendForm;
    this._card = null;
  }

  openPopup(card) {
    this._card = card;
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault(); 
      this._handleSendForm(this._card);
    });
  }
}