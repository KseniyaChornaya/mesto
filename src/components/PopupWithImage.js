import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super (popupSelector)
        this._title = this._popupElement.querySelector(".popup__title");
        this._image = this._popupElement.querySelector(".popup__image");
    }

    openPopup(name, link) {
        this._image.src = link;
        this._title.textContent = name;
        this._image.alt = name;
        super.openPopup()
    }
}