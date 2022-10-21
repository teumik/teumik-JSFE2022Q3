import { BasicNode } from "../index";

const menuNames = ['New Game', 'Size', 'Save', 'Load', 'Scores', 'Sound']
const menu = new BasicNode('div', 'menu', undefined);
const items = makeMenuItems(menuNames);
menu.append(...items);

function makeMenuItems(names) {
  let items = [];
  for (let name of names) {
    let item = new BasicNode('div', 'menu__item', name);
    items.push(item);
  }
  return items;
}

export { menu };
