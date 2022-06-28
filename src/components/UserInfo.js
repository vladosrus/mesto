export default class UserInfo {
  constructor({ titleSelector, subtitleSelector }) {
    this._title = document.querySelector(titleSelector);
    this._subtitle = document.querySelector(subtitleSelector);
  }

  getUserInfo() {
    this._profileValues = {};
    this._profileValues.title = this._title.textContent;
    this._profileValues.subtitle = this._subtitle.textContent;
    return this._profileValues;
  }

  setUserInfo(inputValues) {
    this._title.textContent = inputValues["name"];
    this._subtitle.textContent = inputValues["job"];
  }
}
