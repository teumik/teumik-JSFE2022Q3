class Loader {
  constructor(baseLink, options) {
    // console.log(baseLink, options, 'CONSTRUCTOR');
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} },
    callback = () => {
      console.error('No callback for GET response');
    }
  ) {
    // console.log(endpoint, options, callback, 'GET_RESP');
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res) {
    console.log(res, 'ERROR_HANDLER');
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) { console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`); }
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options, endpoint) {
    // console.log(options, endpoint, 'MAKE_URL');
    const urlOptions = { ...this.options, ...options };
    // console.log(urlOptions, 'MAKE_URL');
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      // console.log(key, 'MAKE_URL');
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method, endpoint, callback, options = {}) {
    // console.log(method, endpoint, callback, options, 'LOAD');
    // console.log(callback, 'LOAD');
    fetch(this.makeUrl(options, endpoint), { method })
      .then((r) => {
        console.log(r, 'LOAD');
        return this.errorHandler(r);
      })
      .then((res) => {
        const a = res.json();
        console.log(a, 'LOAD');
        return a;
      })
      .then((data) => {
        console.log(data, 'LOAD');
        callback(data);
      })
      .catch((err) => console.error(err));
  }
}

export default Loader;
