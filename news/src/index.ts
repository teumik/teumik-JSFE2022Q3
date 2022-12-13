import './global.css';
import './components/view/footer/footer.css';
import App from './components/app/app';

export {
  Options,
  NewsSourceResponse,
  Response,
  EndpointsHeader,
  Endpoints,
  GetResponse,
  Callback,
  Method,
  NewsPost,
  NewsResponse
} from './types/types';
export {
  LanguagesDictionary,
  StatusCodes
} from './types/enums';

const app = new App();
app.start();
