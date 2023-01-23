import './control.scss';
import BaseNode from '../BaseNode/BaseNode';
import Create from './Create/Create';
import Panel from './Panel/Panel';
import Update from './Update/Update';
import GaragePage from '../GaragePage/GaragePage';
import View from './View/View';

export default class Control {
  node: HTMLElement | null;
  create: Create;
  update: Update;
  view: View;
  panel: Panel;
  parent: HTMLElement | null;
  that: GaragePage | null;

  constructor() {
    this.node = null;
    this.create = new Create();
    this.update = new Update();
    this.view = new View();
    this.panel = new Panel();
    this.parent = null;
    this.that = null;
  }

  render(parent?: HTMLElement, that?: GaragePage) {
    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;

    const { node } = new BaseNode({
      tag: 'section',
      className: 'control',
    });

    this.create.render(node, this);
    this.update.render(node, this);
    this.view.render(node, this);
    this.panel.render(node, this);

    this.node?.remove();
    this.parent?.append(node);

    this.node = node;
    return this.node;
  }
}
