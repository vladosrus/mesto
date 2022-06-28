const popupProfile = document.querySelector(".popup_named_profile");
export const popupProfileName = popupProfile.querySelector(
  ".popup__input_named_name"
);
export const popupProfileJob = popupProfile.querySelector(
  ".popup__input_named_job"
);

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");

export const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};
export const profileForm = document.querySelector("#profileform");
export const cardForm = document.querySelector("#cardform");

