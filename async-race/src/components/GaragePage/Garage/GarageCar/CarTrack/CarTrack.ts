import './carTrack.scss';
import BaseNode from '../../../../BaseNode/BaseNode';
import CarIcons from './CarIcons/CarIcons';
import GarageCar from '../GarageCar';
import {
  getWinner, toggleEngine, updateWinner, createWinner, Winner, EngineQuery
} from '../../../../../lib/api';
import EngineButtons from './EngineButtons/EngineButtons';
import { Animation } from '../../../../../lib/animation';
import root from '../../../../..';
import { remove } from '../../../../../lib/utils';
import Panel from '../../../../Control/Panel/Panel';
import Nav from '../../../../Nav/Nav';
import GaragePageButtons from '../../../../GaragePageButtons/GaragePageButtons';

export interface Status {
  a: 'started';
  b: 'stopped';
}

export interface WinnersStats {
  id: number;
  time: number;
}

interface DisabledProp {
  navDisabled?: {
    winners: boolean;
  };
  disabled?: {
    reset: boolean;
    race: boolean;
  };
  pageDisabled?: {
    page: boolean;
  };
  garage?: {
    racers: number[];
    winner: number | null;
    winners: Map<number, Winner>;
    isRace: boolean;
  };
}

interface Links {
  link?: Panel; navLink?: Nav; pageLink?: GaragePageButtons;
}

interface LastFinish {
  success: boolean;
  carParams: {
    velocity: number;
    distance: number;
  };
  garage: {
    racers: number[];
    winner: number | null;
    winners: Map<number, Winner>;
    isRace: boolean;
  };
}

export default class CarTrack {
  node: HTMLElement | null;
  that: GarageCar | null;
  carIcons: CarIcons;
  engineButtons: EngineButtons | null;
  animation: Animation | null;
  svg: HTMLElement | null;
  state: {
    id: null | number;
    startDisabled: boolean;
    stopDisabled: boolean;
    engine: boolean;
    animeId: number[];
    pause: boolean;
  };

  constructor() {
    this.node = null;
    this.that = null;
    this.carIcons = new CarIcons();
    this.engineButtons = null;
    this.animation = null;
    this.svg = null;
    this.state = {
      startDisabled: false,
      stopDisabled: false,
      id: null,
      engine: false,
      animeId: [],
      pause: false,
    };
  }

  setWinnerStat = async ({ id, time }: WinnersStats) => {
    const winners = this.that?.that?.state.winners;
    if (!winners) return;
    if (winners?.has(id)) {
      const stats = winners.get(id);
      if (!stats) return;
      const wins = stats.wins + 1;
      const minTime = Math.min(stats.time, time);
      winners?.set(id, { id, wins, time: minTime });
    } else {
      winners?.set(id, { id, wins: 1, time: Math.round(time * 100) / 100 });
    }

    const hasWinner = (await getWinner(id)).id !== null;
    const winner = winners.get(id);
    if (!winner) return;
    if (hasWinner) {
      await updateWinner(winner);
    } else {
      await createWinner(winner);
    }
  };

  showWinner = (t: number) => {
    const car = this.that?.state.car;
    const { node: winner } = new BaseNode({
      className: ['winner'],
      inner: `Winner is car #${car?.id} ${car?.name} (${t}s)`,
    });
    const { node: layer } = new BaseNode({
      className: ['overlay'],
      click: () => {
        layer.remove();
      },
    });
    layer.append(winner);
    root.append(layer);
  };

  updateRender = ({ link, navLink, pageLink }: Links) => {
    link?.render();
    navLink?.render();
    pageLink?.render();
  };

  removeDisabled = ({
    navDisabled, disabled, pageDisabled, garage,
  }: DisabledProp) => {
    if (navDisabled && disabled && pageDisabled && garage?.racers.length === 0) {
      Object.assign(disabled, { reset: false });
      Object.assign(pageDisabled, { page: false });
      Object.assign(garage, { ...garage, isRace: false, winner: null });
    }
  };

