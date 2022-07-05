import "./index.css";
import { initialCards } from "../utils/cards.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import Popup from "../components/Popup";

import {
  popupProfileName,
  popupProfileJob,
  editButton,
  addButton,
  basketButton,
  profileForm,
  cardForm,
  settings,
} from "../utils/constants.js";

//Инстанцирование класса API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-44",
  headers: {
    authorization: "4b7b5dd1-c14a-477d-bd33-50408ed7db39",
    "Content-Type": "application/json",
  },
});

//РАБОТА С ДАННЫМИ ПРОФИЛЯ
//Инстанцирование класса работы с данными профиля
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  subtitleSelector: ".profile__subtitle",
  profileAvatarSelector: ".profile__avatar",
});




//Добавление данных профиля на страницу
let myId = null;

api
  .getProfileInfo()
  .then((result) => {
    userInfo.setUserInfo(result);
    myId = result._id;
    return myId;
  })
  .catch((error) => {
    console.log(error);
  });

//Обновление данных профиля на сервере
const profilePopupWithForm = new PopupWithForm({
  submitForm: (inputValues) => {
    api
      .changeProfileInfo(inputValues)
      .then((result) => {
        userInfo.setUserInfo(result);
      })
      .catch((error) => {
        console.log(error);
      });
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

//РАБОТА С КАРТОЧКАМИ
function createConstStartCards(items) {
  const startCards = new Section(
    {
      items: items,
      renderer: (item) => {
        startCards.addItem(createCard(item));
      },
    },
    ".elements__list"
  );
  return startCards;
}

//Добавление начальных карточек
api
  .getInitialCards()
  .then((result) => {
    createConstStartCards(result).renderItems();
  })
  .catch((error) => {
    console.log(error);
  });

////Инстанцирование класса Popup и установка слушателей
const openPopup = new Popup(".popup_named_delete");
openPopup.setEventListeners();

//Инстанцирование класса PopupWithImage и установка слушателей
const openPopupImage = new PopupWithImage(".popup_named_zoom");
openPopupImage.setEventListeners();

//Инстанцирование класса Card
function createCard(item) {
  const card = new Card(
    {
      data: item,
      myId: myId,
      handleCardClick: () => {
        openPopupImage.open(item);
      },
      handleBucketClick: () => {
        openPopup.open();
      },
    },
    ".card"
  );
  return card.generateNewCard();
}

//Попап добавления новых карточек
const cardPopupWithForm = new PopupWithForm({
  submitForm: (inputValues) => {
    inputValues["name"] = inputValues["imgname"];
    delete inputValues["imgname"];
    api
      .addNewCard(inputValues)
      .then((result) => {
        createConstStartCards(result).addItem(createCard(inputValues));
      })
      .catch((error) => {
        console.log(error);
      });
    cardPopupWithForm.close();
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
