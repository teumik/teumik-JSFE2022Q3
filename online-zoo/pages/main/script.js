// alert('Доброго времени суток! Хочу попросить, проверить работу ближе к концу срока проверки. Были сложности, на которые ушло много времени. Надеюсь на понимание. Всегда на связи: Discord teumik#1795, Telegram и GitHub: teumik \t P.S. Работа идет, сейчас (14:55), спасибо за понимание!')

const slideBar = document.querySelector('.slider-bar');
const slideBarPositionn = document.querySelector('.slider-bar_position');

console.log(slideBar);
console.log(slideBarPositionn.offsetLeft);

slideBar.addEventListener('mousedown', moveBar)

function moveBar(event) {
  console.log(event);
}
