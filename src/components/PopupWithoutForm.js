import Popup from "./Popup.js";

export default class PopupWithoutForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setSubmitFunction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this);
    })
  }
}
