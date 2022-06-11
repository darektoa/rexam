import PageRoutes from '../routes/page-routes.js';

const Account = {
  data: null,
  status: false,

  check(redirectTo = '/login') {
    if (!this.status) PageRoutes.redirect(redirectTo);
    return this.status;
  },
};

export default Account;