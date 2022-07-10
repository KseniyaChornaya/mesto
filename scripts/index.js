import renderCards from './Card.js';
import {addCardForm, editProfileForm, closePopupButtons, nameInput, profileName, jobInput, profileJob, placeNameInput, placeLinkInput, popupEdit, popupAdd, editButton, addButton, escKeyButton, addSubmitButton} from './const.js';
import { FormValidator } from './FormValidator.js';
renderCards();
import { config } from './const.js';
import { Card } from './Card.js';

export function closePopupByEcs(evt) {
  if (evt.keyCode === escKeyButton) {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

function openPopup(popupEl) {
  popupEl.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEcs);
}

function inputInf() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

inputInf();

function savePersonData() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  savePersonData();
  closePopup(event.target);
});

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const card = new Card({name:placeNameInput.value, link:placeLinkInput.value}, "#template").generateCard();
  document.querySelector(".cards").prepend(card);

  closePopup(event.target);
  document.forms["addForm"].reset();
  addSubmitButton.disabled = true;
});

editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  inputInf();
});

Array.from(closePopupButtons).forEach(function (element) {
  element.addEventListener("click", (event) => {
    closePopup(event.target);
  });
});

addButton.addEventListener("click", () => {
  openPopup(popupAdd);
});

function closePopup(popup) {
  popup.closest(".popup").classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEcs);
}

document.addEventListener("click", function (evt) {
  if (
    document.querySelector(".popup_opened") !== null &&
    !(evt.target.closest(".popup__container") !== null)
  ) {
    if (evt.target.closest(".popup") !== null) {
      closePopup(evt.target);
    }
  }
});

const validatorProfile = new FormValidator(config, editProfileForm).enableValidation();

const validatorAddCard = new FormValidator(config, addCardForm).enableValidation();
