export default class UserInfo {
  constructor(titleSelector, subtitleSelector, avatarSelector) {
    this._title = document.querySelector(titleSelector);
    this._subtitle = document.querySelector(subtitleSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      title: this._title.textContent,
      subtitle: this._subtitle.textContent,
      avatar: this._profileAvatar.src
    };
  }

  setUserInfo(data) {
    this._title.textContent = data.name;
    this._subtitle.textContent = data.about;
    this._profileAvatar.src = data.avatar;
  }
}
