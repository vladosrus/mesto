export default class Card {
  constructor(
    {
      data,
      myId,
      handleCardClick,
      handleLikeCard,
      handleDislikeCard,
      handleBucketClick,
    },
    cardSelector
  ) {
    this._data = data;
    this.cardId = data._id;
    this._title = data.name;
    this._link = data.link;
    this._myId = myId;
    this._cardOwnerId = data.owner._id;
    this._cardLikes = data.likes;
    this._likeCount = data.likes.length;
    this._cardContainer = document.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
    this._handleBucketClick = handleBucketClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDislikeCard = handleDislikeCard;
  }

  _checkCardId() {
    if (this._myId === this._cardOwnerId) {
      return true;
    } else {
      return false;
    }
  }

  _getTemplate() {
    const isMyId = this._checkCardId();
    if (isMyId === false) {
      const cardTemplate = this._cardContainer.content
        .querySelector(".element")
        .cloneNode(true);
      const basket = cardTemplate.querySelector(".element__basket-button");
      basket.remove();
      return cardTemplate;
    } else {
      const cardTemplate = this._cardContainer.content
        .querySelector(".element")
        .cloneNode(true);
      return cardTemplate;
    }
  }

  _isILikeCard() {
    return this._cardLikes.some((element) => {
      return element._id.includes(this._myId);
    });
  }

  _getCardLike() {
    if (this._isILikeCard()) {
      this._handleDislikeCard(this._data);
    } else {
      this._handleLikeCard(this._data);
    }
  }

  addLike(res) {
    this._cardLikes = res.likes;
    this._likeNumber.textContent = res.likes.length;
    this._likeButton.classList.add("element__like-button_active");
  }

  addMyLikes() {
    if (this._isILikeCard()) {
      this._likeButton.classList.add("element__like-button_active");
    }
  }

  deleteLike(res) {
    this._cardLikes = res.likes;
    this._likeNumber.textContent = res.likes.length;
    this._likeButton.classList.remove("element__like-button_active");
  }

  handleDeliteCard() {
    this._card.remove();
  }

  _setEventListeners() {
    //Слушатель клика кнопки лайка
    this._likeButton = this._card.querySelector(".element__like-button");
    this._likeButton.addEventListener("click", () => {
      this._getCardLike(this);
    });

    //Слушатель клика корзины удаления
    if (this._basket) {
      this._basket.addEventListener("click", () => {
        this._handleBucketClick(this);
      });
    }

    this._newCardImage.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    });
  }

  generateNewCard() {
    this._card = this._getTemplate();
    this._card.id = this.cardId;
    this._basket = this._card.querySelector(".element__basket-button");
    this._card.querySelector(".element__title").textContent = this._title;
    this._newCardImage = this._card.querySelector(".element__image");
    this._newCardImage.src = this._link;
    this._newCardImage.alt = this._title;
    
    this._likeNumber = this._card.querySelector(".element__like-count")
    this._likeNumber.textContent = this._likeCount;

    this._setEventListeners();

    return this._card;
  }
}
