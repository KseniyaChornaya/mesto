import './index.css';
import { initialCards } from "../utils/cards.js";
import {
  addCardForm,
  editProfileForm,
  nameInput,
  jobInput,
  popupEdit,
  popupAdd,
  editButton,
  addButton,
  popupImage,
} from "../utils/const.js";
import FormValidator from "../components/FormValidator.js";
import { config } from "../utils/const.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
  validatorAddCard.resetValidation();
});

function handleCardClick() {
  const imagePopup = new PopupWithImage (popupImage)
  imagePopup.openPopup(this._name, this._link);
}

const validatorProfile = new FormValidator(config, editProfileForm);
validatorProfile.enableValidation();

const validatorAddCard = new FormValidator(config, addCardForm);
validatorAddCard.enableValidation();
