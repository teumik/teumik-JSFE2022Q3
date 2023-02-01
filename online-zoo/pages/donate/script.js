const popupButton = document.querySelector('.burger-button.open');
const overlay = document.querySelector('.overlay');
const closePopupButton = document.querySelector('.close-button');
const radioButtons = document.querySelectorAll('.amount__input-item')
const paymentCash = document.querySelector('.payment__cash');
const logoFooter = document.querySelector('.news__logo');
const menu = document.querySelector('.burger-menu .menu');
const logo = document.querySelector('.header .logo');
const copyright = document.querySelector('.header .copyright');

popupButton.addEventListener('click', displayModal);
overlay.addEventListener('click', displayModal);
closePopupButton.addEventListener('click', displayModal);
menu.addEventListener('click', displayModal);
logo.addEventListener('click', displayModal);
copyright.addEventListener('click', displayModal);
paymentCash.addEventListener('input', checkValue);
logoFooter.addEventListener('click', scrollTop);

function scrollTop(event) {
  globalThis.scrollTo(0, 0);
}

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
  if (event.target.value !== undefined && event.target.value.toString().length > 4) {
    event.target.value = event.target.value.slice(0, -1);
    return;
  }

  for (input of radioButtons) {
    input.checked = false;
    if (input.value === event.target.value) {
      input.checked = true;
    }
  }
}
