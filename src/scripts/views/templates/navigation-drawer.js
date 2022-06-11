import navigationDrawerStyle from '../../../styles/components/navigation-drawer.lazy.css';

const navigation = (item) => (`
    <a href="${item.href}">
        <div class="icon-box">
            <i class="${item.classIcon}"></i>
        </div>
        ${item.name}
    </a>
`);

// NAVIGATION DRAWER
const navigationDrawer = (data) => {
  navigationDrawerStyle.use();

  let navigations = '';
  data.forEach((item) => {
    navigations += navigation(item);
  });

  return (`
    <nav class="navigation-drawer">
      ${navigations.trim()}
    </nav>
  `);
};

export default navigationDrawer;

/*
  SAMPLE RESULT

  <nav class="navigation-drawer">
      <a href="#/dashboard">
          <div class="icon-box">
              <i class="icon_dashboard-fff"></i>
          </div>
          Dashboard
      </a>
  </nav>
*/