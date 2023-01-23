import './tableRow.scss';
import { Winner, getCar, getWinners } from '../../../../lib/api';
import BaseNode from '../../../BaseNode/BaseNode';
import Table from '../Table';
import Fragment from '../../../Fragment/Fragment';
import carIcon from '../../../../assets/svgs/car.svg';

export default class TableRow {
  node: HTMLElement | null;
  that: Table | null;
  parent: HTMLElement | null;

  constructor() {
    this.node = null;
    this.that = null;
    this.parent = null;
  }

  getRowCell = async ({ wins, time, id }: Winner) => {
    const { name, color } = await getCar(id);
    return new Fragment({
      childrens: [
        new BaseNode({
          tag: 'td',
          className: ['table__column'],
          attributes: {
            style: `fill: ${color}`,
          },
          inner: `${carIcon}`,
        }).node,
        new BaseNode({
          tag: 'td',
          className: ['table__column'],
          inner: `${name}`,
        }).node,
        new BaseNode({
          tag: 'td',
          className: ['table__column'],
          inner: `${wins}`,
        }).node,
        new BaseNode({
          tag: 'td',
          className: ['table__column'],
          inner: `${time}`,
        }).node,
      ],
    }).node;
  };

  async getRowElements() {
    const page = this.that?.that?.pageNumber.current;
    const link = this.that?.state;

    const winners: Winner[] = await getWinners(page || null, {
      _sort: link?.name || '',
      _order: link?.wins || link?.time ? 'asc' : 'desc',
    });
    return winners.map(async ({ wins, time, id }, i) => {
      const order = (i + ((page || 1) - 1) * 10) + 1;
      const { node } = new BaseNode({
        tag: 'tr',
        className: 'table__row',
        childrens: [
          new BaseNode({
            tag: 'td',
            className: 'table__column',
            inner: `${order}`,
          }).node,
        ],
      });
      const cells = await this.getRowCell({ wins, time, id });
      node.append(cells);
      return node;
    });
  }

  async render(parent?: HTMLElement, that?: Table) {
    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;

    const { node } = new BaseNode({
      tag: 'tbody',
      className: 'table__body',
    });

    const rows = await Promise.all(await this.getRowElements());
    node.append(...rows);

    this.node?.remove();
    this.parent?.append(node);
    this.node = node;
    return node;
  }
}
