import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";

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




const startCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: (name, link) => {
        const openPopupImage = new PopupWithImage({
          name: name,
          link: link
        }, popupZoom);
        openPopupImage.open();
        openPopupImage.setEventListener();
      }
    }, ".card");
    const cardElement = card.generateNewCard();
    startCards.addItem(cardElement);
  }
}, cardContainer)
startCards.renderItems()
/*
//Автодобавление начальных карточек
initialCards.forEach((item) => {
  const card = new Card(item, ".card");
  const cardElement = card.generateNewCard();
  cardContainer.append(cardElement);
});
*/
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