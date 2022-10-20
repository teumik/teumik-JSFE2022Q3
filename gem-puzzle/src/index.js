import './index.html';
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
import { settingsWrapper } from './modules/settings';
export { settingsWrapper };

import { header } from './modules/header';
import { makeField } from './modules/field';
import { footer } from './modules/footer';

const wrapper = new BasicNode('div', 'wrapper', undefined);
wrapper.append(header, makeField(16), footer);
document.body.append(wrapper);
console.log(wrapper);
