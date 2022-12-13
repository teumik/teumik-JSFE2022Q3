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
    callback: Callback<Response | NewsResponse>
  ) {
    if (callback === undefined) {
      throw new Error('No callback for GET response');
    }
    this.load('GET', endpoint as EndpointsHeader, callback, options);
  }

  private errorHandler(res: GetResponse): GetResponse {
    if (!res.ok) {
      const error = new Error();
      error.message = `\nResponse code: ${res.status}\n${res.statusText}`;
      if (res.status === 401 || res.status === 404) {
        error.name = `${StatusCodes[res.status] || 'Unnamed'}`;
      }
      throw error;
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
      .catch((err) => { throw new Error(err); });
  }
}

export default Loader;
