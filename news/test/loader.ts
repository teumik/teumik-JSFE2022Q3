interface IApiKey {
  apiKey: string;
}

interface IOptions {
  sources?: string;
}

interface INewsResponse {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

type Status = 'error' | 'ok';

interface IResponse {
  status: Status;
  sources: INewsResponse[];
}

type PromiseResponse = () => Promise<IResponse>;

type Endpoint = 'everything' | 'top-headlines' | 'sources';

interface IEndpoint {
  endpoint: Endpoint;
  options: IOptions;
}

interface IFetchResponse {
  ok: boolean;
  // status: 200 | 401 | 404 | 429 | 500; // TODO: Why it's don't work?
  status: number;
  statusText: string;
  json: PromiseResponse;
}

type Callback = (response?: IResponse) => void;

type Resp = (endpoint: IEndpoint, callback: Callback) => void;

type ErrorHandler = (response: IFetchResponse) => void;

type MakeUrl = (options: IOptions, endpoint: Endpoint) => string;

type Method = 'GET';

type Load = (method: Method, endpoint: Endpoint, callback: Callback, options: IOptions) => void;

type IUrlOptions = IApiKey | IOptions;

interface ILoader {
  baseLink: string;
  options: IApiKey;
  getResp: Resp;
  errorHandler: ErrorHandler;
  makeUrl: MakeUrl;
  load: Load;
}

class Loader implements ILoader {
  baseLink: string;
  options: IApiKey;

  constructor(baseLink: string, options: IApiKey) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: IEndpoint,
    callback = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: IFetchResponse): IFetchResponse {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) { console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`); }
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: IOptions, endpoint: Endpoint): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key as keyof IUrlOptions]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: Method, endpoint: Endpoint, callback: Callback, options: IOptions = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
