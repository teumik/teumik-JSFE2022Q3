// alert('Доброго времени суток! Спасибо, что тратишь свое время на проверку моей работы! Если у тебя есть возможно, я попрошу проверить мою работу ближе к концу срока. Я очень хочу завершить ее и обещаю, что сегодня будет доделана уже! Осталось только drag&drop (сложно). Время 14:48 26.10. Всегда на связи: Discord teumik#1795, Telegram и GitHub: teumik ')
// alert('Доброго времени суток! Спасибо, что тратишь свое время на проверку моей работы! \nЯ доделал Drag&Drop но могут быть легкие баги, которые допиливаю. Если они обнаружатся не мной, напиши мне, чтобы я все исправил. \nСпасибо! \nВремя 14:48 26.10. Всегда на связи: \nDiscord teumik#1795, \nTelegram и GitHub: teumik ')

import './index.html';
import './index.scss';
import clickCells from './assets/audio/click_cells.mp3';
import misclick from './assets/audio/misclick.mp3';
import menuClick from './assets/audio/click_menu.mp3';
import menuSound from './assets/audio/menu.mp3';
import winSound from './assets/audio/win.mp3';

import { BasicNode } from './modules/basicNode';
export { BasicNode };
import { allert } from './modules/allert';
export { allert };
import { buttonsWrapper } from './modules/buttons';
export { buttonsWrapper };
import { moves } from './modules/moves';
export { moves };
import { time } from './modules/time';
export { time };
import { fieldInfo, size } from './modules/fieldInfo';
export { fieldInfo, size };
import { menu } from './modules/menu';
export { menu };
import { overlay } from './modules/overlay';
export { overlay };
import { overlayRestart } from './modules/overlayRestart';
export { overlayRestart };

import { header } from './modules/header';
import { makeField } from './modules/field';
import { footer } from './modules/footer';
import { ContextConsumer } from 'react-is';
import { functions } from 'lodash';

// VARIABLE

let isGameStart = false;

let settings = {
  load: false,
  field: 4,
  count: 0,
  time: {
    min: 0,
    sec: 0,
  },
  matrix: [],
  sound: true,
  scores: [],
}

// PRELOAD

// MAKE DOM

const wrapper = new BasicNode('div', 'wrapper', undefined);
wrapper.append(header, makeField(settings.field), footer);
document.body.append(wrapper);

document.body.append(allert);
document.body.append(overlayRestart);

// GET DOM

const field = document.querySelector('.field');
let items = document.querySelectorAll('.field__item');
const menuButton = document.querySelector('.buttons__item');
const count = document.querySelector('.moves__count');
const timeContent = document.querySelector('.time__content');
const options = document.querySelector('.options');
const fieldSize = document.querySelector('.size');
const overlaySecond = document.querySelector('.overlay_restart');
const restart = document.querySelector('.restart');

// LISTENERS

globalThis.addEventListener('resize', resize);
field.addEventListener('click', detectCell);
menuButton.addEventListener('click', openMenu);
menu.addEventListener('click', methodTrigger);
restart.addEventListener('click', setRestart)

// VARIABLE

let matrix = makeMatrix(Array.from(items).map(item => Number(item.dataset.id)));
let reference = JSON.parse(JSON.stringify(matrix));

// BEFORELOAD

fieldSize.innerHTML = `${settings.field}x${settings.field}`;
timeContent.innerHTML = 'Practice'

// TIMER

let stopwatch;

class Timer {
  constructor() {
    this.timer = {
      min: 0,
      sec: 0,
    }
    this.isTimerOn = false;
  }

