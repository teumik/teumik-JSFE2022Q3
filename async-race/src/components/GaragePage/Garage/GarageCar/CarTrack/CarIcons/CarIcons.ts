import './carIcons.scss';
import BaseNode from '../../../../../BaseNode/BaseNode';
import Fragment from '../../../../../Fragment/Fragment';
import carIcon from '../../../../../../assets/svgs/car.svg';
import flagIcon from '../../../../../../assets/svgs/flag.svg';

export default class CarIcons {
  node: HTMLElement | null;
  color: string | null;
  car: HTMLElement | null;

  constructor() {
    this.node = null;
    this.color = null;
    this.car = null;
  }

  upadteIcon(left: number) {
    const { node } = new BaseNode({
      tag: 'span',
      className: ['car__car-icon'],
      attributes: {
        style: `fill: ${this.color}; transform: translate(${left}px, -50%)`,
      },
      inner: carIcon,
    });
    this.car?.remove();
    this.node?.prepend(node);
    this.car = node;
  }

  render(color: string, parent?: HTMLElement) {
    this.color = color;
    const { node: car } = new BaseNode({
      tag: 'span',
      className: ['car__car-icon'],
      attributes: {
        style: `fill: ${color}`,
      },
      inner: carIcon,
    });
    this.car = car;

    const { node: flag } = new BaseNode({
      tag: 'span',
      className: ['car__flag-icon'],
      attributes: {
        style: `fill: ${color}`,
      },
      inner: flagIcon,
    });

    const { node } = new BaseNode({
      className: ['car__images'],
      childrens: [
        car,
        flag,
      ],
    });

    parent?.append(node);
    this.node = node;
    return this.node;
  }
}
