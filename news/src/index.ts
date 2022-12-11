import './global.css';
import './components/view/footer/footer.css';
import App from './components/app/app';

const app = new App();
app.start();

export interface IApiKey {
  apiKey: string;
}

export interface IOptions {
  sources?: string;
}

export interface INewsResponse {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export type Status = 'error' | 'ok';

export interface IResponse {
  status: Status;
  sources: INewsResponse[];
}

export type PromiseResponse = () => Promise<IResponse>;

export type Endpoint = 'everything' | 'top-headlines' | 'sources';

export interface IEndpoint {
  endpoint: Endpoint;
  options?: IOptions;
}

export interface IFetchResponse {
  ok: boolean;
  status: number;
  statusText: string;
  json: PromiseResponse;
}

export type Callback = (response?: IResponse) => void;

export type Resp = (endpoint: IEndpoint, callback: Callback) => void;

export type ErrorHandler = (response: IFetchResponse) => void;

export type MakeUrl = (options: IOptions, endpoint: Endpoint) => string;

export type Method = 'GET';

export type Load = (
  method: Method,
  endpoint: Endpoint,
  callback: Callback,
  options: IOptions) => void;

export type IUrlOptions = IApiKey | IOptions;

export interface ILoader {
  baseLink: string;
  options: IApiKey;
  getResp: Resp;
  errorHandler: ErrorHandler;
  makeUrl: MakeUrl;
  load: Load;
}

export type GetNews = (event: MouseEvent, callback: Callback) => void;

export interface IAppController extends ILoader {
  getNews: GetNews;
  getSources: (data: Callback) => void;
}

export type DrawSources = (data: INewsResponse[]) => void;

export interface ISources {
  draw: DrawSources;
}

export interface INewsItem {
  author: string | null;
  content: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
  description: string;
}

export type DrawNews = (data: INewsItem[]) => void;

export interface INews {
  draw: DrawNews;
}

export type NewsItems = {
  status: Status;
  totalResults: number;
  articles: INewsItem[];
} & IResponse;

export interface IAppView {
  news: INews;
  sources: ISources;
  drawNews: (data: NewsItems) => void;
  drawSources: (data: IResponse) => void;
}

export interface IApp {
  controller: IAppController;
  view: IAppView;
  start: () => void;
}
