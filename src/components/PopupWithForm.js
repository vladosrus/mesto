import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitForm, popupSelector }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.id] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }

  isLoading(isLoad, defaultText, loading) {
    if (isLoad) {
        this._submitButton.textContent = loading;
    } else {
        this._submitButton.textContent = defaultText;
    }
};

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
  };
}
