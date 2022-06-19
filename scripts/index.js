const forms = document.querySelectorAll('form')
const popups = document.querySelectorAll('[data-popup]')
const closePopupButtons = document.querySelectorAll('.popup__close')
const images = document.querySelectorAll('.card__image')

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


function createCardElement(name, link) {
    const cardElement = cardTemplate.content.cloneNode(true)
    cardElement.querySelector('.card__title').textContent = name
    cardElement.querySelector('.card__image').src = link
    cardElement.querySelector('.card__title').alt = name

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
    initialCards.push({
      name: placeNameInput.value,
      link: placeLinkInput.value
    })

    generateCards()
}

function removeCard(element) {
    element.closest('.card').remove()
} 

function likeCard(element) {
    element.closest('.card__like').classList.toggle('card__like_active')
}

function openPopup(popupId, data, name){
  const popup = document.querySelector(`#${popupId}`)
    popup.classList.add('popup_opened');
    if(popupId === 'edit'){
        inputInf()
    } else if(popupId === 'image'){
        popup.querySelector('.popup__image').src = data.src
        popup.querySelector('.popup__title').textContent = name
    }
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

Array.from(popups).forEach(function(element) {
    element.addEventListener('click', event => {
        openPopup(event.target.dataset.popup, event.target)
    });
});

Array.from(closePopupButtons).forEach(function(element) {
    element.addEventListener('click', event => {
        closePopup(event.target)
    });
});

cards.addEventListener('click', (e) => {
  const el = e.target
  if (el.classList.contains('card__like')){
    likeCard(el) 
  } else if (el.classList.contains('card__trash')) {
    removeCard(el);
  } else if (el.classList.contains('card__image')){
    let name = e.target.closest('.card').querySelector('.card__title').textContent
    openPopup(e.target.dataset.popup, e.target, name)
  }
});
