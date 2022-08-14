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
  popupConfirm,
  avatarEditForm,
  avatarEditButton,
  confirmButton,
  avatarInput,
  avatarProfile,
} from "../utils/const.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import { config } from "../utils/const.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { data } from 'autoprefixer';

let userId

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

api.getUserInfo()
  .then((data)=> {
    userInfo.setUserInfo(data.name, data.about);
  })
  .catch((err) => console.log(err));

function removeCard(id){
  console.log(id);
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

const userInfo = new UserInfo(profileName, profileJob, avatarProfile);


// добавляем карточку через сервер
function handleSendAddForm(formData){
  let card
  api.createCard({name: formData.placeNameInput, link: formData.placeLinkInput})
  .then((data) => {
    card = data;
  })
  console.log(card)
  renderCards.addItem(createCard({name: formData.placeNameInput, link: formData.placeLinkInput}))
}

function handleSendEditForm(formData){
  api.editUserInfo({name:formData.nameInput, about:formData.jobInput})
  .then((response) =>{
    userInfo.setUserInfo(response.name, response.about)
  })
  
}


function handleSendConfirmation(){
  
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


  // Avatar
  function handleEditAvatar(formData){
    api.setAvatar(formData.linkInput)
    .then((res)=>{
      userInfo.setUserAvatar(res.avatar);
    })
    avatarEditPopup.closePopup();
  }

  const validatorEditAvatar = new FormValidator(config, avatarEditForm); 
  validatorEditAvatar.enableValidation();

  const avatarEditPopup = new PopupWithForm(popupAvatar, handleEditAvatar);
  avatarEditPopup.setEventListener();
  avatarEditButton.addEventListener('click', ()=>  {
    validatorEditAvatar.resetValidation();
    avatarEditPopup.openPopup();
  })

  function openDeletePopup() {
  const confirmPopup = new PopupWithForm(popupConfirm, handleSendConfirmation);
  confirmPopup.setEventListener();
  }

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



