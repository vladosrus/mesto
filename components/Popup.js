import { profileCloseIcon, popupProfile } from "../utils/constants.js";

export default class Popup {
  constructor(popupCelector) {
    this._popup = document.querySelector(popupCelector);
  }

  open(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const findPopup = document.querySelector(".popup_opened");
      this.close(findPopup);
    }
  }

  setEventListeners() {
    profileCloseIcon.addEventListener("click", () => this.close(popupProfile));
  }
}

/*
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

//Слушатель кнопки-крестика для закрытия попапа редактирования профиля
profileCloseIcon.addEventListener("click", () => closePopup(popupProfile));
*/