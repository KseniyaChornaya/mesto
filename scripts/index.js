import { initialCards } from "./cards.js";
import {
  addCardForm,
  placeImage,
  popupImage,
  placeTitle,
  editProfileForm,
  closePopupButtons,
  nameInput,
  profileName,
  jobInput,
  profileJob,
  cards,
  placeNameInput,
  placeLinkInput,
  popupEdit,
  popupAdd,
  editButton,
  addButton,
  escKeyButton,
} from "./const.js";
import { FormValidator } from "./FormValidator.js";
import { config } from "./const.js";
import { Card } from "./Card.js";

function createCard(item) {
  const cardElement = new Card(
    item,
    "#template",
    handleCardClick
  ).generateCard();
  return cardElement;
}

function renderCards() {
  initialCards.forEach((item) => {
    const element = createCard(item);
    cards.prepend(element);
  });
}

renderCards();

function closePopupByEcs(evt) {
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

export function handleCardClick(name, link) {
  placeImage.src = link;
  placeTitle.textContent = name;
  placeImage.alt = name;
  openPopup(popupImage);
}

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const element = createCard(placeNameInput.value, placeLinkInput.value);
  cards.prepend(element);
  closePopup(event.target);
});

editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  inputInf();
  validatorProfile.resetValidation();
});

Array.from(closePopupButtons).forEach(function (element) {
  element.addEventListener("click", (event) => {
    closePopup(event.target);
  });
});

addButton.addEventListener("click", () => {
  openPopup(popupAdd);
  validatorAddCard.resetValidation();
  document.forms["addForm"].reset();
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

const validatorProfile = new FormValidator(config, editProfileForm);
validatorProfile.enableValidation();

const validatorAddCard = new FormValidator(config, addCardForm);
validatorAddCard.enableValidation();
