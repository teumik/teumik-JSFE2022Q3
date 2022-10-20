import { BasicNode } from "../index";

const buttonsNames = ['Shuffle and start', 'Stop', 'Save', 'Results'];
const buttonsWrapper = new BasicNode('div', 'buttons', undefined);
const buttons = makeButtons(buttonsNames);
buttonsWrapper.append(...buttons);

function makeButtons(names) {
  const buttons = [];
  for (let prop of names) {
    let button = new BasicNode('button', 'buttons__item', prop);
    if (prop === 'Stop') {
      button.disabled = true;
    }
    buttons.push(button);
  }
  return buttons;
}

export { buttonsWrapper };
