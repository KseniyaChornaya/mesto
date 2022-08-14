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


const api  = new Api(config.host, config.token);

let ownerId

function getUserInfo(){
  api.getUserInfo()
  .then((data)=> {
    userInfo.setUserInfo(data);
    ownerId = data._id; 
  })
  .catch((err) => console.log(err));
}

getUserInfo();

// Получаем карточки с сервера
function getCards(){
  api.getCards()
  .then((items) => {
    renderCards.setItems(items);
    renderCards.renderItems();
  })
}

getCards();

function createCard(item) {
  const cardElement = new Card (
    item,
    "#template", 
    handleCardClick,
    openDeletePopup,
    ownerId,
    {handlerLikeButton: ()=> handlerLikeButton(cardElement, item)}
    );
  const cardContainer = cardElement.generateCard();
  return cardContainer;
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
  api.createCard({name: formData.placeNameInput, link: formData.placeLinkInput})
  .then((data) => {
    renderCards.addItem(createCard(data))
  })
}

// обновляем профиль
function handleSendEditForm(formData){
  api.editUserInfo({name:formData.nameInput, about:formData.jobInput})
  .then((res) =>{
    userInfo.setUserInfo(res)
  })
  
}

// удаляем карточку
function handleSendConfirmation(id){
  api.deleteCard(id)
  .then(()=> {
    getCards();
  })
}

// api likes
const serverLikes = {
  setLike: (id) => {
    api.setLike(id);
  },
  deleteLike: (id) => {
    api.deleteLike(id);
  }
}

//toggle likes
function handlerLikeButton(card, data){
    const likeToggle = card.isLiked() ? api.deleteLike(data._id) : api.setLike(data._id);
    likeToggle
    .then((res) =>{
      card.setLikes(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  // Avatar
  function handleEditAvatar(formData){
    api.setAvatar(formData.linkInput)
    .then((res)=>{
      userInfo.setUserAvatar(res.avatar);
    })
    avatarEditPopup.closePopup();
  }

  //Form validation
  const validatorProfile = new FormValidator(config, profileFormEdit);
  validatorProfile.enableValidation();
  
  const validatorAddCard = new FormValidator(config, cardFormAdd);
  validatorAddCard.enableValidation();

  const validatorEditAvatar = new FormValidator(config, avatarEditForm); 
  validatorEditAvatar.enableValidation();

//создание экщемпляров класса Popup
  const infoUserPopup = new PopupWithForm (popupEdit, handleSendEditForm);
  infoUserPopup.setEventListener();


  const placeAddPopup = new PopupWithForm (popupAdd, handleSendAddForm);
  placeAddPopup.setEventListener();


  const avatarEditPopup = new PopupWithForm(popupAvatar, handleEditAvatar);
  avatarEditPopup.setEventListener();
  avatarEditButton.addEventListener('click', ()=>  {
    validatorEditAvatar.resetValidation();
    avatarEditPopup.openPopup();
  })

  function openDeletePopup(id) {
  const confirmPopup = new PopupWithForm(popupConfirm, () => handleSendConfirmation(id));
  confirmPopup.setEventListener();
  confirmPopup.openPopup();
  console.log(id);
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



