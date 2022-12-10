import './global.css';
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

type Status = 'error' | 'ok';

export interface IResponse {
  status: Status;
  sources: INewsResponse[];
}

export type PromiseResponse = () => Promise<IResponse>;

export type Endpoint = 'everything' | 'top-headlines' | 'sources';

export interface IEndpoint {
  endpoint: Endpoint;
  options: IOptions;
}

export interface IFetchResponse {
  ok: boolean;
  // status: 200 | 401 | 404 | 429 | 500; // TODO: Why it's don't work?
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
