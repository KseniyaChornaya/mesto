export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardLike.addEventListener("click", (e) => {
      this._handlerLikeCard();
    })
    this._element.querySelector(".card__trash").addEventListener("click", (e) => {
      this._removeCard();
    })
    this._cardImage.addEventListener("click", (e) => {
      this._handleCardClick(e);
    })
    }

  _handlerLikeCard() {
    this._cardLike.classList.toggle("card__like_active");
  }

  _removeCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
