import {
  Endpoints,
  GetResponse,
  Options,
  EndpointsHeader,
  Method,
  Callback,
  NewsResponse,
  Response,
  StatusCodes
} from '../../index';

class Loader {
  private baseLink: string;
  private readonly options: Pick<Options, 'apiKey'>;

  constructor(baseLink: string, options: Pick<Options, 'apiKey'>) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp(
    { endpoint, options = {} }: Partial<Endpoints>,
    callback = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', endpoint as EndpointsHeader, callback, options);
  }

  private errorHandler(res: GetResponse): GetResponse {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) { console.log(`Sorry, but there is ${res.status}: ${StatusCodes[res.status]} error: ${res.statusText}`); }
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: Options, endpoint: EndpointsHeader): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key as keyof Options]}&`;
    });

    return url.slice(0, -1);
  }

  private load(
    method: Method,
    endpoint: EndpointsHeader,
    callback: Callback<Response | NewsResponse>,
    options = {}
  ) {
    fetch(this.makeUrl(options as Options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => {
        callback(data);
      })
      .catch((err) => console.error(err));
  }
}

export default Loader;
