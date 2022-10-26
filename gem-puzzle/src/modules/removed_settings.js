import { BasicNode } from './basicNode';
import { size } from '../index';

const sizesName = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];

const settingsWrapper = new BasicNode(undefined, 'settings-wrapper', undefined);
const span = new BasicNode('span', undefined, 'Other sizes:');
const settings = new BasicNode('ul', 'settings', undefined);

function makeSettingsItem(sizes) {
  const items = [];
  for (let i = 0; i < sizes.length; i++) {
    let item;
    if (size.innerHTML === sizes[i]) {
      item = new BasicNode('li', ['settings__item', 'settings__item_active'], sizes[i]);
    } else {
      item = new BasicNode('li', 'settings__item', sizes[i]);
    }
    items.push(item);
  }
  return items;
}

const items = makeSettingsItem(sizesName);

settings.append(...items);
settingsWrapper.append(span, settings);

export { settingsWrapper };
