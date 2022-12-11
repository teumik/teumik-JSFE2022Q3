import {
  IApiKey,
  IEndpoint,
  IFetchResponse,
  IOptions,
  Endpoint,
  IUrlOptions,
  Method,
  Callback
} from '../../index';

class Loader {
  private baseLink: string;
  private options: IApiKey;

  constructor(baseLink: string, options: IApiKey) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp(
    { endpoint, options = {} }: IEndpoint,
    callback = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', endpoint, callback, options);
  }

  private errorHandler(res: IFetchResponse): IFetchResponse {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) { console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`); }
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: IOptions, endpoint: Endpoint): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key as keyof IUrlOptions]}&`;
    });

    return url.slice(0, -1);
  }

  private load(method: Method, endpoint: Endpoint, callback: Callback, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
