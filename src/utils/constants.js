const popupProfile = document.querySelector(".popup_named_profile");
export const popupProfileName = popupProfile.querySelector(
  ".popup__input_named_name"
);
export const popupProfileJob = popupProfile.querySelector(
  ".popup__input_named_job"
);

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const editImgButton = document.querySelector(".profile__avatar-overlay");

export const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};
export const profileTitleSelector = ".profile__title";
export const profileSubtitleSelector = ".profile__subtitle";
export const profileAvatarSelector = ".profile__avatar";
export const profileForm = document.querySelector("#profileform");
export const cardForm = document.querySelector("#cardform");
export const imageForm = document.querySelector("#imageform");
