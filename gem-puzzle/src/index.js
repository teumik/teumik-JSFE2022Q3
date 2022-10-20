import { lowerFirst, shuffle } from 'lodash';
import './index.html';
import './index.scss';

class BasicNode {
  constructor(tag = 'div', className = '', content = '') {
    this.node = document.createElement(tag);
    if (!className) {

    } else if (Array.isArray(className)) {
      this.node.classList.add(...className);
    } else {
      this.node.classList.add(className);
    }

    this.node.innerHTML = content;
    return this.node;
  }
}

const x = new BasicNode(undefined, undefined, undefined);

const wrapper = new BasicNode('div', 'wrapper', undefined);
const topWrapper = new BasicNode('header', 'top-wrapper', undefined);
const bottomWrapper = new BasicNode('header', 'bottom-wrapper', undefined);
const field = new BasicNode('main', 'field', undefined);
const buttonsWrapper = new BasicNode('div', 'buttons', undefined);

// const buttonsNames = {
//   b1: 'Shuffle and start',
//   disabled: 'Stop',
//   b3: 'Save',
//   b4: 'Results',
// }
// const buttons = [];
// for (let prop in buttonsNames) {
//   console.log(buttonsNames.prop);
//   let el = new BasicNode('button', 'button__item', buttonsNames.prop);
//   buttons.push();
// }


console.log(wrapper);
console.log(topWrapper);
console.log(bottomWrapper);
console.log(field);
console.log(buttonsWrapper);

const start = document.querySelector('.buttons__item');
console.log(start);
const f = document.querySelectorAll('.field__item')[5];
const s = document.querySelectorAll('.field__item')[9];
console.log(f);
console.log(s);

start.addEventListener('click', func)

function func(event) {
  f.style.order = '10';
  s.style.order = '6';
}
