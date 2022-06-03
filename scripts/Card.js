import { openPopup, popupZoom, popupZoomImg, popupZoomText } from "./index.js";

export default class Card {
  constructor(initialCards, cardSelector) {
    this._title = initialCards.name;
    this._link = initialCards.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector("#card")
      .content.querySelector(".element");
    const newCard = cardTemplate.cloneNode(true);
    return newCard;
  }
  generateNewCard() {
    this._card = this._getTemplate();
    const newCardTitle = this._card.querySelector(".element__title");
    newCardTitle.textContent = this._title;
    const newCardImage = this._card.querySelector(".element__image");
    newCardImage.src = this._link;
    newCardImage.alt = this._title;
    //Функция лайков
    this._card
      .querySelector(".element__like-botton")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("element__like-botton_active");
      });

    //Функция удаления карточек
    this._card
      .querySelector(".element__basket-botton")
      .addEventListener("click", (evt) => {
        evt.target.closest(".element").remove();
      });

    //Увеличение фотографии
    newCardImage.addEventListener("click", (evt) => {
      openPopup(popupZoom);
      popupZoomImg.src = newCardImage.src;
      popupZoomImg.alt = newCardImage.alt;
      popupZoomText.textContent = newCardTitle.textContent;
    });

    return this._card;
  }
}
