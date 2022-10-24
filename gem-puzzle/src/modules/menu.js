import { BasicNode } from "../index";

const menuNames = ['New Game', 'Size', 'Save', 'Load', 'Scores', 'Sound'];
const menuAttributes = ['newGame', 'size', 'save', 'load', 'scores', 'sound'];
const menu = new BasicNode('div', 'menu', undefined);
const items = makeMenuItems(menuNames);
menu.append(...items);

function makeMenuItems(names) {
  let items = [];
  // for (let name of names) {
  for (let i = 0; i < menuNames.length; i++) {
    let item = new BasicNode('div', 'menu__item', menuNames[i]);
    item.setAttribute('data-id', menuAttributes[i]);
    items.push(item);
  }
  return items;
}

export { menu };
