import './engineButtons.scss';
import BaseNode from '../../../../../BaseNode/BaseNode';
import CarTrack from '../CarTrack';

export default class EngineButtons {
  node: HTMLElement | null;
  parent: HTMLElement | null;
  that: CarTrack | null;
  click: (sign: 'a' | 'b') => Promise<void>;

  constructor(click: (sign: 'a' | 'b') => Promise<void>) {
    this.node = null;
    this.parent = null;
    this.that = null;
    this.click = click;
  }

  render(parent?: HTMLElement, that?: CarTrack) {
    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;
    const link = this.that?.state;

    const { node } = new BaseNode({
      className: ['car__options'],
      childrens: [
        new BaseNode({
          tag: 'button',
          className: ['car__buttons', 'car__buttons_start'],
          inner: 'A',
          attributes: {
            disabled: link?.startDisabled || link?.engine || false,
            id: 'a',
          },
          click: () => this.click('a'),
        }).node,
        new BaseNode({
          tag: 'button',
          className: ['car__buttons', 'car__buttons_pause'],
          inner: 'B',
          attributes: {
            disabled: link?.stopDisabled || !link?.engine || false,
            id: 'b',
          },
          click: () => this.click('b'),
        }).node,
      ],
    });

    this.node?.remove();
    this.parent?.append(node);
    this.node = node;
    return node;
  }
}
