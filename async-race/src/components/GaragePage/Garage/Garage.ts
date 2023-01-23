import './garage.scss';
import {
  Car, Winner, getCarsCount, getGarage, getWinners
} from '../../../lib/api';
import BaseNode from '../../BaseNode/BaseNode';
import GarageCar from './GarageCar/GarageCar';
import GaragePage from '../GaragePage';

export default class Garage {
  node: HTMLElement | null;
  that: GaragePage | null;
  parent: HTMLElement | DocumentFragment | undefined | null;
  GarageCar: typeof GarageCar;
  garage: {
    car: Car;
    item: GarageCar;
  }[] | null;

  state: {
    racers: number[];
    winner: number | null;
    winners: Map<number, Winner>;
    isRace: boolean;
  };

  constructor() {
    this.node = null;
    this.that = null;
    this.parent = null;
    this.GarageCar = GarageCar;
    this.garage = null;
    this.state = {
      racers: [],
      winner: null,
      winners: new Map(),
      isRace: false,
    };
  }

  initWinners = async () => {
    const winners = await getWinners(null, {});
    winners.map((winner) => this.state.winners.set(winner.id, winner));
  };

  async getGarageList() {
    const page = this.that?.pageNumber.current;
    const garage = await getGarage(page);
    return garage;
  }

  async render(parent?: HTMLElement | DocumentFragment, that?: GaragePage) {
    await this.initWinners();
    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;
    const garageList = await this.getGarageList();
    const length = await getCarsCount();

    const { node } = new BaseNode({
      tag: 'section',
      className: 'garage',
      childrens: [
        !length ? new BaseNode({
          inner: 'Garage empty',
        }).node : '',
      ],
    });

    this.garage = garageList.map((car: Car) => ({
      car,
      item: new this.GarageCar(),
    }));
    this.garage.map(({ item, car }) => item.render(car, node, this));

    this.node?.remove();
    this.parent?.append(node);

    this.node = node;
    return this.node;
  }
}
