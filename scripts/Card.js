import {initialCards} from './cards.js';
import {closePopupByEcs} from './index.js';
import {placeImage, placeTitle} from './const.js'

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.addEventListener("click", (e) => {
      const el = e.target;
      if (el.classList.contains("card__like")) {
        this._hadlerLikeCard();
      } else if (el.classList.contains("card__trash")) {
        this._removeCard();
      } else if (el.classList.contains("card__image")) {
        this._openPopupImage();
      }
    });
  }

  _hadlerLikeCard() {
    this._element
      .querySelector(".card__like")
      .classList.toggle("card__like_active");
  }

  _removeCard() {
    this._element.remove();
  }

  _openPopupImage() {
    document.querySelector("#image").classList.add("popup_opened");
    placeImage.src = this._link;
    placeTitle.textContent = this._name;
    placeImage.alt = this._name;
    document.addEventListener("keydown", closePopupByEcs);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__image").alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default function() {
  initialCards.forEach((item) => {
    const card = new Card(item, "#template").generateCard();
    document.querySelector(".cards").prepend(card);
  });
}
