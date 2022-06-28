import "./index.css";
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
  profileForm,
  cardForm,
  settings,
} from "../utils/constants.js";

//Инстанцирование класса PopupWithImage и установка слушателей
const openPopupImage = new PopupWithImage(".popup_named_zoom");
openPopupImage.setEventListeners();

//Инстанцирование класса Card
function createCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardClick: () => {
        openPopupImage.open(item);
      },
    },
    ".card"
  );
  return card;
}

//Добавление начальных карточек
const startCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      startCards.addItem(createCard(item).generateNewCard());
    },
  },
  ".elements__list"
);
startCards.renderItems();

//Инстанцирование класса работы с данными пользователя
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  subtitleSelector: ".profile__subtitle",
});

//Попап редактирования данных пользователя
const profilePopupWithForm = new PopupWithForm({
  submitForm: (inputValues) => {
    userInfo.setUserInfo(inputValues);
    profilePopupWithForm.close();
  },
  popupSelector: ".popup_named_profile",
});
profilePopupWithForm.setEventListeners();

//Слушатель кнопки открытия попапа редактирования данных пользователя
editButton.addEventListener("click", () => {
  const userInformation = userInfo.getUserInfo();
  popupProfileName.value = userInformation.title;
  popupProfileJob.value = userInformation.subtitle;
  profilePopupWithForm.open();
  profileValidation.resetValidation();
});

//Попап добавления новых карточек
const cardPopupWithForm = new PopupWithForm({
  submitForm: (inputValues) => {
    inputValues["name"] = inputValues["imgname"];
    delete inputValues["imgname"];
    cardPopupWithForm.close();
    startCards.addItem(createCard(inputValues).generateNewCard());
  },
  popupSelector: ".popup_named_card",
});
cardPopupWithForm.setEventListeners();

//Слушатель кнопки открытия попапа добавления новых карточек
addButton.addEventListener("click", () => {
  cardPopupWithForm.open();
  cardValidation.resetValidation();
});

//Включение валидации в попапах
const profileValidation = new FormValidator(settings, profileForm);
const cardValidation = new FormValidator(settings, cardForm);
profileValidation.enableValidation();
cardValidation.enableValidation();
