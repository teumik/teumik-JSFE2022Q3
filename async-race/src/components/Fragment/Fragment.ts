import { NodePropsInterface } from '../BaseNode/BaseNode';

export default class Fragment {
  node: DocumentFragment;
  constructor({ childrens }: Pick<NodePropsInterface, 'childrens'>) {
    this.node = this.render({ childrens });
  }

  private render({ childrens }: Pick<NodePropsInterface, 'childrens'>) {
    const node = document.createDocumentFragment();
    if (Array.isArray(childrens)) {
      node.append(...childrens);
    } else {
      node.append(childrens || '');
    }
    return node;
  }
}
