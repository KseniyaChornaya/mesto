import "./index.css";
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
  avatarProfile,
  submitAddButton,
  submitEditButton,
  submitAvatarButtom
} from "../utils/const.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import { config } from "../utils/const.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import UserInfo from "../components/UserInfo.js";
import { data } from "autoprefixer";

const api = new Api(config.host, config.headers);

let userId;

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([data, initialCards]) => {
    userInfo.setUserInfo(data);
    userId = data._id;
    renderCards.setItems(initialCards);
    renderCards.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

function createCard(item) {
  const cardElement = new Card(
    item,
    "#template",
    handleCardClick,
    openDeletePopup,
    userId,
    handlerLikeButton
  );
  const cardContainer = cardElement.generateCard();
  return cardContainer;
}

const renderCards = new Section(
  {
    renderer: (item) => {
      renderCards.addItem(createCard(item));
    },
  },
  ".cards"
);

const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListener();

function handleCardClick(name, link) {
  imagePopup.openPopup(name, link);
}

const userInfo = new UserInfo(profileName, profileJob, avatarProfile);

// добавляем карточку через сервер
function handleSendAddForm(formData) {
  api
    .createCard({
      name: formData.placeNameInput,
      link: formData.placeLinkInput,
    })
    .then((data) => {
      renderCards.addItem(createCard(data));
      placeAddPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitAddButton.textContent = "Cоздать"
    })
}

// обновляем профиль
function handleSendEditForm(formData) {
  api
    .editUserInfo({ name: formData.nameInput, about: formData.jobInput })
    .then((res) => {
      userInfo.setUserInfo(res);
      infoUserPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitEditButton.textContent = "Cохранить"
    })
}

function openDeletePopup(card) {
  confirmPopup.openPopup(card);
}

// удаляем карточку
function handleSendConfirmation(card) {
  api
    .deleteCard(card._data._id)
    .then(() => {
      card.deleteCard();
      confirmPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    });
}


//toggle likes
function handlerLikeButton(card) {
  const likeToggle = api.toggleLike(card._data._id, card._isLiked);
  likeToggle
    .then((res) => {
      card.setServerLike(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Avatar
function handleEditAvatar(formData) {
  api.setAvatar(formData.linkInput)
    .then((res) => {
      userInfo.setUserInfo(res.avatar);
      avatarEditPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitAvatarButtom.textContent = "Сохранить"
    })
}

//Form validation
const validatorProfile = new FormValidator(config, profileFormEdit);
validatorProfile.enableValidation();

const validatorAddCard = new FormValidator(config, cardFormAdd);
validatorAddCard.enableValidation();

const validatorEditAvatar = new FormValidator(config, avatarEditForm);
validatorEditAvatar.enableValidation();

//создание экземпляров классов Popup
const infoUserPopup = new PopupWithForm(popupEdit, handleSendEditForm);
infoUserPopup.setEventListener();

const placeAddPopup = new PopupWithForm(popupAdd, handleSendAddForm);
placeAddPopup.setEventListener();

const avatarEditPopup = new PopupWithForm(popupAvatar, handleEditAvatar);
avatarEditPopup.setEventListener();

const confirmPopup = new PopupWithConfirmation(
  popupConfirm,
  handleSendConfirmation
);
confirmPopup.setEventListener();

// to open popups with form
buttonEdit.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  validatorProfile.resetValidation();
  infoUserPopup.openPopup();
});

buttonAdd.addEventListener("click", () => {
  validatorAddCard.resetValidation();
  placeAddPopup.openPopup();
});

avatarEditButton.addEventListener("click", () => {
  validatorEditAvatar.resetValidation();
  avatarEditPopup.openPopup();
});