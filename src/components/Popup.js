export default class Popup {
  constructor(popupCelector) {
    this._popup = popupCelector;
    this._escClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._escClose);
  }

  close() {
    document.removeEventListener("keydown", this._escClose);
    this._popup.classList.remove("popup_opened");
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleClosePopup = (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup_opened")
    ) {
      this.close();
    }
  };

  setEventListeners() {
    const closeIcon = this._popup.querySelector(".popup__close-icon");
    closeIcon.addEventListener("click", () => this.close(this._popup));
    this._popup.addEventListener("click", this._handleClosePopup);
  }
}
