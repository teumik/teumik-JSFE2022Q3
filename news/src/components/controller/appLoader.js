import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '7f852e0142b94273a95d24da4bd5ccba',
    });
  }
}

export default AppLoader;
