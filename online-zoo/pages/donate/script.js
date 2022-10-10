// alert('Доброго времени суток! Я хочу пропросить тебя об одной просьбе. Если где-то встретится ошибка, пожалуйста напиши мне, я исправлю ее. Спасибо, что уделяешь время на проверку моей работы! Всегда на связи: Discord teumik#1795, Telegram и GitHub: teumik .')
alert('Доброго времени суток! \nСпасибо за то, что уделяешь время на проверку моей работы. Я хочу попросить тебя об одной моменте. Если есть возможность и желание, проверь мою работу ближе к концу дедлайна. \nСейчас 11.10 3:50 ночи. Завтра все доделаю и спасибо тебе! \nВсегда на связи: Discord teumik#1795, Telegram и GitHub: teumik')


let popupButton = document.querySelector('.burger-button.open');
let overlay = document.querySelector('.overlay');
let closePopupButton = document.querySelector('.close-button');
let radioButtons = document.querySelectorAll('.amount__input-item')
let paymentCash = document.querySelector('.payment__cash');


popupButton.addEventListener('click', displayModal);
overlay.addEventListener('click', displayModal);
closePopupButton.addEventListener('click', displayModal);
paymentCash.addEventListener('input', checkValue);

for (input of radioButtons) {
  input.addEventListener('input', inputsListener);
  if (input.value === '100') {
    input.checked = true;
    paymentCash.value = input.value;
  }
}


function displayModal() {
  document.body.classList.toggle('open-popup');
}

function inputsListener(event) {
  paymentCash.value = event.target.value;
}

function checkValue(event) {
  for (input of radioButtons) {
    input.checked = false;
    if (input.value === event.target.value) {
      input.checked = true;
    }
  }
}
