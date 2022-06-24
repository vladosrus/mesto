import {
  popupProfile,
  popupProfileName,
  popupProfileJob,
} from "../utils/constants.js";

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

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", true);
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

    this._toggleButtonState();
  }
}
