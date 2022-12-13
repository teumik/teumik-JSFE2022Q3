import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi-redirect-production.up.railway.app/', {
      apiKey: 'cac0c587301e4203ab77822adec8a54f',
    });
  }
}

export default AppLoader;
