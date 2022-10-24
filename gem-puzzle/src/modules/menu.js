import { BasicNode } from "../index";

const sizes = [3, 4, 5, 6, 7, 8];
const menuNames = ['Continue', 'New Game', 'Size', 'Save', 'Load', 'Scores', 'Sound'];
const menuAttributes = ['continue', 'newGame', 'size', 'save', 'load', 'scores', 'sound'];
const menu = new BasicNode('div', 'menu', undefined);
const items = makeMenuItems(menuNames);
menu.append(...items);

function makeMenuItems(names) {
  let items = [];
  for (let i = 0; i < menuNames.length; i++) {
    let item = new BasicNode('div', 'menu__item', menuNames[i]);
    if (menuNames[i] === 'Size') {
      const options = makeOption();
      item.append(options);
    }
    item.setAttribute('data-id', menuAttributes[i]);
    items.push(item);
  }
  return items;
}

function makeOption() {
  let items = [];
  sizes.forEach(el => {
    let item = new BasicNode('div', 'options__item', `${el}x${el}`);
    item.setAttribute('data-value', el);
    items.push(item);
  })
  const container = new BasicNode('div', 'options', undefined);
  container.append(...items)
  return container;
}

export { menu };
