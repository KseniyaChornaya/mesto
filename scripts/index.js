const editButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const closePopupButton = document.querySelector('.popup__close')

const nameInput = document.querySelector('.popup_field_name')
const profileName = document.querySelector('.profile__name')

const jobInput = document.querySelector('.popup_field_job')
const profileJob = document.querySelector('.profile__job')

const formElement = document.querySelector('.popup__form')

function openPopup(popupElement){
    popupElement.classList.add('popup_opened')
}

function closePopup(popupElement){
    popupElement.classList.remove('popup_opened')
}

function inputInf(){
    openPopup(popup)
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

editButton.addEventListener('click',inputInf)

closePopupButton.addEventListener('click', function(){
    closePopup(popup)
})


function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popup)
}

formElement.addEventListener('submit', formSubmitHandler); 