const hideInputError = (inputElement, formElement, config) => {
    const { inputErrorClass, errorActiveClass } = config;
    inputElement.classList.remove(inputErrorClass);
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(errorActiveClass);
};

const showInpurError = (inputElement, formElement, config) => {
    const { inputErrorClass, errorActiveClass } = config;
    inputElement.classList.add(inputErrorClass);
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorActiveClass);
};

const checkInputValidity = (inputElement, formElement, config) => {

    if (inputElement.validity.valid) {
        hideInputError(inputElement, formElement, config);
    } else {
        showInpurError(inputElement, formElement, config);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (buttonElement, inputList) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement, config) => {
    const { inputSelector, submitButtonSelector, ...restConfig } = config;

        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
    });

    const buttonElement = formElement.querySelector(submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
        checkInputValidity(inputElement, formElement, restConfig);
        toggleButtonState(buttonElement, inputList);
        });
    });
    toggleButtonState(buttonElement, inputList);
};

const enableValidation = (config) => {
    const { formSelector, ...restConfig } = config;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, restConfig);
    });
};
