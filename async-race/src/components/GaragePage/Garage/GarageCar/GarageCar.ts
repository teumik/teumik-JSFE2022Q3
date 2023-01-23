import './garageCar.scss';
import { Car } from '../../../../lib/api';
import BaseNode from '../../../BaseNode/BaseNode';
import CarControl from './CarControl/CarControl';
import CarTrack from './CarTrack/CarTrack';
import Garage from '../Garage';

interface CarState {
  car: {
    id: number | null;
    name: string | null;
    color: string | null;
  };
}

export default class GarageCar {
  node: HTMLElement | null;
  Control: typeof CarControl;
  Track: typeof CarTrack;
  track: CarTrack | null;
  state: CarState;
  that: Garage | null;

  constructor() {
    this.Control = CarControl;
    this.Track = CarTrack;
    this.track = null;
    this.node = null;
    this.that = null;
    this.state = {
      car: {
        id: null,
        name: null,
        color: null,
      },
    };
  }

  render({ name, color, id }: Car, parent: HTMLElement, that: Garage) {
    this.that = that ?? this.that;
    this.state.car = { name, color, id };

    const { node } = new BaseNode({
      tag: 'article',
      className: ['garage__cars'],
    });

    new this.Control().render(name, node, this);
    this.track = new this.Track();
    this.track.render(color, node, this);

    parent.append(node);
    this.node = node;
    return this.node;
  }
}
