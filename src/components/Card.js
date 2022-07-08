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

  //Проверка - совпадает ли мой id с id создателя карточки
  _checkCardId() {
    if (this._myId === this._cardOwnerId) {
      return true;
    } else {
      return false;
    }
  }

  //Клонирование template-элемента карточки и установка кнопки удаления на мои карточки
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

  //Проверка - ставил ли я уже лайк на этой карточке
  _isILikeCard() {
    return this._cardLikes.some((element) => {
      return element._id.includes(this._myId);
    });
  }

  //Принятие решения об добавлении лайка или удалении
  _getCardLike() {
    if (this._isILikeCard()) {
      this._handleDislikeCard(this._data);
    } else {
      this._handleLikeCard(this._data);
    }
  }

  //Установка слушателей
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

    //Слушатель клика по картинке карточки
    this._сardImage.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    });
  }

  //Метод отображения добавленного лайка
  addLike(res) {
    this._cardLikes = res.likes;
    this._likeNumber.textContent = res.likes.length;
    this._likeButton.classList.add("element__like-button_active");
  }

  //Метод отображения удалённого лайка
  deleteLike(res) {
    this._cardLikes = res.likes;
    this._likeNumber.textContent = res.likes.length;
    this._likeButton.classList.remove("element__like-button_active");
  }

  //Удаление карточки
  handleDeliteCard() {
    this._card.remove();
  }

  //Создание новой карточки
  generateNewCard() {
    this._card = this._getTemplate();
    this._card.id = this.cardId;
    this._basket = this._card.querySelector(".element__basket-button");
    this._card.querySelector(".element__title").textContent = this._title;
    this._сardImage = this._card.querySelector(".element__image");
    this._сardImage.src = this._link;
    this._сardImage.alt = this._title;

    this._likeNumber = this._card.querySelector(".element__like-count");
    this._likeNumber.textContent = this._likeCount;

    this._setEventListeners();

    return this._card;
  }
}
