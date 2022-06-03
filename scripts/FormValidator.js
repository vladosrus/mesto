import {
  popupProfile,
  popupProfileName,
  popupProfileJob,
  popupCardForm,
} from "./index.js";

export const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

export class FormValidator {
  constructor(object, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
  }
  // Функция показывающая ошибку после валидации
  _showInputError(formElement, inputElement, errorMessage) {
    this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  _clearInputError(error, input) {
    error.textContent = "";
    input.classList.remove("popup__input_type_error");
    error.classList.remove("popup__input-error_visible");
  }

  // Функция убирающая отображение ошибки
  _hideInputError(formElement, inputElement) {
    this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    this._clearInputError(this._errorElement, inputElement);
  }

  // Функция проверки полей на валидность
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disabledButton(button) {
    button.classList.add("popup__submit-button_disabled");
    button.disabled = "disabled";
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disabledButton(buttonElement);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = "";
    }
  }

  // Функция добавления слушателей, вызывающих функцию проверки поля для ввода
  _setEventListeners(formElement) {
    this._inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(this._inputList, this._buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  // Функция включения валидации (ищет все формы и вызывает функцию добавления слушателей)
  enableValidation() {
    this._formElement = document.querySelector(this._formSelector);
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formElement);
  }

  resetValidation() {
    this._errorName = popupProfile.querySelector(".name-error");
    this._errorJob = popupProfile.querySelector(".job-error");
    this._clearInputError(this._errorName, popupProfileName);
    this._clearInputError(this._errorJob, popupProfileJob);

    this._button = popupCardForm.querySelector(".popup__submit-button");
    this._disabledButton(this._button);
  }
}
