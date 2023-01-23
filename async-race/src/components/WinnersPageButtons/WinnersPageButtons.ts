import './winnersPageButtons.scss';
import BaseNode from '../BaseNode/BaseNode';
import WinnersPage from '../WinnersPage/WinnersPage';

export type Swipe = '<' | '>';

export default class WinnersPageButtons {
  node: HTMLElement | null;
  parent: HTMLElement | null;
  that: WinnersPage | null;

  constructor() {
    this.node = null;
    this.parent = null;
    this.that = null;
  }

  async swipePage(swipe: Swipe) {
    const page = this.that?.pageNumber;
    switch (swipe) {
      case '<': {
        if (page?.current === 1) return;
        if (page) page.current -= 1;
        break;
      }
      case '>': {
        if (page?.max === page?.current) return;
        if (page) page.current += 1;
        break;
      }
      default:
        break;
    }
    await this.that?.headers.render();
    await this.that?.table.rows.render();
    this.that?.pageButtons.render();
  }

  render(parent?: HTMLElement, that?: WinnersPage) {
    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;
    const page = this.that?.pageNumber;
    const max = page?.max;
    const current = page?.current;
    const winners = this.that?.that?.disabled.winners;

    const { node } = new BaseNode({
      className: 'main__buttons',
      childrens: [
        new BaseNode({
          tag: 'button',
          className: ['main__buttons_prev'],
          inner: 'Prev',
          attributes: {
            disabled: winners || page?.current === 1,
          },
          click: () => this.swipePage('<'),
        }).node,
        new BaseNode({
          tag: 'button',
          className: ['main__buttons_next'],
          inner: 'Next',
          attributes: {
            disabled: winners || max === 0 || current === max || max === null,
          },
          click: () => this.swipePage('>'),
        }).node,
      ],
    });

    this.node?.remove();
    this.parent?.append(node);

    this.node = node;
    return node;
  }
}
