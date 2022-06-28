import './index.css';
import { initialCards } from "../utils/cards.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

import {
  popupProfileName,
  popupProfileJob,
  editButton,
  addButton,
  profileTitle,
  profileSubtitle,
  profileForm,
  cardForm,
  settings
} from "../utils/constants.js";

//Добавление начальных карточек
const startCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: () => {
            const openPopupImage = new PopupWithImage(".popup_named_zoom");
            openPopupImage.open(item);
            openPopupImage.setEventListeners();
          },
        },
        ".card"
      );
      const cardElement = card.generateNewCard();
      startCards.addItem(cardElement);
    },
  },
  ".elements__list"
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
  popupSelector: ".popup_named_profile",
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
        handleCardClick: () => {
          const openPopupImage = new PopupWithImage(".popup_named_zoom");
          openPopupImage.open(item);
          openPopupImage.setEventListeners();
        },
      },
      ".card"
    );
    startCards.addItem(card.generateNewCard())
  },
  popupSelector: ".popup_named_card",
});

//Слушатель кнопки открытия попапа добавления новых карточек
addButton.addEventListener("click", () => {
  cardPopupWithForm.open();
  cardPopupWithForm.setEventListeners();
  cardValidation.resetValidation();
});

//Включение валидации в попапах
const profileValidation = new FormValidator(settings, profileForm);
const cardValidation = new FormValidator(settings, cardForm);
profileValidation.enableValidation();
cardValidation.enableValidation();
