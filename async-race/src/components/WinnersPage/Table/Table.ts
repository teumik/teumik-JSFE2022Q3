import './table.scss';
import BaseNode from '../../BaseNode/BaseNode';
import TableRow from './TableRow/TableRow';
import WinnersPage from '../WinnersPage';
import TableHeadCell from './TableHeadCell/TableHeadCell';

export default class Table {
  node: HTMLElement | null;
  headColumnNames: string[];
  rows: TableRow;
  that: WinnersPage | null;
  parent: HTMLElement | null;
  body: HTMLElement | null;
  heads: TableHeadCell[] | null;
  state: {
    name: string | null;
    sort: boolean | null;
    wins: boolean | null;
    time: boolean | null;
  };

  constructor() {
    this.headColumnNames = ['Number', 'Car', 'Name', 'Wins', 'Time'];
    this.rows = new TableRow();
    this.node = null;
    this.that = null;
    this.parent = null;
    this.body = null;
    this.heads = null;
    this.state = {
      name: null,
      sort: false,
      wins: null,
      time: null,
    };
  }

  render(parent?: HTMLElement, that?: WinnersPage) {
    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;

    const { node: head } = new BaseNode({
      tag: 'thead',
      className: 'table__head',
    });

    this.heads = this.headColumnNames.map((name, i) => {
      const instance = new TableHeadCell(i, name);
      instance.render(head, this);
      return instance;
    });

    const { node } = new BaseNode({
      tag: 'table',
      className: 'table',
    });

    node.append(head);
    this.rows.render(node, this);

    parent?.append(node);
    this.node = node;
    return node;
  }
}
