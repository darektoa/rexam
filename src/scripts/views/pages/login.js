import { $, $$ } from '../../utils/querySelector-helper.js';
import Input from '../../utils/input-helper.js';
import CONFIG from '../../globals/config.js';
import Account from '../../globals/account.js';
import PageRoutes from '../../routes/page-routes.js';
import Dashboard from './dashboard.js';

const Login = {
  _elmnt: null,
  _validation: {},

  render() {
    return (`
      <section id="login-form">
          <header>
              <img src="./icons/transparent-white-icon.svg" alt="Icon Rexam"  width="100" height="100">
              <p>Online Exam by Rexensoft</p>
          </header>

          <ul class="input-box">
              <li>
                  <div class="input">
                      <label for="email-input">Email</label>
                      <input id="email-input" type="email" spellcheck="false">
                  </div>
                  <p class="error-message"></p>
              </li>
              <li>
                  <div class="input">
                      <label for="password-input">Password</label>
                      <input id="password-input" type="password" spellcheck="false">
                      <button class="toggle-show-password" aria-label="Show Password">
                          <i class="icon_eye-36b889"></i>
                      </button>
                  </div>
                  <p class="error-message"></p>
              </li>
          </ul>

          <div class="button-box">
              <a href="#/register" class="button-register">Register</a>
              <button type="submit" class="button-login">Login</button>
          </div>
      </section>
    `);
  },

  async afterRender() {
    Account.status = false;

    const elmnt = this._getElmnt();
    this._elmnt = elmnt;
    this._validationInit();

    Input.validation({
      input: elmnt.email.input,
      regex: /^[a-z0-9\._-]+@\w+\.[a-z0-9-]/gi,
      onValid: this._onValidEmail,
      onInvalid: this._onInvalidEmail,
    });

    Input.typeChanger({
      button: elmnt.password.toggleShow,
      input: elmnt.password.input,
      type: { from: 'password', to: 'text' },
      onTypeChange: this._onTypeChangePassword,
    });

    elmnt.buttonLogin.addEventListener('click', () => {
      if (!this._validation.email) {
        this._onInvalidEmail();
        return;
      }

      this._checkAccount(
        elmnt.email.input.value,
        elmnt.password.input.value,
      );
    });
  },


  async _checkAccount(email, password) {
    try {
      const res = await fetch(`${CONFIG.BASE_URL}login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const resJson = await res.json();

      if (resJson.data.email) {
        console.log(resJson);
        Account.status = true;
        PageRoutes.redirect('/dashboard');
        Account.data = resJson.data;
        Account.data.password = password;
        console.log(Account.data);
        Dashboard.props = resJson.data;
        return;
      }

      const { error } = resJson.message;
      if (error.email) this._onInvalid({ elmntKey: 'email', message: error.email });
      if (error.password) this._onInvalid({ elmntKey: 'password', message: error.password });

    } catch (err) {
      console.log(err);
    }
  },


  _getElmnt() {
    return {
      email: {
        label: $$('.input > label')[0],
        input: $('#email-input'),
        error: $$('.error-message')[0],
      },
      password: {
        label: $$('.input > label')[1],
        input: $('#password-input'),
        error: $$('.error-message')[1],
        toggleShow: $('.toggle-show-password'),
      },
      buttonLogin: $('.button-login'),
    };
  },


  _validationInit() {
    this._validation = {
      email: false,
    };
  },


  _onTypeChange(elmnt) {
    const iconElmnt = elmnt.toggleShow.children[0];
    const icon = {
      show: 'icon_eye-36b889',
      hide: 'icon_eye-disabled-36b889',
    };

    if (iconElmnt.classList.contains(icon.show)) {
      iconElmnt.classList.remove(icon.show);
      iconElmnt.classList.add(icon.hide);
    } else {
      iconElmnt.classList.remove(icon.hide);
      iconElmnt.classList.add(icon.show);
    }
  },


  _onValid({ elmntKey, message = '' }) {
    const elmnt = Login._elmnt;
    elmnt[elmntKey].label.classList.remove('error');
    elmnt[elmntKey].input.classList.remove('error');
    elmnt[elmntKey].error.innerText = message;
    Login._validation[elmntKey] = true;
  },


  _onInvalid({ elmntKey, message = '' }) {
    const elmnt = Login._elmnt;
    elmnt[elmntKey].label.classList.add('error');
    elmnt[elmntKey].input.classList.add('error');
    elmnt[elmntKey].error.innerText = message;
    Login._validation[elmntKey] = false;
  },


  _onTypeChangePassword() {
    const elmnt = Login._elmnt;
    Login._onTypeChange(elmnt.password);
  },


  _onValidEmail() {
    Login._onValid({
      elmntKey: 'email',
    });
  },


  _onInvalidEmail() {
    Login._onInvalid({
      elmntKey: 'email',
      message: 'Masukan alamat email yg benar',
    });
  },
};

export default Login;