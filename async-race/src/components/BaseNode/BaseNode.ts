export interface NodePropsInterface {
  id?: string;
  tag?: string;
  className?: string | string[];
  attributes?: {
    [prop: string]: string | boolean;
  };
  inner?: string;
  childrens?: (Node | string)[];
  click?: (event: MouseEvent) => void;
  submit?: (event: SubmitEvent) => void;
  oninput?: (event: Event) => void;
}

export default class BaseNode {
  node: HTMLElement;
  constructor({
    tag, id, className, attributes, inner, childrens, click, submit, oninput,
  }: NodePropsInterface) {
    this.node = this.render({
      tag, id, className, attributes, inner, childrens,
    });
    if (click) this.node.onclick = click;
    if (submit) this.node.onsubmit = submit;
    if (oninput) this.node.oninput = oninput;
  }

  private render({
    tag, id, className, attributes, inner, childrens,
  }: NodePropsInterface) {
    const node = document.createElement(tag || 'div');
    if (id) node.id = id;
    if (className) {
      if (Array.isArray(className)) {
        node.classList.add(...className.filter((name) => name !== ''));
      } else {
        node.classList.add(className);
      }
    }
    if (attributes) {
      Object.entries(attributes).forEach(([name, value]) => {
        if (typeof value === 'boolean') {
          if (value) node.setAttribute(name, '');
        } else {
          node.setAttribute(name, value);
        }
      });
    }
    if (inner) node.innerHTML = inner;
    if (Array.isArray(childrens)) {
      node.append(...childrens);
    } else {
      node.append(childrens || '');
    }
    return node;
  }
}
