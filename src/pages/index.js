import './index.css';
import { initialCards } from "../utils/cards.js";
import {
  cardFormAdd,
  profileFormEdit,
  profileJob,
  profileName,
  popupEdit,
  popupAdd,
  nameInput,
  jobInput,
  buttonEdit,
  buttonAdd,
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
    );
  const cardContainer = cardElement.generateCard();
  return cardContainer;
}

const renderCards  = new Section ({
  items: initialCards,
  renderer: (item)=> {
    renderCards.addItem(createCard(item));
  }
}, '.cards');
renderCards.renderItems();

function handleCardClick() {
  const imagePopup = new PopupWithImage (popupImage)
  imagePopup.openPopup(this._name, this._link);
  imagePopup.setEventListener();

}

const userInfo = new UserInfo(profileName, profileJob);

function handleSendAddForm(formData){
  renderCards.addItem(createCard({name: formData.placeNameInput, link: formData.placeLinkInput}))
}

function handleSendEditForm(formData){
  userInfo.setUserInfo(formData.nameInput, formData.jobInput)
}

  //Form validation
  const validatorProfile = new FormValidator(config, profileFormEdit);
  validatorProfile.enableValidation();
  
  const validatorAddCard = new FormValidator(config, cardFormAdd);
  validatorAddCard.enableValidation();


  const infoUserPopup = new PopupWithForm (popupEdit, handleSendEditForm);
  infoUserPopup.setEventListener();


  const placeAddPopup = new PopupWithForm (popupAdd, handleSendAddForm);
  placeAddPopup.setEventListener();


// to open popups with form
buttonEdit.addEventListener("click", () => {
  const userData =  userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  validatorProfile.resetValidation();
  infoUserPopup.openPopup();
});

buttonAdd.addEventListener("click", () => {
  validatorAddCard.resetValidation();
  placeAddPopup.openPopup();
});
