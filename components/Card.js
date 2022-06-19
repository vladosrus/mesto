import { popupZoom, popupZoomImg, popupZoomText } from "../utils/constants.js";
import { openPopup } from "../pages/index.js";

export default class Card {
  constructor(initialCards, cardSelector) {
    this._title = initialCards.name;
    this._link = initialCards.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardTemplate;
  }

  _handleDeliteCard(evt) {
    evt.target.closest(".element").remove();
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle("element__like-botton_active");
  }

  _setEventListeners() {
    //Функция лайков
    this._card
      .querySelector(".element__like-botton")
      .addEventListener("click", this._handleLikeCard);

    //Функция удаления карточек
    this._card
      .querySelector(".element__basket-botton")
      .addEventListener("click", this._handleDeliteCard);

    //Увеличение фотографии
    this._newCardImage.addEventListener("click", () => {
      openPopup(popupZoom);
      popupZoomImg.src = this._newCardImage.src;
      popupZoomImg.alt = this._newCardImage.alt;
      popupZoomText.textContent = this._newCardTitle.textContent;
    });
  }

  generateNewCard() {
    this._card = this._getTemplate();
    this._newCardTitle = this._card.querySelector(".element__title");
    this._newCardTitle.textContent = this._title;
    this._newCardImage = this._card.querySelector(".element__image");
    this._newCardImage.src = this._link;
    this._newCardImage.alt = this._title;

    this._setEventListeners();

    return this._card;
  }
}
