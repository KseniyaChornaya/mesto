import { initialCards } from "./cards.js";
import {
  addCardForm,
  editProfileForm,
  cards,
  nameInput,
  jobInput,
  placeNameInput,
  placeLinkInput,
  popupEdit,
  popupAdd,
  editButton,
  addButton,
  popupImage,
  profileName,
  profileJob,
} from "./const.js";
import FormValidator from "./FormValidator.js";
import { config } from "./const.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

function createCard(item) {
  const cardElement = new Card (
    item, 
    "#template", 
    handleCardClick
    ).generateCard();

  renderCards.addItem(cardElement);
}

const renderCards  = new Section ({
  items: initialCards,
  renderer: (element)=> {
    createCard(element);
  }
}, '.cards');

renderCards.renderItems();

// function inputInf() {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
// }

// inputInf();
const saveUserInfo = new UserInfo (nameInput, jobInput);

function savePersonData() {
  saveUserInfo.setUserInfo();
}

function handleSendAddForm(formData){
  createCard({name: formData.placeNameInput, link: formData.placeLinkInput});
}

function handleSendEditForm(){
  savePersonData();
}

editButton.addEventListener("click", () => {
  const editPopup = new PopupWithForm (popupEdit, handleSendEditForm);
  editPopup.openPopup();
  editPopup.setEventListener();
  saveUserInfo.getUserInfo();
  validatorProfile.resetValidation();
});

addButton.addEventListener("click", () => {
  const addPopup = new PopupWithForm (popupAdd, handleSendAddForm);
  addPopup.openPopup();
  addPopup.setEventListener();
  //validatorAddCard.resetValidation();
});

function handleCardClick() {
  const imagePopup = new PopupWithImage (popupImage)
  imagePopup.openPopup(this._name, this._link);
}

// editProfileForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   savePersonData();
// });

// addCardForm.addEventListener("submit", (event) => {
//   event.preventDefault();
  // const element = createCard(placeNameInput.value, placeLinkInput.value);
  // cards.prepend(element);
// });

const validatorProfile = new FormValidator(config, editProfileForm);
validatorProfile.enableValidation();

const validatorAddCard = new FormValidator(config, addCardForm);
validatorAddCard.enableValidation();