  start() {
    this.refresh();
    this.isTimerOn = true;
    this.interval = setInterval(() => {
      if (this.timer.sec >= 59) {
        this.timer.min++;
        this.timer.sec = 0;
      } else {
        this.timer.sec++;
      }
      this.refresh();
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this.isTimerOn = false;
  }

  refresh() {
    timeContent.innerHTML = `${String(this.timer.min).padStart(2, '0')}:${String(this.timer.sec).padStart(2, '0')}`;
  }

  reset() {
    clearInterval(this.interval);
    this.interval = null;
    if (!settings.load) {
      timeContent.innerHTML = '00:00';
    }
  }
}

// SOUND

function playSound(src) {
  if (settings.sound) {
    let audio = new Audio(src);
    audio.play();
  }
}

// CHANGE STYLE


// GAME

class Game {
  continue() {
    openMenu();
    options.classList.remove('options_open');
  }

  newGame() {
    isGameStart = true;
    if (!settings.load) {
      matrix = makeMatrix(Array.from(items).map(item => Number(item.dataset.id)));
      flatter(matrix);
      reference = JSON.parse(JSON.stringify(matrix));
    } else {
      setPositionItem(matrix);
      reference = JSON.parse(JSON.stringify(matrix));
    }
    openMenu();
    reset(settings);
    stopwatch = new Timer();
    if (settings.load) {
      stopwatch.timer.min = settings.time.min;
      stopwatch.timer.sec = settings.time.sec;
    }
    stopwatch.start();
  }
  size() {
    options.classList.toggle('options_open');
    options.addEventListener('click', setField);
  }
  save() {
    if (!stopwatch) {
      playSound(misclick);
      return;
    }
    settings.matrix = matrix;
    settings.time.min = stopwatch.timer.min;
    settings.time.sec = stopwatch.timer.sec;
    localStorage.game = JSON.stringify(settings);
  }
  load() {
    if (localStorage.game) {
      settings = JSON.parse(localStorage.game);
    } else {
      playSound(misclick);
      return;
    }
    setField('load');
  }
  scores() {
    console.log('scores');
  }
  sound() {
    settings.sound = !settings.sound;
  }
}

let game = new Game();

// NEW FIELD

function setField(event) {
  if (event && event !== 'load') {
    if (event.target.classList.contains('options__item')) {
      const value = event.target.dataset.value;
      settings.field = Number(value);

      field.replaceChildren(...makeField(settings.field).children);
      items = document.querySelectorAll('.field__item');

      options.classList.toggle('options_open');
      fieldSize.innerHTML = `${value}x${value}`;

      game = new Game();
      game.newGame();
    }
  } else if (event === 'load') {
    field.replaceChildren(...makeField(settings.field).children);
    items = document.querySelectorAll('.field__item');

    fieldSize.innerHTML = `${settings.field}x${settings.field}`;

    matrix = settings.matrix;

    if (!settings.sound) {
      document.querySelector('[data-id="sound"]').classList.add('menu__item_nosound');
    }

    if (stopwatch) {
      stopwatch.reset();
    }

    settings.load = true;
    game = new Game();
    game.newGame();
    settings.load = false;
  }
}

// TRIGGER

function methodTrigger(event) {
  if (event.target.classList.contains('menu__item')) {
    playSound(menuClick);
  }
  if (event.target.dataset.id) {
    game[event.target.dataset.id]();
    if (event.target.dataset.id === 'sound') {
      event.target.classList.toggle('menu__item_nosound');
    }
  }
}

// RESIZE

function resize(event) {
  if (field.offsetHeight !== field.offsetWidth) {
    field.style.width = field.offsetHeight + 'px';
  }
}

resize();

// MATRIX FROM ITEMS

function makeMatrix(items) {
  const size = Math.sqrt(items.length);
  let m = [];
  for (let i = 0; i < size; i++) {
    m.push([]);
  }
  let x = 0;
  let y = 0;
  for (let i = 0; i < items.length; i++) {
    if (x >= size) {
      x = 0;
      y++;
    }
    m[y][x] = items[i];
    x++;
  }
  return m;
}

// SET POSITION

// setPositionItem(matrix);

function setPositionItem(m) {
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m[y].length; x++) {
      const v = m[y][x];
      const node = items[v - 1];
      setNodesStyle(node, x, y)
    }
  }
}

// SET STYLE

function setNodesStyle(node, x, y) {
  const shift = 100 / settings.field;
  node.style.top = y * shift + '%';
  node.style.left = x * shift + '%';
}

// FLATTER

