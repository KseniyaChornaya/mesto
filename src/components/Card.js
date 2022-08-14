import Api from "./Api";

export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    openDeletePopup,
    ownerId,
    handlerLikeButton
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._openDeletePopup = openDeletePopup;
    this._likes = data.likes;
    this._ownerId = ownerId;
    this._handlerLikeButton = handlerLikeButton;
    this._isLiked = false;
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
      this._handlerLikeButton(this);
    });
    this._cardDelete.addEventListener("click", () => {
      this._openDeletePopup(this._data._id);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _countLikes(count) {
    this._element.querySelector(".card__like-counter").textContent = count;
  }

  setServerLike(data) {
    this._cardLike = this._element.querySelector(".card__like");

    this._isLiked = data?.likes.some((obj) => {
      return obj._id === this._ownerId;
    });
    this._countLikes(data?.likes.length);
    this._isLiked
      ? this._cardLike.classList.add("card__like_active")
      : this._cardLike.classList.remove("card__like_active");
  }

  _checkId() {
    this._cardDelete = this._element.querySelector(".card__trash");
    if (this._ownerId !== this._data.owner._id) {
      this._cardDelete.classList.add("card__trash_hidden");
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.alt = this._name;
    this._countLikes(this._data?.likes?.length);
    this.setServerLike(this._data);
    this._checkId();
    this._setEventListeners();

    return this._element;
  }
}
