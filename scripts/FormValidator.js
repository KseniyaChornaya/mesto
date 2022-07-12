export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );
    this._inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._config.errorActiveClass);
  }

  _showInpurError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._config.errorActiveClass);
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInpurError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._toggleButtonState();
    this._setEventListeners();
  }
}
