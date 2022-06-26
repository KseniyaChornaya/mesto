function closePopupEcs(evt) {
  if (evt.keyCode === escKeyButton) {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

function openPopup(popupEl) {
  popupEl.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEcs);
}

function openPopupImage(imageEl) {
  placeImage.src = imageEl.src;
  placeTitle.textContent = imageEl.alt;
  placeImage.alt = imageEl.alt;
  openPopup(popupImage);
}

function removeCard(element) {
  element.closest(".card").remove();
}

function likeCard(element) {
  element.closest(".card__like").classList.toggle("card__like_active");
}

function createCardElement(name, link) {
  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card").addEventListener("click", (e) => {
    const el = e.target;
    if (el.classList.contains("card__like")) {
      likeCard(el);
    } else if (el.classList.contains("card__trash")) {
      removeCard(el);
    } else if (el.classList.contains("card__image")) {
      openPopupImage(el);
    }
  });
  return cardElement;
}

function generateCards() {
  cards.innerHTML = "";
  initialCards.forEach((item) => {
    addCard(item.name, item.link);
  });
}

generateCards();

function addCard(placeName, placeLink) {
  const element = createCardElement(placeName, placeLink);
  cards.prepend(element);
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
  addCard(placeNameInput.value, placeLinkInput.value);
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
  document.removeEventListener("keydown", closePopupEcs);
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

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inputErrorClass: "popup__input_type_error",
  errorActiveClass: "popup__input-error_active",
});
