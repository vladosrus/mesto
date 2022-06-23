import Popup from "./Popup.js";
import { popupZoomImg, popupZoomText } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
    constructor({ name, link }, popupCelector) {
        super(popupCelector);
        this._popupZoomImg = popupZoomImg;
        this._popupZoomText = popupZoomText;
        this._name = name;
        this._link = link;
    }

    open() {
        this._popupZoomImg.src = this._link;
        this._popupZoomText.textContent = this._name;
        super.open();
    }
}


/*//Увеличение фотографии
    this._newCardImage.addEventListener("click", () => {
      openPopup(popupZoom);
      popupZoomImg.src = this._newCardImage.src;
      popupZoomImg.alt = this._newCardImage.alt;
      popupZoomText.textContent = this._newCardTitle.textContent;
    });*/