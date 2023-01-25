import './App.scss';
import BaseNode from './components/BaseNode/BaseNode';
import Nav from './components/Nav/Nav';
import GaragePage from './components/GaragePage/GaragePage';
import WinnersPage from './components/WinnersPage/WinnersPage';
import { checkServer } from './lib/api';

export type Pages = 'winners' | 'garage';

export interface State {
  location: Pages;
  currentPage: WinnersPage | GaragePage;
}

export default class App {
  node: HTMLElement | null;
  nav: Nav;
  winnersPage: WinnersPage;
  garagePage: GaragePage;
  state: State;
  parent: HTMLElement | null;
  disabled: {
    winners: boolean;
  };

  constructor() {
    const click = this.click.bind(this);
    this.nav = new Nav(click);
    this.winnersPage = new WinnersPage();
    this.garagePage = new GaragePage();
    this.node = null;
    this.state = {
      location: 'garage',
      currentPage: this.garagePage,
    };
    this.parent = null;
    this.disabled = {
      winners: false,
    };
  }

  click(page: Pages) {
    const paths = { winners: this.winnersPage, garage: this.garagePage };
    this.state.currentPage = paths[page];
    this.state.location = page;
    this.render(this.parent);
  }

  async render(parent: HTMLElement | null) {
    const isWork = await checkServer();
    if (!isWork) return new BaseNode({}).node;

    this.parent = parent ?? this.parent;
    const { node: wrapper } = new BaseNode({});
    const { node } = new BaseNode({
      id: 'App',
      childrens: [
        wrapper,
      ],
    });

    this.nav.render(wrapper, this);
    this.state.currentPage.render(node, this);
    this.node = node;
    this.parent?.replaceChildren(node);
    return node;
  }
}
