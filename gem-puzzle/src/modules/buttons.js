import { BasicNode } from "../index";

const buttonsWrapper = new BasicNode('div', 'buttons', undefined);
const buttons = new BasicNode('button', 'buttons__item', 'Menu');
buttonsWrapper.append(buttons);

export { buttonsWrapper };
