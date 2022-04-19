let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle')
let popupName = document.querySelector('.popup__input-name');
let popupJob = document.querySelector('.popup__input-job');
let closeIcon = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.popup__container');

function popupOpened() {
    popup.classList.add('popup_opened');
    popupName.value = name.textContent;
    popupJob.value = job.textContent;
}
editButton.addEventListener('click', popupOpened);

function popupClose() {
    popup.classList.remove('popup_opened');
}
closeIcon.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = popupName.value;
    job.textContent = popupJob.value;
    popup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', formSubmitHandler);
