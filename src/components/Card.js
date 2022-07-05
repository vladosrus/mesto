export default class Card {
  constructor({ data, myId, handleCardClick, handleBucketClick }, cardSelector) {
    this._title = data.name;
    this._link = data.link;
    this._myId = myId;
    this._cardOwnerId = data.owner._id;
    this._likeCount = data.likes.length;
    this._cardContainer = document.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
    this._handleBucketClick = handleBucketClick;
  }

  _checkId() {
    if(this._myId === this._cardOwnerId) {
      return true;
    }else {
      return false;
    }
  }

  _getTemplate() {
    const isMyId = this._checkId();
    if(isMyId === false) {
      const cardTemplate = this._cardContainer.content
      .querySelector(".element")
      .cloneNode(true);
      this._basket = cardTemplate.querySelector('.element__basket-button');
      this._basket.remove();
      return cardTemplate;
    }else {
      const cardTemplate = this._cardContainer.content
      .querySelector(".element")
      .cloneNode(true);
      return cardTemplate;
    }
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }

  _setEventListeners() {
    //Функция лайков
    this._card
      .querySelector(".element__like-button")
      .addEventListener("click", this._handleLikeCard);

    //Функция удаления карточек
    if(this._card.querySelector(".element__basket-button")) {
      this._card
      .querySelector(".element__basket-button")
      .addEventListener("click", this._handleBucketClick);
    }

    this._newCardImage.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    });
  }

  generateNewCard() {
    this._card = this._getTemplate();
    this._card.querySelector(".element__title").textContent = this._title;
    this._newCardImage = this._card.querySelector(".element__image");
    this._newCardImage.src = this._link;
    this._newCardImage.alt = this._title;
    this._card.querySelector(".element__like-count").textContent = this._likeCount;

    this._setEventListeners();

    return this._card;
  }
}
