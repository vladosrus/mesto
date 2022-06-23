import {
  profileCloseIcon,
  popupZoomCloseIcon
} from "../utils/constants.js";

export default class Popup {
  constructor(popupCelector) {
    this._popup = popupCelector;
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleClosePopup = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup_opened')) {
        this.close()
      };
  };

  setEventListeners() {
    profileCloseIcon.addEventListener("click", () => this.close(this._popup));
    popupZoomCloseIcon.addEventListener("click", () => this.close(this._popup));
    this._popup.addEventListener("click", this._handleClosePopup);
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

*/
