import './carControl.scss';
import BaseNode from '../../../../BaseNode/BaseNode';
import GarageCar from '../GarageCar';
import { deleteCar, deleteWinner, getCar } from '../../../../../lib/api';
import { DefaultState } from '../../../../Control/Update/Update';
import { GaragePageState } from '../../../GaragePage';

export default class CarControl {
  node: HTMLElement | null;
  that: GarageCar | null;
  id: number | null;
  default: DefaultState;

  constructor() {
    this.node = null;
    this.that = null;
    this.id = null;
    this.default = {
      id: null,
      updator: {
        name: null,
        color: null,
        id: null,
      },
      creator: {
        name: null,
        color: null,
        id: null,
      },
    };
  }

  select = async (link?: GaragePageState) => {
    const state = this.that?.that?.that;
    if (link) {
      Object.assign(link, { id: this.id });
      if (this.id) {
        const car = await getCar(this.id);
        const { updator } = link;
        if (updator) Object.assign(updator, car);
        state?.control.create.render();
        state?.control.update.render();
        state?.control.view.render();
        state?.control.panel.render();
        await state?.garage.render();
        state?.pageButtons.render();
      }
    }
  };

  remove = async () => {
    const link = this.that?.that?.that;
    if (!this.id) return;
    await deleteCar(this.id);
    await deleteWinner(this.id);
    await link?.headers.render();
    await link?.garage.render();
    link?.pageButtons.render();
    const state = link?.state;
    const clone = structuredClone(this.default);
    if (state) Object.assign(state, clone);
    link?.control.update.render();
    link?.control.view.render();
    link?.control.panel.render();
  };

  render(name: string, parent: HTMLElement, that: GarageCar) {
    this.that = that ?? this.that;
    this.id = this.that?.state.car.id;
    const link = this.that.that?.that?.state;

    const { node } = new BaseNode({
      className: 'car__control',
      childrens: [
        new BaseNode({
          tag: 'button',
          className: 'car__select',
          inner: 'Select',
          attributes: { disabled: link?.id === this.id },
          click: async () => this.select(link),
        }).node,
        new BaseNode({
          tag: 'button',
          className: 'car__remove',
          inner: 'Remove',
          click: this.remove,
        }).node,
        new BaseNode({
          tag: 'span',
          className: 'car__name',
          inner: name,
        }).node,
      ],
    });

    parent.append(node);
    this.node = node;
    return this.node;
  }
}
