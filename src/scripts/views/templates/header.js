import navigationDrawer from './navigation-drawer.js';
import navigationDrawerData from '../../data/navigation-drawer-data.js';
import headerStyle from '../../../styles/components/header.lazy.css';

const header = (name) => {
  headerStyle.use();

  return (`
    <header>
        <div  class="container">
            <div class="brand-box">
                <img src="./icons/transparent-icon.svg" alt="">
                <h1>R-EXAM</h1>
            </div>
            <div class="profile-box">
                <img src="./images/avatar-1.png" alt="">
                <span>
                    <p>${name}</p>
                    <i class="icon_dropdown-7a7a7a icon-dropdown"></i>
                </span>
                ${navigationDrawer(navigationDrawerData)}
            </div>
        </div>
    </header>
  `);
};

export default header;

/*
  SAMPLE RESULT

  <header>
      <div  class="container">
          <div class="brand-box">
              <img src="./icons/transparent-icon.svg" alt="">
              <h1>R-EXAM</h1>
          </div>
          <div class="profile-box">
              <img src="./images/avatar-1.png" alt="">
              <span>
                  <p>Abdul Fattah</p>
                  <i class="icon_dropdown-7a7a7a icon-dropdown"></i>
              </span>
              <nav class="navigation-drawer">
                  <a href="#/dashboard">
                      <div class="icon-box">
                          <i class="icon_dashboard-fff"></i>
                      </div>
                      Dashboard
                  </a>
              </nav>
          </div>
      </div>
  </header>
*/