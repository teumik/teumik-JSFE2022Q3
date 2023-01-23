import './nav.scss';
import BaseNode from '../BaseNode/BaseNode';
import App, { Pages } from '../../App';

export default class Nav {
  node: HTMLElement | null;
  parent: HTMLElement | null;
  that: App | null;
  cb: (name: Pages) => void;

  constructor(cb: (name: Pages) => void) {
    this.node = null;
    this.parent = null;
    this.that = null;
    this.cb = cb;
  }

  render(parent?: HTMLElement, that?: App) {
    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;
    const link = this.that?.state.location;

    const { node } = new BaseNode({
      tag: 'nav',
      className: 'nav',
      childrens: [
        new BaseNode({
          tag: 'button',
          className: 'nav__button',
          inner: 'Garage',
          attributes: {
            disabled: link === 'garage',
          },
          click: () => this.cb('garage'),
        }).node,
        new BaseNode({
          tag: 'button',
          className: 'nav__button',
          inner: 'Winners',
          attributes: {
            disabled: this.that?.disabled.winners || link === 'winners',
          },
          click: () => this.cb('winners'),
        }).node,
      ],
    });

    this.node?.remove();
    this.parent?.append(node);
    this.node = node;
    return node;
  }
}
