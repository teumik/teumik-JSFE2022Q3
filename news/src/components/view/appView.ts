import News from './news/news';
import Sources from './sources/sources';
import {
  Response,
  NewsResponse
} from '../../index';

export class AppView {
  private readonly news: News;
  private readonly sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: NewsResponse) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: Response) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
