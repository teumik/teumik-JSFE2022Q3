import './garageHeaders.scss';
import BaseNode from '../../BaseNode/BaseNode';
import { getCarsCount } from '../../../lib/api';
import GaragePage from '../GaragePage';

interface LayoutProp {
  length: number;
  current: number;
}

export default class GarageHeaders {
  node: HTMLElement | null;
  that: GaragePage | null;
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
          inner: 'Garage ',
          childrens: [
            new BaseNode({
              tag: 'span',
              className: 'title__cars-count',
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

  async render(parent?: HTMLElement, that?: GaragePage) {
    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;
    const length = await getCarsCount(null);
    const max = Math.ceil(length / 7);
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
