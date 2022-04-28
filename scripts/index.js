// Дом элементы

const popupProfile = document.querySelector(".popup_named_profile");
const popupCard = document.querySelector(".popup_named_card");
const popupZoom = document.querySelector(".popup_named_zoom");
const popupProfileName = popupProfile.querySelector(".popup__input_named_name");
const popupProfileJob = popupProfile.querySelector(".popup__input_named_job");
const popupCardImgname = popupCard.querySelector(".popup__input_named_imgname");
const popupCardLink = popupCard.querySelector(".popup__input_named_link");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");
const popupZoomImg = document.querySelector('.popup__image');
const popupZoomText = document.querySelector('.popup__caption');
const profileCloseIcon = popupProfile.querySelector(".popup__close-icon");
const cardCloseIcon = popupCard.querySelector(".popup__close-icon");
const popupZoomCloseIcon = popupZoom.querySelector('.popup__close-icon');
const popupProfileForm = popupProfile.querySelector(".popup__form");
const popupCardForm = popupCard.querySelector(".popup__form");

//Открытие попапа редактирования профиля

function popupOpened(popup) {
  popup.classList.add("popup_opened");
}

editButton.addEventListener("click", () => {
  popupOpened(popupProfile);
  popupProfileName.value = name.textContent;
  popupProfileJob.value = job.textContent;
});

//Закрытие попапа редактирования профиля

function popupClose(popup) {
  popup.classList.remove("popup_opened");
}

profileCloseIcon.addEventListener("click", () => {
  popupClose(popupProfile);
});

//Измение текста в профиле

popupProfileForm.addEventListener("submit", () => {
  popupClose(popupProfile);
  name.textContent = popupProfileName.value;
  job.textContent = popupProfileJob.value;
});

//Открытие попопа добавления карточек

addButton.addEventListener("click", () => {
  popupOpened(popupCard);
});

//Закрытие попапа добавления карточек
cardCloseIcon.addEventListener("click", () => {
  popupClose(popupCard);
});

//Добавление новых карточек

popupCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  cardContainer.prepend(generateNewCard(popupCardImgname, popupCardLink));
  popupClose(popupCard);
  evt.target.reset();
});

const generateNewCard = (a, b) => {
  const newCard = cardTemplate.cloneNode(true);
  const newCardTitle = newCard.querySelector(".element__title");
  newCardTitle.textContent = a.value;
  const newCardImage = newCard.querySelector(".element__image");
  newCardImage.src = b.value;

  //Функция лайков
  newCard
    .querySelector(".element__like-botton")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like-botton_active");
    });

  //Функция удаления карточек
  newCard
    .querySelector(".element__basket-botton")
    .addEventListener("click", (evt) => {
      evt.target.closest(".element").remove();
    });

  //Увеличение фотографии
  newCardImage.addEventListener("click", (evt) => {
    popupOpened(popupZoom);
    popupZoomImg.src = newCardImage.src;
    popupZoomText.textContent = newCardTitle.textContent;
  });

  //Закрытие увеличенных фотографий
  popupZoomCloseIcon.addEventListener("click", () => {
    popupClose(popupZoom);
  });

  return newCard;
};
//Автодобавление начальных карточек

const cardTemplate = document
  .querySelector("#card")
  .content.querySelector(".element");
const cardContainer = document.querySelector(".elements__list");

const generateInitialCard = (item) => {
  const newCard = cardTemplate.cloneNode(true);
  const newCardTitle = newCard.querySelector(".element__title");
  newCardTitle.textContent = item.name;
  const newCardImage = newCard.querySelector(".element__image");
  newCardImage.src = item.link;

  //Функция лайков
  newCard
    .querySelector(".element__like-botton")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like-botton_active");
    });

  //Функция удаления карточек
  newCard
    .querySelector(".element__basket-botton")
    .addEventListener("click", (evt) => {
      evt.target.closest(".element").remove();
    });

  //Увеличение фотографии
  newCardImage.addEventListener("click", (evt) => {
    popupOpened(popupZoom);
    popupZoomImg.src = newCardImage.src;
    popupZoomText.textContent = newCardTitle.textContent;
  });

  //Закрытие увеличенных фотографий
  popupZoomCloseIcon.addEventListener("click", () => {
    popupClose(popupZoom);
  });

  return newCard;
};

initialCards.forEach((item) => {
  cardContainer.append(generateInitialCard(item));
});
