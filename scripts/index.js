// Дом элементы

const popup = document.querySelector(".popup");
const popupName = document.querySelector(".popup__input_named_name");
const popupJob = document.querySelector(".popup__input_named_job");
const editButton = document.querySelector(".profile__edit-button");
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");
const closeIcon = document.querySelector(".popup__close-icon");
const formElement = document.querySelector(".popup__form");

//Открытие попапа

function popupOpened() {
  popup.classList.add("popup_opened");
  popupName.value = name.textContent;
  popupJob.value = job.textContent;
}
editButton.addEventListener("click", popupOpened);

//Закрытие попапа

function popupClose() {
  popup.classList.remove("popup_opened");
}
closeIcon.addEventListener("click", popupClose);

//Измение текста в профиле

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = popupName.value;
  job.textContent = popupJob.value;
  popupClose();
}
formElement.addEventListener("submit", formSubmitHandler);

//Отрисовка начальных карточек

const cardTemplate = document
  .querySelector("#card")
  .content.querySelector(".element");
const cardContainer = document.querySelector(".elements__list");

const generateCard = (item) => {
  const newCard = cardTemplate.cloneNode(true);
  const newCardTitle = newCard.querySelector(".element__title");
  newCardTitle.textContent = item.name;
  const newCardImage = newCard.querySelector(".element__image");
  newCardImage.src = item.link;

  return newCard;
};

const renderCards = (item) => {
  cardContainer.append(generateCard(item));
};

initialCards.forEach((item) => {
  renderCards(item);
});
