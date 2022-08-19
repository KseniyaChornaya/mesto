import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSendForm) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputs = this._popupElement.querySelectorAll(".popup__input");
    this._submitButton = this._popupElement.querySelector(".popup__submit");
    this._handleSendForm = handleSendForm;
    this._buttonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((item) => {
      values[item.name] = item.value;
    });
    return values;
  }

  startButtonText(){
    this._submitButton.textContent = this._buttonText;
  }

  openPopup() {
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = "Сохранение ...";
      this._handleSendForm(this._getInputValues());
    });
  }
}
