// alert('Доброго времени суток! Я хочу пропросить тебя об одной просьбе. Если где-то встретится ошибка, пожалуйста напиши мне, я исправлю ее. Спасибо, что уделяешь время на проверку моей работы! Всегда на связи: Discord teumik#1795, Telegram и GitHub: teumik .')

let popupButton = document.querySelector('.burger-button.open');
let overlay = document.querySelector('.overlay');
let closePopupButton = document.querySelector('.close-button');

popupButton.addEventListener('click', displayModal);
overlay.addEventListener('click', displayModal);
closePopupButton.addEventListener('click', displayModal);

function displayModal() {
  document.body.classList.toggle('open-popup');
}
