import './winnersPage.scss';
import BaseNode from '../BaseNode/BaseNode';
import WinnersHeaders from './WinnersHeaders/WinnersHeaders';
import WinnersPageButtons from '../WinnersPageButtons/WinnersPageButtons';
import Table from './Table/Table';
import App from '../../App';

export default class WinnersPage {
  node: HTMLElement | null;
  parent: HTMLElement | null;
  pageButtons: WinnersPageButtons;
  headers: WinnersHeaders;
  table: Table;
  that: App | null;
  pageNumber: {
    current: number;
    max: number | null;
  };

  constructor() {
    this.node = null;
    this.parent = null;
    this.pageButtons = new WinnersPageButtons();
    this.headers = new WinnersHeaders();
    this.table = new Table();
    this.that = null;
    this.pageNumber = {
      current: 1,
      max: null,
    };
  }

  async render(parent?: HTMLElement, that?: App) {
    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;
    const { node: wrapper } = new BaseNode({});
    const { node } = new BaseNode({
      tag: 'main',
      className: 'main',
      childrens: [
        wrapper,
      ],
    });

    await this.headers.render(wrapper, this);
    this.table.render(node, this);
    this.pageButtons.render(node, this);

    this.parent?.append(node);
    this.node = node;
    return this.node;
  }
}
