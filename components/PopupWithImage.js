import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({ name, link }, popupCelector) {
        super(popupCelector);
        
    }


}


/*//Увеличение фотографии
    this._newCardImage.addEventListener("click", () => {
      openPopup(popupZoom);
      popupZoomImg.src = this._newCardImage.src;
      popupZoomImg.alt = this._newCardImage.alt;
      popupZoomText.textContent = this._newCardTitle.textContent;
    });*/