export default class Card {
  constructor(data, cardSelector, handleCardClick, deleteServerCard) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteServerCard = deleteServerCard;
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
      this._handleCardClick(this._name, this._link);
    })
    }

  _handlerLikeCard() {
    let count;

    this._cardLike.addEventListener('click', () => {
      if(this._cardLike.classList.contains("card__like_active")) {
        this._cardLike.classList.remove("card__like_active");
        count -= 1;
        } else {
        count += 1;
        this._cardLike.classList.add("card__like_active");
        }
    })
  }

  async _removeCard() {
    try {
      await this._deleteServerCard()
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

    this._setEventListeners();

    return this._element;
  }
}
