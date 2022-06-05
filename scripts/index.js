const forms = document.querySelectorAll('form')
const popups = document.querySelectorAll('[data-popup]')
const closePopupButtons = document.querySelectorAll('.popup__close')
let images = document.querySelectorAll('.card__image')

const nameInput = document.querySelector('.popup__input_field_name')
const profileName = document.querySelector('.profile__name')

const jobInput = document.querySelector('.popup__input_field_job')
const profileJob = document.querySelector('.profile__job')

const cards = document.querySelector('.cards')
let cardsDeleteButton = document.querySelector('.card__trash')
let cardLikeButton = document.querySelector('.card__like')

const placeNameInput = document.querySelector('.popup__input_place_name')
const placeLinkInput = document.querySelector('.popup__input_place_link')

function generateCards() {
    const card = document.querySelector('.card')
    initialCards.map(item => {
        card.querySelector('.card__title').textContent = item.name
        card.querySelector('.card__image').src = item.link
        let clone = card.cloneNode(true)
        cards.prepend(clone);
    })
    card.remove();
    addListenersRemove();
    addListenerImage();
}

generateCards();

function addCard() {
    const card = document.querySelector('.card')
    let clone = card.cloneNode(true)
    clone.querySelector('.card__title').textContent = placeNameInput.value
    clone.querySelector('.card__image').src = placeLinkInput.value
    cards.prepend(clone);
    addListenersRemove()
}

function removeCard(elem) {
    elem.closest('.card').remove()
}

function likeCard(elem) {
    elem.closest('.card__like').classList.add('card__like_active')
}

function openPopup(popupId, data, name){
    const popupEl = document.querySelector(`#${popupId}`);
    popupEl.classList.add('popup_opened');
    if(popupId === 'edit'){
        inputInf()
    } else if(popupId === 'image'){
        popupEl.querySelector('.popup__image').src = data.src
        popupEl.querySelector('.popup__title').textContent = name
    }
}

function closePopup(popupElement){
    popupElement.closest('.popup').classList.remove('popup_opened')
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

function addListenerImage() {
    images = document.querySelectorAll('.card__image')
    Array.from(images).forEach(function(element) {
        element.addEventListener('click', event => {
            let name = event.target.closest('.card').querySelector('.card__title').textContent
            openPopup(event.target.dataset.popup, event.target, name)
        });
    });
}
addListenerImage();

function addListenersRemove() {
    cardsDeleteButtons = document.querySelectorAll('.card__trash')
    Array.from(cardsDeleteButtons).forEach(function(element) {
        element.addEventListener('click', event => {
            removeCard(event.target)
        });
    });
}
addListenersRemove()

function addListenerLike(){
    cardLikeButton = document.querySelectorAll('.card__like')
    Array.from(cardLikeButton).forEach(function(element) {
        element.addEventListener('click', event => {
            likeCard(event.target)
        });
    });
}

addListenerLike()
