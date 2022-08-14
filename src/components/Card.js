export default class Card {
  constructor(data, cardSelector, handleCardClick, deleteServerCard, likes, openDeletePopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteServerCard = deleteServerCard;
    this._likes = data.likes;
    // this._userId = userId;

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
    this._cardLike.addEventListener("click", (e) => {
      this._handlerLikeCard();
    })
    this._cardDelete.addEventListener("click", (e) => {
      this._removeCard();
    })
    this._cardImage.addEventListener("click", (e) => {
      this._handleCardClick(this._name, this._link);
    })
    }

  _countLikes(){
    if (this._likes.length > 0){
      this._element.querySelector('.card__like-counter').textContent = this._likes.length;
    }
  }

  // _checkLike(){
  //   const like  = this._likes.some(item => item._id === this._userId);
  //   if (like) {
  //     this._cardLike.classList.add("card__like_active");
  //   }
  // }
  
  // _checkId(){
  //   if (this._userId !== this._owner._id){
  //     this._cardDelete.classList.add('card__trash_hidden')
  //   }
  // }

  _handlerLikeCard() {
    this._cardLike.classList.toggle("card__like_active");
  }

  async _removeCard() {
    try {
      await this.deleteServerCard()
      this._element.remove();
  }
    catch(error){
      console.log(error);
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.alt = this._name;
    this._countLikes();
    this._setEventListeners();

    return this._element;
  }
}