function flatter(m) {
  matrix = makeMatrix(_.shuffle(m.flat()));
  let check = isValidShuffle(matrix.flat(), matrix);
  if (settings.field === 4 && check === 1) {
    flatter(matrix);
    return;
  }
  if (settings.field === 3 && check === 0) {
    flatter(matrix);
    return;
  }
  setPositionItem(matrix);
}

flatter(matrix);

// CLICK ON CELL

function detectCell(event) {
  const item = event.target.closest('.field__item');
  if (!item) return;
  if (item.classList.contains('field__item_blank')) return;

  const target = Number(item.dataset.id);
  const blank = Number(this.children.length);

  const buttonCoords = detectMatrixPosition(target, matrix);
  const blankCoords = detectMatrixPosition(blank, matrix);

  const isValid = validateSwap(buttonCoords, blankCoords);

  if (isValid) {
    swapMatrixItem(buttonCoords, blankCoords, matrix);
    setPositionItem(matrix);
    settings.count++;
    refreshStats(settings);
    playSound(clickCells);

    const isMatrix = isMatrixCompete(matrix);

    // let score = prepareScore(settings.field, settings.count, `${String(stopwatch.timer.min).padStart(2, 0) + ':' + String(stopwatch.timer.sec).padStart(2, 0)}`, new Date());
    // setLocalStorage(score);

    if (isMatrix && isGameStart) {
      stopwatch.stop();
      playSound(winSound);
      allert.firstElementChild.innerHTML = `Hooray! You solved the puzzle in ${stopwatch.timer.min + ':' + stopwatch.timer.sec} and ${settings.count} moves`;
      allert.classList.add('allert_open');
      overlaySecond.classList.add('overlay_restart_open');

      let score = prepareScore(settings.field, settings.count, `${String(stopwatch.timer.min).padStart(2, 0) + ':' + String(stopwatch.timer.sec).padStart(2, 0)}`, new Date());
      setLocalStorage(score);
    }
  } else {
    playSound(misclick);
  }
}

// MATRIX POSITION

function detectMatrixPosition(item, m) {
  const coords = {};
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m[y].length; x++) {
      if (m[y][x] === item) {
        coords.y = y;
        coords.x = x;
        return coords;
      }
    }
  }
}

// VALIDATION

function validateSwap(buttonCoords, blankCoords) {
  const diffX = Math.abs(buttonCoords.x - blankCoords.x);
  const diffY = Math.abs(buttonCoords.y - blankCoords.y);
  if ((diffX === 1 || diffY === 1) && (buttonCoords.x === blankCoords.x || buttonCoords.y === blankCoords.y)) {
    return true;
  } else {
    return false;
  }
}

// SWAP

function swapMatrixItem(buttonCoords, blankCoords, m) {
  [matrix[buttonCoords.y][buttonCoords.x], matrix[blankCoords.y][blankCoords.x]] = [matrix[blankCoords.y][blankCoords.x], matrix[buttonCoords.y][buttonCoords.x]];
}

// MENU

function openMenu(event) {
  const menu = document.querySelector('.menu');
  const overlay = document.querySelector('.overlay');

  menu.classList.toggle('menu_open');
  scoresContainer.classList.remove('scores_open');


  if (menu.classList.contains('menu_open')) {
    playSound(menuSound);
  } else {
    playSound(menuClick);
  }

  overlay.classList.toggle('overlay_open');
  field.classList.toggle('field_open');
  options.classList.remove('options_open');

  overlay.addEventListener('click', openMenu);

  if (stopwatch) {
    if (stopwatch.isTimerOn) {
      stopwatch.stop();
    } else {
      stopwatch.start();
    }
  }
}

// REFRESH

function refreshStats(settings) {
  count.innerHTML = settings.count;
}

// RESET

function reset(settings) {
  if (!settings.load) {
    settings.count = 0;
  }
  count.innerHTML = settings.count;
  if (stopwatch) {
    stopwatch.reset();
  }
}

// WIN

function isMatrixCompete(m) {
  reference = reference.flat().sort((a, b) => a - b)
  return JSON.stringify(reference) === JSON.stringify(matrix.flat());
}

