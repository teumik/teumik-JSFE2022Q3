import { BasicNode } from "../index";
import { size } from "../index";

const sizes = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];

const settingsWrapper = new BasicNode(undefined, 'settings-wrapper', undefined);
const span = new BasicNode('span', undefined, 'Other sizes:');
const settings = new BasicNode('ul', 'settings', undefined);
const items = makeSettingsItem(sizes);

makeSettingsItem(sizes);

function makeSettingsItem(sizes) {
  let items = [];
  for (let el of sizes) {
    let item;
    if (size.innerHTML === el) {
      item = new BasicNode('li', ['settings__item', 'settings__item_active'], el);
    } else {
      item = new BasicNode('li', 'settings__item', el);
    }
    items.push(item);
  }
  return items;
}

settings.append(...items);
settingsWrapper.append(span, settings);

export { settingsWrapper };
