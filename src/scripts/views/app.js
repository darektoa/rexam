import Account from '../globals/account.js';
import PageRoutes from '../routes/page-routes.js';
import RouteStyles from '../routes/style-routes.js';
import UrlParser from '../routes/url-parser.js';
import AppShell from '../utils/appshell-initiator.js';
import rexamLoader from './templates/rexam-loader.js';

class App {
  constructor({ content }) {
    this._content = content;
  }

  renderPage() {
    const activeUrl = UrlParser.activeUrl();
    const content = this._content;
    let page = PageRoutes[activeUrl];
    let style = RouteStyles[activeUrl];

    if (page === undefined) {
      page = PageRoutes['/404'];
      style = RouteStyles['/404'];
    } else if (activeUrl !== '/register') {
      // Account.check();
    }

    content.innerHTML += rexamLoader();

    AppShell.remove();
    content.innerHTML = page.render();
    RouteStyles.unuseAll();
    style.use();
    page.afterRender();
  }
}

export default App;