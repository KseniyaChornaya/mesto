const forms = document.querySelectorAll('form')
const closePopupButtons = document.querySelectorAll('.popup__close')
const placeImage = document.querySelector('#image .popup__image')
const placeTitle = document.querySelector('#image .popup__title')


const nameInput = document.querySelector('.popup__input_field_name')
const profileName = document.querySelector('.profile__name')

const jobInput = document.querySelector('.popup__input_field_job')
const profileJob = document.querySelector('.profile__job')

const cards = document.querySelector('.cards')
const cardDeleteButton = document.querySelector('.card__trash')
const cardLikeButton = document.querySelector('.card__like')

const placeNameInput = document.querySelector('.popup__input_place_name')
const placeLinkInput = document.querySelector('.popup__input_place_link')
const card = document.querySelector('.card')
const cardTemplate = document.querySelector('#template')
const popupImage = document.querySelector('#image')
const popup = document.querySelector('.popup')
const popupEdit = document.querySelector('#edit')
const popupAdd = document.querySelector('#add')
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')

function openPopup(popupEl) {
  popupEl.classList.add('popup_opened')
}

function openPopupImage(imageEl){
  placeImage.src = imageEl.src
  placeTitle.textContent = imageEl.alt
  placeImage.alt = imageEl.alt
  openPopup(popupImage)
}

function removeCard(element) {
  element.closest('.card').remove()
} 

function likeCard(element) {
  element.closest('.card__like').classList.toggle('card__like_active')
}

function createCardElement(name, link) {
    const cardElement = cardTemplate.content.cloneNode(true)
    cardElement.querySelector('.card__title').textContent = name
    cardElement.querySelector('.card__image').src = link
    cardElement.querySelector('.card__image').alt = name
    cardElement.querySelector('.card').addEventListener('click', (e) => {
      const el = e.target
      if (el.classList.contains('card__like')){
        likeCard(el) 
      } else if (el.classList.contains('card__trash')) {
        removeCard(el);
      } else if (el.classList.contains('card__image')){
        openPopupImage(el)
      }
    });
   return cardElement

 }


function generateCards() {
  cards.innerHTML = ''
  initialCards.forEach((item) => {
    const element = createCardElement(item.name, item.link) 
    cards.prepend(element)
  });
}

generateCards()

function addCard() {
    const element = createCardElement(placeNameInput.value, placeLinkInput.value)  
    cards.prepend(element) 
}


function closePopup(popup){
    popup.closest('.popup').classList.remove('popup_opened')
}

function inputInf(){
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function savePersonData () {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

forms.forEach(function(element) {
    element.addEventListener('submit', event => {
        event.preventDefault()
        if(event.target.closest('#edit')) {
            savePersonData()
            closePopup(event.target)
        } else if (event.target.closest('#add')) {
            addCard()
            closePopup(event.target)
            document.forms['addForm'].reset()
        }
    });
});

editButton.addEventListener('click',() => {
  openPopup(popupEdit)
  inputInf()
});

addButton.addEventListener('click',() => {
  openPopup(popupAdd)
})

Array.from(closePopupButtons).forEach(function(element) {
    element.addEventListener('click', event => {
        closePopup(event.target)
    });
});
