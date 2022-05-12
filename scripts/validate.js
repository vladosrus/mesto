// Функция показывающая ошибку после валидации
const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelectorAll(".popup__error");
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

// Функция убирающая отображение ошибки
const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelectorAll(".popup__error");
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = "";
};

// Функция проверки полей на валидность
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      obj
    );
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

// Функция добавления слушателей, вызывающих функцию проверки поля для ввода
const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(document.querySelectorAll(obj.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

// Функция включения валидации (ищет все формы и вызывает функцию добавления слушателей)
const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
      enableValidation({
        formSelector: ".popup__form",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__button",
        inactiveButtonClass: "popup__button_disabled", //???
        inputErrorClass: ".popup__input_type_error",
        errorClass: ".popup__error_visible",
      });
    });

    setEventListeners(formElement, obj);
  });
};
