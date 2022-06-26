const addCardForm = document.querySelector("#addForm");
const forms = document.querySelectorAll(".form");
const editProfileForm = document.querySelector("#editForm");
const closePopupButtons = document.querySelectorAll(".popup__close");
const placeImage = document.querySelector("#image .popup__image");
const placeTitle = document.querySelector("#image .popup__title");
const nameInput = document.querySelector(".popup__input_field_name");
const profileName = document.querySelector(".profile__name");
const jobInput = document.querySelector(".popup__input_field_job");
const profileJob = document.querySelector(".profile__job");
const cards = document.querySelector(".cards");
const placeNameInput = document.querySelector(".popup__input_place_name");
const placeLinkInput = document.querySelector(".popup__input_place_link");
const cardTemplate = document.querySelector("#template");
const popupImage = document.querySelector("#image");
const popupEdit = document.querySelector("#edit");
const popupAdd = document.querySelector("#add");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const escKeyButton = 27;
const addSubmitButton = document.querySelector("#addSubmit");