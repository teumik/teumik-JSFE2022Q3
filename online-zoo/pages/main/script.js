// alert('Доброго времени суток! Я хочу пропросить тебя об одной просьбе. Если где-то встретится ошибка, пожалуйста напиши мне, я исправлю ее. Спасибо, что уделяешь время на проверку моей работы! Всегда на связи: Discord teumik#1795, Telegram и GitHub: teumik .')
// alert('Доброго времени суток! \nСпасибо за то, что уделяешь время на проверку моей работы. Я хочу попросить тебя об одной моменте. Если есть возможность и желание, проверь мою работу ближе к концу дедлайна. \nСейчас 11.10 3:50 ночи. Завтра все доделаю и спасибо тебе! \nВсегда на связи: Discord teumik#1795, Telegram и GitHub: teumik')

import { shuffle } from './shuffle.js';

const feeds = './feeds.json';
const response = await fetch(feeds);
const data = await response.json();

const popupButton = document.querySelector('.burger-button.open');
const overlay = document.querySelector('.overlay');
const overlaySecond = document.querySelector('.overlay_second');
const closePopupButton = document.querySelector('.close-button');
const feedbacks = document.querySelector('.feedbacks');
const range = document.querySelector('.range');

// LISTENERS

popupButton.addEventListener('click', displayModal);
overlay.addEventListener('click', displayModal);
closePopupButton.addEventListener('click', displayModal);
range.addEventListener('input', slideFeeds);
globalThis.addEventListener('resize', logSize);
globalThis.addEventListener('resize', showFeedPopup);
feedbacks.addEventListener('click', showFeedPopup);
overlaySecond.addEventListener('click', showFeedPopup);

// MODAL POPUP

function displayModal() {
  document.body.classList.toggle('open-popup');
}

// CREATE NEW ARTICLE FOR FEED

function createFeed(el) {
  const svg = `<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_51001_241)"><path d="M37 18.5C37 8.30445 28.6956 0 18.5 0C8.30445 0 0 8.30445 0 18.5C0 24.6256 3.00111 30.0933 7.64667 33.4644C7.72889 33.5467 7.81111 33.5878 7.89333 33.6289C10.8944 35.7667 14.5533 37 18.5 37C22.4467 37 26.1056 35.7667 29.1067 33.6289C29.1889 33.5878 29.2711 33.5056 29.3533 33.4644C33.9989 30.0933 37 24.6256 37 18.5ZM9.04445 32.4367V31.6556C9.04445 26.4344 13.2789 22.2 18.5 22.2C23.7211 22.2 27.9556 26.4344 27.9556 31.6556V32.4367C25.2422 34.2867 21.9944 35.3556 18.5 35.3556C15.0056 35.3556 11.7578 34.2867 9.04445 32.4367ZM13.5667 15.6222C13.5667 12.9089 15.7867 10.6889 18.5 10.6889C21.2133 10.6889 23.4333 12.9089 23.4333 15.6222C23.4333 18.3356 21.2133 20.5556 18.5 20.5556C15.7867 20.5556 13.5667 18.3356 13.5667 15.6222ZM29.6 31.1622C29.3944 26.4756 26.3111 22.57 22.0767 21.1311C23.8856 19.98 25.0778 17.9244 25.0778 15.6222C25.0778 12.0044 22.1178 9.04445 18.5 9.04445C14.8822 9.04445 11.9222 12.0044 11.9222 15.6222C11.9222 17.9244 13.1144 19.98 14.9233 21.1311C10.6889 22.57 7.60556 26.5167 7.4 31.1622C3.86444 28.0789 1.64444 23.5567 1.64444 18.5C1.64444 9.20889 9.20889 1.64444 18.5 1.64444C27.7911 1.64444 35.3556 9.20889 35.3556 18.5C35.3556 23.5567 33.1356 28.0789 29.6 31.1622Z" fill="#767474" /></g><defs><clipPath id="clip0_51001_241"><rect width="37" height="37" fill="white" /></clipPath></defs></svg>`;

  const article = document.createElement('article');
  const user = document.createElement('div');
  const userAvatar = document.createElement('div');
  const img = document.createElement('img');
  const userData = document.createElement('div');
  const userName = document.createElement('h3');
  const userMeta = document.createElement('div');
  const userLocal = document.createElement('div');
  const userDate = document.createElement('div');
  const feed = document.createElement('p');

  article.className = 'feedbacks__item';
  user.className = 'user';
  userAvatar.className = 'user__avatar';
  img.className = 'avatar';
  userData.className = 'user__data';
  userName.className = 'user__name';
  userMeta.className = 'user__meta';
  userLocal.className = 'user__local';
  userDate.className = 'user__date';
  feed.className = 'feedback';

  userMeta.append(userLocal, userDate);
  userData.append(userName, userMeta);

  if (el.avatar) {
    userAvatar.append(img);
  } else {
    userAvatar.innerHTML = svg;
  }

  user.append(userAvatar, userData);
  article.append(user, feed);

  img.src = el.avatar;
  userName.innerHTML = `${el.firstName} ${el.secondName}`;
  userLocal.innerHTML = `Local ${el.local}`;
  userDate.innerHTML = el.date;
  feed.innerHTML = el.text;

  return article;
}

