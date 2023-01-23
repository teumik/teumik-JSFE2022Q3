import './view.scss';
import BaseNode from '../../BaseNode/BaseNode';
import Control from '../Control';
import carIcon from '../../../assets/svgs/car.svg';

export default class View {
  node: HTMLElement | null;
  parent: HTMLElement | null;
  that: Control | null;

  constructor() {
    this.node = null;
    this.parent = null;
    this.that = null;
  }

  render(parent?: HTMLElement, that?: Control) {
    const link = this.that?.that?.state;
    const carName = link?.updator?.name ?? link?.creator?.name ?? '';
    const color = link?.updator?.color ?? link?.creator?.color ?? '#000000';

    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;
    const { node: car } = new BaseNode({
      className: ['control__icon'],
      attributes: {
        style: `fill: ${color}`,
      },
      inner: carIcon,
    });
    const { node: name } = new BaseNode({
      className: ['control__name'],
      inner: carName,
    });
    const { node } = new BaseNode({
      className: 'control__view',
      childrens: [
        car,
        name,
      ],
    });

    this.node?.remove();
    this.parent?.append(node);
    this.node = node;
    return this.node;
  }
}
