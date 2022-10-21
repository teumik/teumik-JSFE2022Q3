// import './index.html';
import './index.scss';

import { BasicNode } from './modules/basicNode';
export { BasicNode };
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

import { header } from './modules/header';
import { makeField } from './modules/field';
import { footer } from './modules/footer';

const wrapper = new BasicNode('div', 'wrapper', undefined);
wrapper.append(header, makeField(16), footer);
document.body.append(wrapper);

const field = document.querySelector('.field');
globalThis.addEventListener('resize', resize);

function resize(event) {
  if (field.offsetHeight !== field.offsetWidth) {
    field.style.width = field.offsetHeight + 'px';
  }
}

resize();






const menuButton = document.querySelector('.buttons__item');
menuButton.addEventListener('click', openMenu);

function openMenu(event) {
  const menu = document.querySelector('.menu');
  const overlay = document.querySelector('.overlay');

  menu.classList.toggle('menu_open');
  overlay.classList.toggle('overlay_open');
  field.classList.toggle('field_open');

  overlay.addEventListener('click', openMenu)
}
