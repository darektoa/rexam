/* eslint-disable indent */
import headerStyle from '../../styles/components/header.lazy.css';
import navigationDrawerStyle from '../../styles/components/navigation-drawer.lazy.css';
import header from '../views/templates/header.js';
import DrawerInitiator from './drawer-initiator';
import { $ } from './querySelector-helper.js';

const AppShell = {
  props: { name: 'user' },

  init() {
    const headerElmnt = $('body > header');
    const bodyElmnt = $('body');

    if (!headerElmnt) {
      bodyElmnt.insertAdjacentHTML('afterbegin', header(this.props.name));
      this._drawerInit();
    }
  },


  remove() {
    headerStyle.unuse();
    navigationDrawerStyle.unuse();
    const headerElmnt = $('body > header');
    if (headerElmnt) headerElmnt.remove();
  },


  _drawerInit() {
    DrawerInitiator.init({
      button: $('body > header .profile-box > span'),
      drawer: $('body > header .profile-box > .navigation-drawer'),
      content: $('main'),
    });
  },
};

export default AppShell;