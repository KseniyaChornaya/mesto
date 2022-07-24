import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleSendForm){
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputs = this._popupElement.querySelectorAll('.popup__input');
    this._handleSendForm = handleSendForm;
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach(item =>{
      values[item.name] = item.value;
    })
    return values
}

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
  
  setEventListener() {
    const self = this;
    document.addEventListener("submit", function submitHandler(evt) {
      evt.preventDefault();
      self._handleSendForm(self._getInputValues());
      self.closePopup();
      this.removeEventListener("submit", submitHandler);
    })
  }
}