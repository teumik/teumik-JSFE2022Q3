import BaseNode from '../../../BaseNode/BaseNode';
import Table from '../Table';

export default class TableHeadCell {
  node: HTMLElement | null;
  parent: HTMLElement | null;
  that: Table | null;
  name: string;
  state: {
    id: number;
    name: string;
    sortClass: string | null;
  };

  constructor(id: number, name: string) {
    this.name = name;
    this.node = null;
    this.that = null;
    this.parent = null;
    this.state = {
      id,
      name: name.toLocaleLowerCase(),
      sortClass: null,
    };
  }

  click = () => {
    const link = this.that?.state;
    if (!link) return;
    const { id, name } = this.state;
    if (id < 3) return;
    link.sort = true;
    const base = {
      wins: null,
      time: null,
    };
    Object.assign(link, {
      ...link, ...base, name, [name]: !link[name as 'wins' | 'time'],
    });
    this.that?.heads?.map((el) => el.render());
    this.that?.rows.render();
  };

  render(parent?: HTMLElement, that?: Table) {
    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;

    const state = this.that?.state;
    const canSort = this.that?.state.sort;

    const { id, name } = this.state;
    if (canSort && state && id >= 3) {
      this.state.sortClass = 'table__headers';
      if (state[name as 'wins' | 'time'] !== null) {
        this.state.sortClass = state[name as 'wins' | 'time'] ? `${this.state.sortClass}_asc` : `${this.state.sortClass}_desc`;
      }
    }

    const { node } = new BaseNode({
      tag: 'th',
      className: ['table__headers', this.state.sortClass || ''],
      inner: this.name,
      attributes: {
        id: this.name.toLocaleLowerCase(),
      },
      click: this.click,
    });

    this.node?.remove();
    this.parent?.append(node);

    this.node = node;
    return node;
  }
}