  stopClick = async ({ id, status }: EngineQuery) => {
    if (!this.animation) return;
    await toggleEngine({ id, status });
    this.animation.stop();
    this.animation.reset();
    this.state.engine = false;
    this.state.pause = true;
  };

  startClick = ({
    navDisabled, disabled, pageDisabled, garage, link, navLink, pageLink,
  }: DisabledProp & Links) => {
    if (navDisabled && disabled && pageDisabled && !disabled.reset) {
      Object.assign(disabled, { reset: true });
      Object.assign(navDisabled, { winners: true });
      Object.assign(pageDisabled, { page: true });
      this.updateRender({ link, navLink, pageLink });
    }
    this.state.engine = true;
    this.state.pause = false;
    this.state.stopDisabled = true;
    if (this.state.id) garage?.racers?.push(this.state.id);
  };

  afterLastFinish = ({ garage, success, carParams }: LastFinish) => {
    const { id } = this.state;
    if (!id) return;
    if (success && !this.state.pause && garage?.isRace) {
      if (garage && garage.winner === null) {
        Object.assign(garage, { ...garage, winner: id });
        const { velocity: v, distance: s } = carParams;
        const t = Math.round(((s / v) / 1000) * 100) / 100;
        this.showWinner(t);
        this.setWinnerStat({ id, time: t });
      }
    }
  };

  startDisable = (bool: boolean) => {
    this.state.startDisabled = bool;
    this.engineButtons?.render();
  };

  stopDisable = (bool: boolean) => {
    this.state.stopDisabled = bool;
    this.engineButtons?.render();
  };

  toggleEngineState = () => {
    this.state.engine = !this.state.engine;
    this.engineButtons?.render();
  };

  click = async (sign: 'a' | 'b') => {
    this.toggleEngineState();
    const link = this.that?.that?.that?.control?.panel;
    const disabled = link?.disabled;
    const navLink = this.that?.that?.that?.that?.nav;
    const navDisabled = navLink?.that?.disabled;
    const pageLink = this.that?.that?.that?.pageButtons;
    const pageDisabled = pageLink?.disabled;
    const garage = this.that?.that?.state;

    const id = this.state.id ?? this.that?.state.car.id;
    if (!id) return;
    this.state.id = id;

    const statusMap: Status = { a: 'started', b: 'stopped' };
    const status = statusMap[sign];

    if (!this.animation) return;
    if (status === 'started') {
      this.startClick({
        navDisabled, disabled, pageDisabled, garage, link, navLink, pageLink,
      });
    }
    if (status === 'stopped') {
      await this.stopClick({ id, status });
      return;
    }

    this.animation.stop();
    this.animation.reset();

    this.startDisable(true);
    const carParams = await toggleEngine({ id, status });
    this.stopDisable(false);

    if (this.state.pause) return;
    this.animation.init(carParams);
    this.animation.start();

    const { success, code } = await toggleEngine({ id, status: 'drive' });
    if (garage) this.afterLastFinish({ garage, success, carParams });
    this.startDisable(false);

    if (garage?.racers) remove(garage.racers, id);
    this.removeDisabled({
      navDisabled, disabled, pageDisabled, garage,
    });
    this.updateRender({ link, navLink, pageLink });

    if (success || code === 500) this.animation.stop();
  };

  render(color: string, parent: HTMLElement, that: GarageCar) {
    this.that = that ?? this.that;
    const { node: wrapper } = new BaseNode({});
    const images = this.carIcons.render(color);
    const { node } = new BaseNode({
      className: 'car__track',
      childrens: [
        wrapper,
        images,
      ],
    });

    this.svg = images.querySelector('.car__car-icon') as HTMLElement;
    this.animation = new Animation({ ctx: this, svg: this.svg });

    this.engineButtons = new EngineButtons(this.click);
    this.engineButtons.render(wrapper, this);

    parent.append(node);
    this.node = node;
    return this.node;
  }
}
