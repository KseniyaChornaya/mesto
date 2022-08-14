import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSendForm, buttonText = "Сохранить") {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputs = this._popupElement.querySelectorAll(".popup__input");
    this._submitButton = this._popupElement.querySelector(".popup__submit");
    this._handleSendForm = handleSendForm;
    this._buttonText = buttonText;
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((item) => {
      values[item.name] = item.value;
    });
    return values;
  }

  openPopup() {
    super.openPopup();
    this._submitButton.textContent = this._buttonText;
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener("submit", (evt) => {
      if (this._buttonText !== "Да") {
        this._submitButton.textContent = "Сохранение ...";
      }
      evt.preventDefault();
      this._handleSendForm(this._getInputValues());
      this.closePopup();
    });
  }
}
