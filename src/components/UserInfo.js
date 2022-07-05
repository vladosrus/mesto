export default class UserInfo {
  constructor({ titleSelector, subtitleSelector, profileAvatarSelector }) {
    this._title = document.querySelector(titleSelector);
    this._subtitle = document.querySelector(subtitleSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    this._profileValues = {};
    this._profileValues.title = this._title.textContent;
    this._profileValues.subtitle = this._subtitle.textContent;
    return this._profileValues;
  }

  setUserInfo(data) {
    this._title.textContent = data.name;
    this._subtitle.textContent = data.about;
    this._profileAvatar.src = data.avatar;
  }
}
