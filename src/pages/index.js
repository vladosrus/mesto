import "./index.css";
import { initialCards } from "../utils/cards.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import PopupWithoutForm from "../components/PopupWithoutForm.js";

import {
  popupProfileName,
  popupProfileJob,
  editButton,
  addButton,
  editImgButton,
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

const imagePopupWithForm = new PopupWithForm({
  submitForm: (inputValues) => {
    api
      .changeProfileImg(inputValues)
      .then((result) => {
        userInfo.setUserInfo(result);
      })
      .catch((error) => {
        console.log(error);
      });
    imagePopupWithForm.close();
  },
  popupSelector: ".popup_named_profile-image",
});
imagePopupWithForm.setEventListeners();

//Слушатель кнопки открытия попапа редактирования аватарки пользователя
editImgButton.addEventListener("click", () => {
  imagePopupWithForm.open();
  cardValidation.resetValidation();
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
function renderInitialCards() {
  api
    .getInitialCards()
    .then((result) => {
      createConstStartCards(result).renderItems();
    })
    .catch((error) => {
      console.log(error);
    });
}
renderInitialCards();

////Инстанцирование класса Popup и установка слушателей
const deleteCardPopup = new PopupWithoutForm(".popup_named_delete");
deleteCardPopup.setEventListeners();

//Инстанцирование класса PopupWithImage и установка слушателей
const openPopupImage = new PopupWithImage(".popup_named_zoom");
openPopupImage.setEventListeners();

//Удаление карточек

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
        deleteCardPopup.open();
        deleteCardPopup.setSubmitFunction((item) => {
          api
            .deleteCard(item._id)
            .then(() => {
              renderInitialCards();
              deleteCardPopup.close();
            })
            .catch((error) => {
              console.log(error);
            });
        });
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
        createConstStartCards(result).addItem(createCard(result));
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

//Добавление прелоадеров на страницу
const renderLoading = (isLoading) => {
  const submitButton = document.querySelector(".popup__submit-button");
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
  }
};