// PARSE FROM JSON AND APPEND FEEDS

data.feeds.forEach(el => {
  feedbacks.append(createFeed(el));
});

// SLIDER FOR ADAPTIVE

function slideFeeds(event) {
  let step;

  if (globalThis.innerWidth > 1234) {
    this.max = 7;
    step = 298;
  }
  if (globalThis.innerWidth <= 1234) {
    this.max = 8;
    step = 323;
  }
  if (globalThis.innerWidth <= 999) {
    step = 279;
  }

  let wholeStep = step * this.value;
  feedbacks.style.transform = `translateX(-${wholeStep}px)`;
}

// HIDE SOME FEEDS

function logSize() {
  if (globalThis.innerWidth <= 858) {
    if (feedbacks.children.length < 4) return;

    feedbacks.style.transform = '';

    Array.from(feedbacks.children).forEach((el, i) => {
      if (i >= 5 && i <= 8) return;
      el.style.display = 'none';
    })
  } else {
    Array.from(feedbacks.children).forEach(el => {
      el.style.display = '';
    })
  }
}

logSize();

// FEED POPUP FOR TABLET

function showFeedPopup(event) {
  if (globalThis.innerWidth > 858) return;

  if (event.type === 'resize') {
    if (document.querySelector('.feedbacks__item_open')) {
      document.querySelector('.feedbacks__item_open').remove();
    }
    overlaySecond.classList.remove('overlay_second_active');
    document.body.style.overflow = '';
    return;
  }

  let isClickOverlay = event.target.classList.contains('overlay_second_active');

  if (isClickOverlay) {
    document.querySelector('.feedbacks__item_open').remove();
    overlaySecond.classList.toggle('overlay_second_active');
    document.body.style.overflow = '';
  }

  if (event.target.closest('.feedbacks__item')) {
    let isClickClose = event.target.closest('.close-button');
    let isClickClone = event.target.closest('.feedbacks__item_open');
    console.log('pop');

    if (isClickClone && !isClickClose) return;

    if (isClickClose) {
      console.log('here');
      isClickClose.parentNode.parentNode.remove();
      document.body.style.overflow = '';
    } else {
      const target = event.target.closest('.feedbacks__item');
      const clone = target.cloneNode(true);

      let cross = document.createElement('div');
      let lineOne = document.createElement('div');
      let lineTwo = document.createElement('div');

      cross.className = 'close-button';
      lineOne.className = 'line';
      lineTwo.className = 'line';

      cross.append(lineOne, lineTwo);
      clone.classList.toggle('feedbacks__item_open');

      clone.append(cross);

      let wrap = document.createElement('div');
      wrap.className = 'wrap';
      wrap.append(...clone.children);
      clone.append(wrap);

      feedbacks.append(clone);
      document.body.style.overflow = 'hidden';
    }
    overlaySecond.classList.toggle('overlay_second_active');
  }
}

// ANIMALS SLIDER


let arr = [1, 2, 3];
arr = shuffle(arr);
console.log(arr);
