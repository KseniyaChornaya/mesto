export const addCardForm = document.querySelector("#addForm");
export const forms = document.querySelectorAll(".form");
export const editProfileForm = document.querySelector("#editForm");
export const closePopupButtons = document.querySelectorAll(".popup__close");
export const placeImage = document.querySelector("#image .popup__image");
export const placeTitle = document.querySelector("#image .popup__title");
export const nameInput = document.querySelector(".popup__input_field_name");
export const profileName = document.querySelector(".profile__name");
export const jobInput = document.querySelector(".popup__input_field_job");
export const profileJob = document.querySelector(".profile__job");
export const cards = document.querySelector(".cards");
export const placeNameInput = document.querySelector(".popup__input_place_name");
export const placeLinkInput = document.querySelector(".popup__input_place_link");
export const cardTemplate = document.querySelector("#template");
export const popupEdit = document.querySelector("#edit");
export const popupAdd = document.querySelector("#add");
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const escKeyButton = 27;
export const addSubmitButton = document.querySelector("#addSubmit");
export const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inputErrorClass: "popup__input_type_error",
    errorActiveClass: "popup__input-error_active",
  };