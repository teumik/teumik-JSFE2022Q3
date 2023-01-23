import './panel.scss';
import BaseNode from '../../BaseNode/BaseNode';
import Control from '../Control';
import { GaragePageState } from '../../GaragePage/GaragePage';
import carsList from '../../../lib/cars.json';
import {
  createAllCars,
  getRandomInt
} from '../../../lib/api';
import { getRandomColor } from '../../../lib/utils';

export default class Panel {
  node: HTMLElement | null;
  parent: HTMLElement | null;
  that: Control | null;
  state: GaragePageState;
  disabled: {
    reset: boolean;
    race: boolean;
  };

  constructor() {
    this.node = null;
    this.parent = null;
    this.that = null;
    this.state = {
      id: null,
      updator: {
        name: null,
        color: null,
      },
      creator: {
        name: null,
        color: null,
      },
    };
    this.disabled = {
      reset: false,
      race: false,
    };
  }

  reset = async () => {
    const link = this.that?.that?.control;
    const state = link?.that?.state;
    const clone = structuredClone(this.state);
    if (state) Object.assign(state, clone);
    link?.create.render();
    link?.update.render();
    link?.view.render();
    // link?.panel.render();
    this.render();
    await link?.that?.garage.render();
    // link?.that?.pageButtons.render();
    this.disabled.race = false;
    const disabled = this.that?.that?.that?.disabled;
    if (disabled) Object.assign(disabled, { winners: false });
    // link?.render();
    this.that?.that?.pageButtons.render();
    this.that?.that?.that?.nav.render();
  };

  getRandomCar = () => {
    const { length: carsLength } = carsList;
    const carItem = carsList[getRandomInt(carsLength)];
    const { brand } = carItem;
    const { models } = carItem;
    const { length: modelsLength } = models;
    const model = models[getRandomInt(modelsLength)];
    const name = `${brand} ${model}`;
    const color = `#${getRandomColor()}`;
    return { name, color };
  };

  generate = async () => {
    const cars = Array(100).fill(null).map(this.getRandomCar);
    const createOperation = await createAllCars(cars);
    await Promise.all(createOperation);
    const link = this.that?.that;
    await link?.headers.render();
    await link?.garage.render();
    link?.pageButtons.render();
  };

  startRace = async () => {
    const cars = this.that?.that?.garage.garage;
    const garage = this.that?.that?.garage.state;
    if (garage) Object.assign(garage, { ...garage, isRace: true });
    cars?.map((car) => car.item.track?.click('a'));
    this.disabled.race = true;
  };

  createLayout = () => {
    const winners = this.that?.that?.that?.disabled.winners;
    const { node } = new BaseNode({
      tag: 'div',
      className: ['control__panel', 'control__item'],
      childrens: [
        new BaseNode({
          tag: 'button',
          className: 'cotrol__race',
          inner: 'Race',
          attributes: {
            disabled: this.disabled.race || this.disabled.reset || false,
          },
          click: this.startRace,
        }).node,
        new BaseNode({
          tag: 'button',
          className: 'cotrol__reset',
          inner: 'Reset',
          attributes: {
            disabled: this.disabled.reset || false,
          },
          click: this.reset,
        }).node,
        new BaseNode({
          tag: 'button',
          className: 'cotrol__generate',
          inner: 'Generate',
          attributes: {
            disabled: winners || this.disabled.reset || false,
          },
          click: this.generate,
        }).node,
      ],
    });
    return node;
  };

  render(parent?: HTMLElement, that?: Control) {
    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;

    const node = this.createLayout();

    this.node?.remove();
    this.parent?.append(node);
    this.node = node;
    return this.node;
  }
}
