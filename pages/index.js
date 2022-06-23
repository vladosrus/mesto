import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";

import {
  popupProfile,
  popupProfileName,
  popupProfileJob,
  popupProfileForm,
  profileCloseIcon,
  popupCard,
  popupCardImgname,
  popupCardLink,
  popupCardForm,
  cardCloseIcon,
  popupZoom,
  popupZoomCloseIcon,
  editButton,
  addButton,
  profileTitle,
  profileSubtitle,
  cardContainer,
  profileValidation,
  cardValidation,
  overlayList
} from "../utils/constants.js";

//ФУНКЦИИ

//Открытие попапа редактирования профиля
export function openPopup(popup) {
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

//Автодобавление начальных карточек
initialCards.forEach((item) => {
  const card = new Card(item, ".card");
  const cardElement = card.generateNewCard();
  cardContainer.append(cardElement);
});

//Включение валидации
profileValidation.enableValidation();
cardValidation.enableValidation();

// Закрытие попапов нажатием на оверлей
const handleClosePopup = () => {
  overlayList.forEach((overlay) => {
    overlay.addEventListener("click", (evt) => {
      const activePopup = document.querySelector(".popup.popup_opened");
      if (activePopup === evt.target) {
        closePopup(overlay);
      }
    });
  });
};
handleClosePopup();

//ОБРАБОТЧИКИ

//Слушатель кнопки открытия попапа редактирования профиля
editButton.addEventListener("click", () => {
  openPopup(popupProfile);
  popupProfileName.value = profileTitle.textContent;
  popupProfileJob.value = profileSubtitle.textContent;

  profileValidation.resetValidation();
});

//Слушатель кнопки-крестика для закрытия попапа редактирования профиля
profileCloseIcon.addEventListener("click", () => closePopup(popupProfile));

//Измение текста в профиле
popupProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  closePopup(popupProfile);
  profileTitle.textContent = popupProfileName.value;
  profileSubtitle.textContent = popupProfileJob.value;
});

//Слушатель кнопки открытия попапа добавления карточек
addButton.addEventListener("click", () => openPopup(popupCard));

//Слушатель кнопки-крестика для закрытия попапа добавления карточек
cardCloseIcon.addEventListener("click", () => closePopup(popupCard));

//Добавление карточек
popupCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  cardContainer.prepend(
    new Card(
      { name: popupCardImgname.value, link: popupCardLink.value },
      ".card"
    ).generateNewCard()
  );
  closePopup(popupCard);
  evt.target.reset();

  cardValidation.resetValidation();
});

//Слушатель кнопки-крестика для закрытия увеличенных фотографий
popupZoomCloseIcon.addEventListener("click", () => closePopup(popupZoom));
