import "./index.css";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  popupProfileName,
  popupProfileJob,
  editButton,
  addButton,
  editImgButton,
  profileTitleSelector,
  profileSubtitleSelector,
  profileAvatarSelector,
  profileForm,
  cardForm,
  imageForm,
  validationConfig,
} from "../utils/constants.js";

//Инстанцирование класса API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-44",
  headers: {
    authorization: "4b7b5dd1-c14a-477d-bd33-50408ed7db39",
    "Content-Type": "application/json",
  },
});



//Отрисовка страницы после получения данных профиля и карточек
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([info, cards]) => {
    myId = info._id;
    userInfo.setUserInfo(info);
    createSection(cards).renderItems();
  })
  .catch((error) => {
    console.log(error);
  });

//В этой переменной хранится мой id
let myId = null;

//РАБОТА С ДАННЫМИ ПРОФИЛЯ
//Инстанцирование класса работы с данными профиля
const userInfo = new UserInfo(
  profileTitleSelector,
  profileSubtitleSelector,
  profileAvatarSelector
);

//Редактирование данных профиля на сервере
const profilePopupWithForm = new PopupWithForm({
  submitForm: (inputValues) => {
    profilePopupWithForm.isLoading(true, "Сохранить", "Сохранение...");
    api
      .changeProfileInfo(inputValues)
      .then((result) => {
        userInfo.setUserInfo(result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        profilePopupWithForm.isLoading(false, "Сохранить", "Сохранение...");
      });
    profilePopupWithForm.close();
  },
  popupSelector: ".popup_named_profile",
});
profilePopupWithForm.setEventListeners();

//Слушатель кнопки открытия попапа редактирования данных профиля
editButton.addEventListener("click", () => {
  const userInformation = userInfo.getUserInfo();
  popupProfileName.value = userInformation.title;
  popupProfileJob.value = userInformation.subtitle;
  profilePopupWithForm.open();
  profileValidation.resetValidation();
});

//Редактирование аватара профиля
const imagePopupWithForm = new PopupWithForm({
  submitForm: (inputValues) => {
    imagePopupWithForm.isLoading(true, "Сохранить", "Сохранение...");
    api
      .changeProfileImg(inputValues)
      .then((result) => {
        userInfo.setUserInfo(result);
        imagePopupWithForm.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        imagePopupWithForm.isLoading(false, "Сохранить", "Сохранение...");
      });
  },
  popupSelector: ".popup_named_profile-image",
});
imagePopupWithForm.setEventListeners();

//Слушатель кнопки открытия попапа редактирования аватарки пользователя
editImgButton.addEventListener("click", () => {
  imagePopupWithForm.open();
  changaProfileImgValidation.resetValidation();
});

//РАБОТА С КАРТОЧКАМИ
//Функция создающая инстанс класса Section
function createSection(items) {
  const startCards = new Section(
    {
      items,
      renderer: (item) => {
        startCards.addItem(createCard(item));
      },
    },
    ".elements__list"
  );
  return startCards;
}

//Инстанцирование класса Popup и установка слушателей
const deleteCardPopup = new PopupWithConfirmation(".popup_named_delete");
deleteCardPopup.setEventListeners();

//Инстанцирование класса PopupWithImage и установка слушателей
const openPopupImage = new PopupWithImage(".popup_named_zoom");
openPopupImage.setEventListeners();

//Функция создающая карточку
function createCard(item) {
  const card = new Card(
    {
      data: item,
      myId: myId,
      handleCardClick: () => {
        openPopupImage.open(item);
      },
      handleLikeCard: (item) => {
        api
          .likeCard(item._id)
          .then((res) => {
            card.addLike(res);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      handleDislikeCard: (item) => {
        api
          .deleteLike(item._id)
          .then((res) => {
            card.deleteLike(res);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      handleBucketClick: (item) => {
        deleteCardPopup.open();
        deleteCardPopup.setSubmitFunction(() => {
          api
            .deleteCard(item.cardId)
            .then(() => {
              card.handleDeliteCard();
              deleteCardPopup.close();
            })
            .catch((error) => {
              console.log(error);
            });
        });
        deleteCardPopup.setEventListeners();
      },
    },
    ".card"
  );
  return card.generateNewCard();
}

//Попап добавления новых карточек
const cardPopupWithForm = new PopupWithForm({
  submitForm: (inputValues) => {
    cardPopupWithForm.isLoading(true, "Создать", "Создание...");
    api
      .addNewCard(inputValues)
      .then((result) => {
        createSection(result).addItem(createCard(result));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        cardPopupWithForm.isLoading(false, "Создать", "Создание...");
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

//ВАЛИДАЦИЯ
//Включение валидации в попапах
const profileValidation = new FormValidator(validationConfig, profileForm);
const cardValidation = new FormValidator(validationConfig, cardForm);
const changaProfileImgValidation = new FormValidator(validationConfig, imageForm);
profileValidation.enableValidation();
cardValidation.enableValidation();
changaProfileImgValidation.enableValidation();
