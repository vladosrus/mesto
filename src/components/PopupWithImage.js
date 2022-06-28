import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupCelector) {
    super(popupCelector);
    this._popupZoomImg = this._popup.querySelector(".popup__image");
    this._popupZoomText = this._popup.querySelector(".popup__caption");
  }

  open(data) {
    this._popupZoomImg.src = data.link;
    this._popupZoomImg.alt = data.name;
    this._popupZoomText.textContent = data.name;
    super.open();
  }
}