// RESTART

function setRestart() {
  allert.classList.remove('allert_open');
  overlaySecond.classList.remove('overlay_restart_open');

  game = new Game();
  game.newGame();
  stopwatch.stop();
}

// SET LOCAL STORAGE

// let s1 = prepareScore(3, 4, '12:23', new Date());
// let s2 = prepareScore(3, 4, '12:23', new Date());
// // let s3 = prepareScore(3, 4, '12:23', new Date());
// // let s4 = prepareScore(3, 4, '12:23', new Date());
// setLocalStorage(s1);
// setLocalStorage(s2);
// // setLocalStorage(s3);
// // setLocalStorage(s4);

function prepareScore(size, count, time, date) {
  const day = String(date.getDate()).padStart(2, 0);
  const month = date.getMonth() + 1;
  const year = String(date.getFullYear()).slice(-2);
  const fullDate = day + '.' + month + '.' + year;
  const arr = [size, count, time, fullDate]
  return arr;
}

function setLocalStorage(data) {
  let value;
  if (!localStorage.getItem('scores')) {
    value = [];
    value.push(data);
  } else {
    value = JSON.parse(localStorage.getItem('scores'));
    value.push(data);
    const sort = sortStorage(value);
    value = sort;
    if (value.length > 10) {
      value.pop();
    }
  }
  value = JSON.stringify(value);
  localStorage.setItem('scores', value);
  uploadScores();
}

function sortStorage(value) {
  let arr = value.sort((a, b) => {
    if (b[0] === a[0]) {
      if (a[1] === b[1]) {
        if (parseInt(a[2]) === parseInt(b[2])) {
          return parseInt(a[2].slice(-2)) - parseInt(b[2].slice(-2));
        }
        return parseInt(a[2]) - parseInt(b[2]);
      }
      return a[1] - b[1];
    }
    return b[0] - a[0];
  })
  return arr;
}

// GET LOCAL STORAGE

const scoresButton = document.querySelector('[data-id="scores"]');
globalThis.addEventListener('storage', uploadScores);

function uploadScores() {
  let storage = getLocalStorage();
  let table = createScores(storage);
  if (!document.querySelector('.scores')) {
    scoresButton.append(table);
  } else {
    scoresButton.firstElementChild.replaceChildren(...table.children);
  }
}
uploadScores();

const scoresContainer = document.querySelector('.scores');
scoresButton.addEventListener('click', openScores);

function openScores() {
  scoresContainer.classList.toggle('scores_open');
}

function getLocalStorage() {
  let value = JSON.parse(localStorage.getItem('scores'));
  return value;
}

// CREATE SCORES NODE

function createScores(scores) {

  const columns = ['#', 'Size', 'Count', 'Time', 'Date'];
  const table = new BasicNode(undefined, 'scores', undefined);
  let rows = new BasicNode(undefined, 'row', undefined);
  let cells;

  for (let name of columns) {
    cells = new BasicNode(undefined, 'row__cell', `${name}`);
    rows.append(cells);
  }

  table.append(rows);

  let n = 1;

  if (scores) {
    for (let row of scores) {
      rows = new BasicNode(undefined, 'row', undefined);
      cells = new BasicNode(undefined, 'row__cell', `${n}`);
      rows.append(cells);
      n++;
      for (let cell of row) {
        cells = new BasicNode(undefined, 'row__cell', `${cell}`);
        rows.append(cells);
      }
      table.append(rows);
    }
  }

  return table;
}

// SUFFLE VALIDATION

function isValidShuffle(flat, matrix) {
  let count = 0;
  let sum = 0;
  for (let i = 0; i < flat.length; i++) {
    if (flat[i] === flat.length) {
      let row = 0;
      for (let k = 0; k < matrix.length; k++) {
        if (row) {
          break;
        }
        for (let n = 0; n < matrix[k].length; n++) {
          if (matrix[k][n] === flat.length) {
            row = k + 1;
            break;
          }
        }
      }
      sum = row;
      continue;
    }
    for (let j = i; j < flat.length; j++) {
      if (flat[j] === flat.length) {
        continue;
      }
      if (flat[j] < flat[i]) {
        count++;
      };
    }
  }
  return (sum + count) % 2;
}

