import { settings, FormValidator } from "../components/FormValidator.js";

export const popupProfile = document.querySelector(".popup_named_profile");
export const popupProfileName = popupProfile.querySelector(
  ".popup__input_named_name"
);
export const popupProfileJob = popupProfile.querySelector(
  ".popup__input_named_job"
);
export const popupProfileForm = popupProfile.querySelector(".popup__form");
export const profileCloseIcon =
  popupProfile.querySelector(".popup__close-icon");

export const popupCard = document.querySelector(".popup_named_card");
export const popupCardForm = popupCard.querySelector(".popup__form");
export const popupCardImgname = popupCard.querySelector(
  ".popup__input_named_imgname"
);
export const popupCardLink = popupCard.querySelector(
  ".popup__input_named_link"
);
export const cardCloseIcon = popupCard.querySelector(".popup__close-icon");

export const popupZoom = document.querySelector(".popup_named_zoom");
export const popupZoomCloseIcon = popupZoom.querySelector(".popup__close-icon");
export const popupZoomImg = document.querySelector(".popup__image");
export const popupZoomText = document.querySelector(".popup__caption");

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");

export const cardContainer = document.querySelector(".elements__list");
export const profileValidation = new FormValidator(settings, "#profileform");
export const cardValidation = new FormValidator(settings, "#cardform");
export const overlayList = Array.from(document.querySelectorAll(".popup"));

