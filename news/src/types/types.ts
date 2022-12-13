export interface Options {
  sources: string;
  apiKey: string;
  language: string;
}

export interface NewsSourceResponse {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface Response {
  status: 'error' | 'ok';
  sources: NewsSourceResponse[];
}

export type EndpointsHeader = 'everything' | 'top-headlines' | 'sources';

export interface Endpoints {
  endpoint: EndpointsHeader;
  options: Partial<Options>;
}

export interface GetResponse {
  ok: boolean;
  status: number;
  statusText: string;
  json: () => Promise<Response>;
}

export type Callback<T> = (response?: T) => void;

export type Method = 'GET';

export interface NewsPost {
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

export interface NewsResponse extends Pick<Response, 'status'> {
  totalResults: number;
  articles: NewsPost[];
}
