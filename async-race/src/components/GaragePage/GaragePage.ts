import './garagePage.scss';
import BaseNode from '../BaseNode/BaseNode';
import Control from '../Control/Control';
import GaragePageButtons from '../GaragePageButtons/GaragePageButtons';
import Garage from './Garage/Garage';
import GarageHeaders from './GarageHeaders/GarageHeaders';
import App from '../../App';

export interface GaragePageState {
  id: number | null;
  updator?: {
    name: string | null;
    color: string | null;
  };
  creator?: {
    name: string | null;
    color: string | null;
  };
}

export default class GaragePage {
  node: HTMLElement | null;
  parent: HTMLElement | null | undefined;
  garage: Garage;
  pageButtons: GaragePageButtons;
  headers: GarageHeaders;
  control: Control;
  that: App | null;
  state: GaragePageState;
  pageNumber: {
    current: number;
    max: number | null;
  };

  constructor() {
    this.node = null;
    this.that = null;
    this.parent = null;
    this.control = new Control();
    this.headers = new GarageHeaders();
    this.garage = new Garage();
    this.pageButtons = new GaragePageButtons();
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
    this.pageNumber = {
      current: 1,
      max: null,
    };
  }

  async render(parent?: HTMLElement, that?: App) {
    this.parent = parent ?? this.parent;
    this.that = that ?? this.that;
    const { node } = new BaseNode({
      tag: 'main',
      className: 'main',
    });

    this.control.render(node, this);
    await this.headers.render(node, this);
    await this.garage.render(node, this);
    this.pageButtons.render(node, this);

    this.parent?.append(node);
    this.node = node;
    return this.node;
  }
}
