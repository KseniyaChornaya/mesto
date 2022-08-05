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

  openPopup(){
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
      this._handleSendForm(this._getInputValues());
      this.closePopup();
    })
  }
}