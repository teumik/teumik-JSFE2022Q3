import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi-redirect-production.up.railway.app/', {
      apiKey: '4d24489aee304bd3bfdf1c9694230e27',
    });
  }
}

export default AppLoader;
