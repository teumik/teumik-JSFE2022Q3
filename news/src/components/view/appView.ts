import News from './news/news';
import Sources from './sources/sources';
import {
  INews,
  ISources,
  IResponse,
  NewsItems,
  IAppView
} from '../../index';

export class AppView implements IAppView {
  news: INews;
  sources: ISources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: NewsItems) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: IResponse) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
