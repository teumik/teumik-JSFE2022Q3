import CarTrack from '../components/GaragePage/Garage/GarageCar/CarTrack/CarTrack';

export interface AnimationDuration {
  velocity: number;
  distance: number;
}

export interface AnimationState {
  ctx: CarTrack;
  svg: HTMLElement;
}

export class Animation {
  settings: {
    distance: number;
    duration: number;
  };

  state: CarTrack;
  car: HTMLElement;
  startTime: number | null;

  constructor({ ctx, svg }: AnimationState) {
    this.settings = {
      distance: 0,
      duration: 0,
    };
    this.state = ctx;
    this.car = svg;
    this.startTime = null;
  }

  init = ({ velocity: v, distance: s }: AnimationDuration) => {
    this.settings.duration = s / v;
    if (this.car.parentElement) {
      this.settings.distance = Number(this.car.parentElement?.offsetWidth) - this.car.offsetWidth;
    }
  };

  reset = () => {
    this.car.style.transform = 'translate(0px, -50%)';
    this.startTime = null;
  };

  stop = () => {
    if (this.state.state.animeId) {
      this.state.state.animeId.map((id: number) => cancelAnimationFrame(id));
      this.state.state.animeId = [];
    }
  };

  animate = (timeStamp: DOMHighResTimeStamp) => {
    if (!this.startTime) this.startTime = timeStamp;
    const runtime = timeStamp - this.startTime;
    const relativeProgress = runtime / this.settings.duration;
    const left = this.settings.distance * Math.min(relativeProgress, 1);
    this.car.style.transform = `translate(${left}px, -50%)`;
    if (runtime < this.settings.duration) {
      this.state.state.animeId.push(requestAnimationFrame(this.animate));
    }
  };

  start = () => {
    this.state.state.animeId.push(requestAnimationFrame(this.animate));
  };
}
