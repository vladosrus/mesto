import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

import {
  popupProfile,
  popupProfileName,
  popupProfileJob,
  popupCard,
  popupZoom,
  editButton,
  addButton,
  profileTitle,
  profileSubtitle,
  cardContainer,
  profileValidation,
  cardValidation,
} from "../utils/constants.js";

//Добавление начальных карточек
const startCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: (name, link) => {
            const openPopupImage = new PopupWithImage(
              {
                name: name,
                link: link,
              },
              popupZoom
            );
            openPopupImage.open();
            openPopupImage.setEventListeners();
          },
        },
        ".card"
      );
      const cardElement = card.generateNewCard();
      startCards.addItem(cardElement);
    },
  },
  cardContainer
);
startCards.renderItems();

//Класс работы с данными пользователя
const userInfo = new UserInfo({
  title: profileTitle,
  subtitle: profileSubtitle,
});

//Попап редактирования данных пользователя
const profilePopupWithForm = new PopupWithForm({
  submitForm: (inputValues) => {
    userInfo.setUserInfo(inputValues);
    profilePopupWithForm.close();
  },
  popupSelector: popupProfile,
});

//Слушатель кнопки открытия попапа редактирования данных пользователя
editButton.addEventListener("click", () => {
  popupProfileName.value = userInfo.getUserInfo().title;
  popupProfileJob.value = userInfo.getUserInfo().subtitle;
  profilePopupWithForm.open();
  profilePopupWithForm.setEventListeners();
  profileValidation.resetValidation();
});

//Попап добавления новых карточек
const cardPopupWithForm = new PopupWithForm({
  submitForm: (inputValues) => {
    inputValues["name"] = inputValues["imgname"];
    delete inputValues["imgname"];
    cardPopupWithForm.close();
    const card = new Card(
      {
        data: inputValues,
        handleCardClick: (title, link) => {
          const openPopupImage = new PopupWithImage(
            {
              name: title,
              link: link,
            },
            popupZoom
          );
          openPopupImage.open();
          openPopupImage.setEventListeners();
        },
      },
      ".card"
    );
    cardContainer.prepend(card.generateNewCard());
  },
  popupSelector: popupCard,
});

//Слушатель кнопки открытия попапа добавления новых карточек
addButton.addEventListener("click", () => {
  cardPopupWithForm.open();
  cardPopupWithForm.setEventListeners();
  cardValidation.resetValidation();
});

//Включение валидации в попапах
profileValidation.enableValidation();
cardValidation.enableValidation();