// DRAG QUEEN

field.addEventListener('mousedown', ballTracker);

function ballTracker(event) {
  if (!event.target.classList.contains('field__item')) {
    return;
  }

  const context = event.target;
  const parent = context.offsetParent;
  const parentWidth = parent.offsetWidth;
  const parentHeight = parent.offsetHeight;

  let shiftX = event.clientX - context.getBoundingClientRect().left;
  let shiftY = event.clientY - context.getBoundingClientRect().top;
  let targetLeft = parseInt(context.style.left);
  let targetTop = parseInt(context.style.top);
  let shift = 100 / settings.field;

  context.style.zIndex = 8;

  let coords = newDetect(context);

  moveAt.call(context, event.pageX, event.pageY);

  function moveAt(x, y) {
    const parentClearWidth = parentWidth - parent.clientLeft * 2;
    const parentClearHeight = parentHeight - parent.clientLeft * 2;
    const shiftLeft = x - parent.getBoundingClientRect().left - parent.clientLeft - shiftX;
    const shiftTop = y - parent.getBoundingClientRect().top - parent.clientTop - shiftY;

    const left = shiftLeft * 100 / parentClearWidth;
    const top = shiftTop * 100 / parentClearHeight;

    // if (top <= (targetTop - shift)) {
    //   top = targetTop - shift;
    // } else if (top >= (targetTop + shift)) {
    //   top = targetTop + shift;
    // }

    // if (left <= (targetLeft - shift)) {
    //   left = targetLeft - shift;
    // } else if (left >= (targetLeft + shift)) {
    //   left = targetLeft + shift;
    // }

    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);

    let isClick = elemBelow.classList.contains('field') || elemBelow.classList.contains('field__item');

    if (isClick) {
      let click = new Event('click');
      field.dispatchEvent(click);
    }

    if ((coords.yt !== coords.yb) && (coords.xt !== coords.xb)) {
      return;
    }

    if ((coords.yt - coords.yb) === -1) {
      if (top <= (targetTop - shift)) {
        context.style.top = targetTop - shift + '%';
        return;
      } if (top >= targetTop) {
        context.style.top = targetTop;
        return
      }
      context.style.top = top + '%';
      return;
    }

    if ((coords.yt - coords.yb) === 1) {
      if (top >= (targetTop + shift)) {
        context.style.top = targetTop + shift + '%';
        return;
      } if (top <= targetTop) {
        context.style.top = targetTop;
        return
      }
      context.style.top = top + '%';
      return;
    }

    if ((coords.xt - coords.xb) === -1) {
      if (left <= (targetLeft - shift)) {
        context.style.left = targetLeft - shift + '%';
        return;
      } if (left >= targetLeft) {
        context.style.left = targetLeft;
        return
      }
      context.style.left = left + '%';
      return;
    }

    if ((coords.xt - coords.xb) === 1) {
      if (left >= (targetLeft + shift)) {
        context.style.left = targetLeft + shift + '%';
        return;
      } if (left <= targetLeft) {
        context.style.left = targetLeft;
        return
      }
      context.style.left = left + '%';
      return;
    }
  }

  document.addEventListener('mousemove', moveBy);

  function moveBy(event) {
    moveAt.call(context, event.pageX, event.pageY);
  }

  document.addEventListener('mouseup', moveEnd);

  function moveEnd(event) {
    document.removeEventListener('mousemove', moveBy);
  }
}

function newDetect(event) {
  const item = event;
  const target = Number(item.dataset.id);
  const blank = Number(field.children.length);
  const buttonCoords = detectMatrixPosition(target, matrix);
  const blankCoords = detectMatrixPosition(blank, matrix);

  let coords = {
    xb: buttonCoords.x,
    xt: blankCoords.x,
    yb: buttonCoords.y,
    yt: blankCoords.y,
  }

  return coords;
}
