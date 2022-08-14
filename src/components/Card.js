import Api from "./Api";

export default class Card {
  constructor(data, cardSelector, handleCardClick, openDeletePopup, ownerId, handlerLikeButton) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._openDeletePopup = openDeletePopup;
    this._likes = data.likes;
    this._ownerId = ownerId;
    this._handlerLikeButton = handlerLikeButton;

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._cardLike = this._element.querySelector(".card__like");
    this._cardDelete = this._element.querySelector(".card__trash");
    this._cardLike.addEventListener("click", () => {
      this._handlerLikeButton();
    })
    this._cardDelete.addEventListener("click", () => {
      this._openDeletePopup(this._data._id);
    })
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    })
    }

  _countLikes(){
    if (this._likes && this._likes.length > 0){
      this._element.querySelector('.card__like-counter').textContent = this._likes.length;
    }
  }

  setServerLike(data){
    this._isLiked = data.likes.some((obj)=>{
      return obj._id === this._ownerId;
    })
    this._likesCounter = data.likes.length;
    this._isLiked ?
      this._cardLike.classList.add("card__like_active") :
      this._cardLike.classList.remove("card__like_active");

    // const like  = this._likes.some(item => item._id === this._ownerId);
    // console.log(item._id)
    // if (like) {
    //   this._cardLike.classList.add("card__like_active");
    // }
  }
   
    isLiked(){
      return this._isLiked;
    }

  _checkId(){
    this._cardDelete = this._element.querySelector(".card__trash");
    if (this._ownerId !== this._data.owner._id){
      this._cardDelete.classList.add('card__trash_hidden');
    }
  }

  // _handlerLikeCard() {
  //   this._handlerLike(this._data._id, this._isLiked);
  // }

  // async _removeCard() {
  //   try {
  //     await this.deleteServerCard()
  //     this._element.remove();
  // }
  //   catch(error){
  //     console.log(error);
  //   }
  // }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.alt = this._name;
    this._countLikes();
    // this.setServerLike();
    // this._checkLike();
    this._checkId();
    this._setEventListeners();

    return this._element;
  }
}
