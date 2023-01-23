import './update.scss';
import BaseNode from '../../BaseNode/BaseNode';
import Control from '../Control';
import { updateCar } from '../../../lib/api';
import Fragment from '../../Fragment/Fragment';
import { GaragePageState } from '../../GaragePage/GaragePage';

export interface DefaultState {
  id: number | null;
  updator: {
    name: string | null;
    color: string | null;
    id: number | null;
  };
  creator: {
    name: string | null;
    color: string | null;
    id: number | null;
  };
}

export default class Update {
  node: HTMLElement | null;
  that: Control | null;
  parent: HTMLElement | null;
  default: DefaultState;

  constructor() {
    this.node = null;
    this.parent = null;
    this.that = null;
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

  async submit(event: MouseEvent, id: number) {
    event.preventDefault();
    const button = event.target as HTMLButtonElement;
    const form = button.parentElement as HTMLFormElement;
    const data = new FormData(form);
    const car = {};
    const name = String(data.get('name'));
    const color = String(data.get('color'));
    if (name !== '') Object.assign(car, { name });
    Object.assign(car, { color });
    form.color.value = '#000000';
    const input = form.children[0] as HTMLInputElement;
    input.value = '';
    await updateCar(id, car);
  }

  async click(event: MouseEvent) {
    const id = this.that?.that?.state.id;
    const button = event.target as HTMLButtonElement;
    const form = button.parentElement as HTMLFormElement;
    if (!id) {
      const input = form.children[0] as HTMLInputElement;
      input.placeholder = 'Choose a car';
      input.value = 'Choose a car';
      input.style.color = 'orangered';
      const timerId = setInterval(() => {
        const link = this.that?.that?.state;
        if (!link?.id) return;
        input.placeholder = '';
        input.value = '';
        input.style.color = '';
        clearInterval(timerId);
      }, 500);
      event.preventDefault();
      return;
    }
    const state = this.that?.that?.state;
    const clone = structuredClone(this.default);
    if (!state) return;
    Object.assign(state, clone);
    if (state.id) state.id = null;
    await this.submit(event, id);
    this.that?.that?.control.render();
    await this.that?.that?.headers.render();
    await this.that?.that?.garage.render();
    this.that?.that?.pageButtons.render();
    this.updateViewState();
  }

  async updateViewState() {
    this.that?.view.render();
    this.that?.panel.render();
  }

  onInput = (event: Event, prop: string) => {
    const { value } = event.target as HTMLInputElement;
    const state = this.that?.that?.state.updator;
    if (state) Object.assign(state, { [prop]: value !== '' ? value : null });
    if (state) this.updateViewState();
  };

  createLayout = (name: string, color: string, link?: GaragePageState) => new Fragment({
    childrens: [
      new BaseNode({
        tag: 'input',
        className: 'control__text',
        attributes: {
          type: 'text',
          name: 'name',
          value: name,
          disabled: Boolean(!link?.id),
        },
        oninput: (event) => this.onInput(event, 'name'),
      }).node,
      new BaseNode({
        tag: 'input',
        className: 'control__color',
        attributes: {
          type: 'color',
          name: 'color',
          value: color,
          disabled: Boolean(!link?.id),
        },
        oninput: (event) => this.onInput(event, 'color'),
      }).node,
      new BaseNode({
        tag: 'button',
        className: 'control__button',
        inner: 'Update',
        attributes: {
          disabled: Boolean(!link?.id),
        },
        click: async (event) => this.click(event),
      }).node,
    ],
  }).node;

  render(parent?: HTMLElement, that?: Control) {
    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;
    const link = this.that?.that?.state;
    const color = link?.updator?.color;
    const name = link?.updator?.name;

    const { node } = new BaseNode({
      tag: 'form',
      className: ['control__update', 'control__item'],
      childrens: [
        this.createLayout(name || '', color || '#000000', link),
      ],
    });

    this.node?.remove();
    this.parent?.append(node);
    this.node = node;
    return this.node;
  }
}
