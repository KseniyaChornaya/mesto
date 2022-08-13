import './index.css';
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
  popupAvatar,
  popupConf,
  avatarEditForm,
  avatarEditButton
} from "../utils/const.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import { config } from "../utils/const.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const api  = new Api(config.host, config.token);

// Получаем карточки с сервера
api.getCards()
  .then((items) => {
    renderCards.setItems(items);
    renderCards.renderItems();
  })

function createCard(item) {
  const cardElement = new Card (
    item,
    "#template", 
    handleCardClick,
    removeCard,
    );
  const cardContainer = cardElement.generateCard();
  return cardContainer;
}

function removeCard(id){
  return api.deleteCard(id);
}


const renderCards  = new Section ({
  renderer: (item)=> {
    renderCards.addItem(createCard(item));
  }
}, '.cards');



const imagePopup = new PopupWithImage (popupImage)
imagePopup.setEventListener();


function handleCardClick(name, link) {
  imagePopup.openPopup(name, link);
}

const userInfo = new UserInfo(profileName, profileJob);

function handleSendAddForm(formData){
  let card
  api.createCard({name: formData.placeNameInput, link: formData.placeLinkInput})
  .then((data) => {
    card = data;
  })
  console.log(card);
  renderCards.addItem(createCard({name: formData.placeNameInput, link: formData.placeLinkInput}))
}

function handleSendEditForm(formData){
  userInfo.setUserInfo(formData.nameInput, formData.jobInput)
}

function handleEditAvatar(formData){

}


// function handleSendConfirmation()

  //Form validation
  const validatorProfile = new FormValidator(config, profileFormEdit);
  validatorProfile.enableValidation();
  
  const validatorAddCard = new FormValidator(config, cardFormAdd);
  validatorAddCard.enableValidation();

  const validatorEditAvatar = new FormValidator(config, avatarEditForm); 
  validatorEditAvatar.enableValidation();


  const infoUserPopup = new PopupWithForm (popupEdit, handleSendEditForm);
  infoUserPopup.setEventListener();


  const placeAddPopup = new PopupWithForm (popupAdd, handleSendAddForm);
  placeAddPopup.setEventListener();

  const avatarEditPopup = new PopupWithForm(popupAvatar, handleEditAvatar);
  avatarEditPopup.setEventListener();

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

avatarEditButton.addEventListener('click', ()=>  {
  validatorEditAvatar.resetValidation();
  popupAvatar.openPopup();
})