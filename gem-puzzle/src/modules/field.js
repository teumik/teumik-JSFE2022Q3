import { BasicNode } from "../index";
import _ from 'lodash';

function makeField(quantity) {
  let items = [];
  let el;
  const field = new BasicNode('main', 'field', undefined);
  for (let q = 1; q < quantity; q++) {
    el = new BasicNode(undefined, 'field__item', q);
    items.push(el);
  }
  el = new BasicNode(undefined, 'field__item', undefined);
  el.style.opacity = '0';
  items.push(el);
  items = _.shuffle(items);
  field.append(...items);
  return field;
}

export { makeField };
