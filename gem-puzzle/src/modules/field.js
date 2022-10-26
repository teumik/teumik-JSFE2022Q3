import { BasicNode } from './basicNode';

function makeField(q) {
  const quantity = q * q;
  const items = [];
  let el;
  const field = new BasicNode('main', 'field', undefined);
  for (let i = 1; i <= quantity; i++) {
    if (i === quantity) {
      el = new BasicNode(undefined, ['field__item', 'field__item_blank'], i);
    } else {
      el = new BasicNode(undefined, 'field__item', i);
    }
    el.setAttribute('data-id', i);
    el.style.width = `${100 / Math.sqrt(quantity)}%`;
    el.style.height = `${100 / Math.sqrt(quantity)}%`;
    el.style.fontSize = `${24 / q}em`;
    items.push(el);
  }
  field.append(...items);
  return field;
}

export { makeField };
