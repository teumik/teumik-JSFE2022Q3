import './winnersHeaders.scss';
import BaseNode from '../../BaseNode/BaseNode';
import { getWinnersCount } from '../../../lib/api';
import WinnersPage from '../WinnersPage';

interface LayoutProp {
  length: number;
  current: number;
}

export default class WinnersHeaders {
  node: HTMLElement | null;
  that: WinnersPage | null;
  parent: HTMLElement | null;

  constructor() {
    this.node = null;
    this.that = null;
    this.parent = null;
  }

  creatLayout = ({ length, current }: LayoutProp) => {
    const { node } = new BaseNode({
      childrens: [
        new BaseNode({
          tag: 'h2',
          className: 'title',
          inner: 'Winners ',
          childrens: [
            new BaseNode({
              tag: 'span',
              className: 'title__winners-count',
              inner: `(${length})`,
            }).node,
          ],
        }).node,
        new BaseNode({
          tag: 'h3',
          className: 'subtitle',
          inner: 'Page #',
          childrens: [
            new BaseNode({
              tag: 'span',
              className: 'subtitle__pages-count',
              inner: `${current}`,
            }).node,
          ],
        }).node,
      ],
    });
    return node;
  };

  async render(parent?: HTMLElement, that?: WinnersPage) {
    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;
    const length = await getWinnersCount(null);
    const max = Math.ceil(length / 10);
    const link = this.that?.pageNumber;
    if (link) Object.assign(link, { ...link, max });
    const current = link?.current || 1;

    const node = this.creatLayout({ length, current });

    this.node?.remove();
    this.parent?.append(node);

    this.node = node;
    return node;
  }
}
