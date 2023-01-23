import './create.scss';
import BaseNode from '../../BaseNode/BaseNode';
import { createCar } from '../../../lib/api';
import Control from '../Control';
import Fragment from '../../Fragment/Fragment';

export default class Create {
  node: HTMLElement | null;
  that: Control | null;
  parent: HTMLElement | null;

  constructor() {
    this.node = null;
    this.parent = null;
    this.that = null;
  }

  async updateViewState() {
    this.that?.view.render();
    this.that?.panel.render();
  }

  async submit(event: MouseEvent) {
    event.preventDefault();
    const button = event.target as HTMLButtonElement;
    const form = button.parentElement as HTMLFormElement;
    const data = new FormData(form);
    const car = {
      name: String(data.get('name')),
      color: String(data.get('color')),
    };
    form.color.value = '#000000';
    const input = form.children[0] as HTMLInputElement;
    input.value = '';
    await createCar(car);
  }

  onInput = (event: Event, prop: string) => {
    const { value } = event.target as HTMLInputElement;
    const state = this.that?.that?.state.creator;
    if (state) Object.assign(state, { [prop]: value !== '' ? value : null });
    if (state) this.updateViewState();
  };

  click = async (event: MouseEvent) => {
    await this.submit(event);
    await this.that?.that?.headers.render();
    await this.that?.that?.garage.render();
    this.that?.that?.pageButtons.render();
    const state = this.that?.that?.state.creator;
    if (state) Object.assign(state, { name: null, color: null, id: null });
    this.updateViewState();
    this.that?.that?.control.render();
    await this.that?.that?.headers.render();
    await this.that?.that?.garage.render();
    this.that?.that?.pageButtons.render();
  };

  createLayout = (name: string, color: string) => new Fragment({
    childrens: [
      new BaseNode({
        tag: 'input',
        className: 'control__text',
        attributes: {
          type: 'text',
          name: 'name',
          value: name,
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
        },
        oninput: (event) => this.onInput(event, 'color'),
      }).node,
      new BaseNode({
        tag: 'button',
        className: 'control__button',
        inner: 'Create',
        click: this.click,
      }).node,
    ],
  }).node;

  render(parent?: HTMLElement, that?: Control) {
    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;
    const link = this.that?.that?.state.creator;
    const color = link?.color;
    const name = link?.name;

    const { node } = new BaseNode({
      tag: 'form',
      className: ['control__create', 'control__item'],
      childrens: [
        this.createLayout(name || '', color || '#000000'),
      ],
    });

    this.node?.remove();
    this.parent?.append(node);
    this.node = node;
    return this.node;
  }
}
