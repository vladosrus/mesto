// ПЕРЕМЕННЫЕ
const popupProfile = document.querySelector(".popup_named_profile");
const popupProfileName = popupProfile.querySelector(".popup__input_named_name");
const popupProfileJob = popupProfile.querySelector(".popup__input_named_job");
const popupProfileForm = popupProfile.querySelector(".popup__form");
const profileCloseIcon = popupProfile.querySelector(".popup__close-icon");

const popupCard = document.querySelector(".popup_named_card");
const popupCardImgname = popupCard.querySelector(".popup__input_named_imgname");
const popupCardLink = popupCard.querySelector(".popup__input_named_link");
const popupCardForm = popupCard.querySelector(".popup__form");
const cardCloseIcon = popupCard.querySelector(".popup__close-icon");

const popupZoom = document.querySelector(".popup_named_zoom");
const popupZoomCloseIcon = popupZoom.querySelector(".popup__close-icon");
const popupZoomImg = document.querySelector(".popup__image");
const popupZoomText = document.querySelector(".popup__caption");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");

const cardTemplate = document
  .querySelector("#card")
  .content.querySelector(".element");
const cardContainer = document.querySelector(".elements__list");

//ОБРАБОТЧИКИ

//Слушатель кнопки открытия попапа редактирования профиля
editButton.addEventListener("click", () => {
  openPopup(popupProfile);
  popupProfileName.value = name.textContent;
  popupProfileJob.value = job.textContent;
});

//Слушатель кнопки-крестика для закрытия попапа редактирования профиля
profileCloseIcon.addEventListener("click", () => closePopup(popupProfile));

//Измение текста в профиле
popupProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  closePopup(popupProfile);
  name.textContent = popupProfileName.value;
  job.textContent = popupProfileJob.value;
});

//Слушатель кнопки открытия попапа добавления карточек
addButton.addEventListener("click", () => openPopup(popupCard));

//Слушатель кнопки-крестика для закрытия попапа добавления карточек
cardCloseIcon.addEventListener("click", () => closePopup(popupCard));

//Добавление карточек
popupCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  cardContainer.prepend(
    generateNewCard({ name: popupCardImgname.value, link: popupCardLink.value })
  );
  closePopup(popupCard);
  evt.target.reset();
  const button = popupCardForm.querySelector(".popup__submit-button");
  disableSubmitButton(button);
});

//Слушатель кнопки-крестика для закрытия увеличенных фотографий
popupZoomCloseIcon.addEventListener("click", () => closePopup(popupZoom));

//ФУНКЦИИ

//Открытие попапа редактирования профиля
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handlePressEscape);
}
//Закрытие на кнопку ESC
function handlePressEscape(evt) {
  if (evt.key === "Escape") {
    const findPopup = document.querySelector(".popup_opened");
    closePopup(findPopup);
  }
}
//Закрытие попапа редактирования профиля
function closePopup(popup) {
  document.removeEventListener("keydown", handlePressEscape);
  popup.classList.remove("popup_opened");
}
//Функция генерации новых карточек
const generateNewCard = ({ name, link }) => {
  const newCard = cardTemplate.cloneNode(true);
  const newCardTitle = newCard.querySelector(".element__title");
  newCardTitle.textContent = name;
  const newCardImage = newCard.querySelector(".element__image");
  newCardImage.src = link;
  newCardImage.alt = name;

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
    openPopup(popupZoom);
    popupZoomImg.src = newCardImage.src;
    popupZoomImg.alt = newCardImage.alt;
    popupZoomText.textContent = newCardTitle.textContent;
  });

  return newCard;
};
//Автодобавление начальных карточек
initialCards.forEach((item) => {
  cardContainer.append(generateNewCard(item));
});
// Закрытие попапов нажатием на оверлей
const handleClosePopup = () => {
  const overlayList = Array.from(document.querySelectorAll(".popup"));
  overlayList.forEach((overlay) => {
    overlay.addEventListener("click", (evt) => {
      const activePopup = document.querySelector(".popup.popup_opened");
      if (activePopup === evt.target) {
        overlay.classList.remove("popup_opened");
      }
    });
  });
};
handleClosePopup();
