import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi-redirect-production.up.railway.app/', {
      apiKey: '7f852e0142b94273a95d24da4bd5ccba',
    });
  }
}

export default AppLoader;
