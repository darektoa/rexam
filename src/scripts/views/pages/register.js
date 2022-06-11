import { $, $$ } from '../../utils/querySelector-helper.js';
import Input from '../../utils/input-helper.js';
import RegisterFinal from './register-final.js';
import HTMLToElement from '../../utils/HTMLToElement-helper.js';
import CONFIG from '../../globals/config.js';

const Register = {
  props: null,
  _elmnt: null,
  _validation: {},

  render() {
    return (`
      <section id="register-form">
          <header>
              <img src="./icons/transparent-white-icon.svg" alt="Icon Rexam" width="100" height="100">
              <p>Online Exam by Rexensoft</p>
          </header>

          <ul class="input-box">
              <li>
                  <div class="input">
                      <label for="name-input">Nama</label>
                      <input id="name-input" type="text" spellcheck="false">
                  </div>
                  <p class="error-message"></p>
              </li>
              <li>
                  <div class="input">
                      <label for="username-input">Username</label>
                      <input id="username-input" type="text" spellcheck="false">
                  </div>
                  <p class="error-message"></p>
              </li>
          </ul>

          <div class="button-box">
              <a href="#/login" class="button-login">Login</a>
              <button class="button-next">Next</button>
          </div>
      </section>
    `);
  },


  async afterRender() {
    const elmnt = this._getElmnt();
    this._elmnt = elmnt;
    this._validationInit();
    this._autoFillInput();

    Input.validation({
      input: elmnt.name.input,
      regex: /^[a-z' ]{1,100}$/gi,
      onValid: this._onValidName,
      onInvalid: this._onInvalidName,
    });

    Input.validation({
      input: elmnt.username.input,
      regex: /^[a-z0-9_\.]{1,32}$/gi,
      onValid: this._onValidUsername,
      onInvalid: this._onInvalidUsername,
    });

    elmnt.buttonNext.addEventListener('click', () => {
      const validation = this._validation;
      if (!validation.name) this._onInvalidName();
      if (!validation.username) this._onInvalidUsername();
      if (!(validation.name && validation.username)) return;

      this._registerAccount(elmnt.username.input.value);
    });
  },


  async _registerAccount(username) {
    try {
      const res = await fetch(`${CONFIG.BASE_URL}register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          name: '',
          email: '',
          password: '',
        }),
      });
      const resJson = await res.json();
      const { error } = resJson.message;
      console.log(resJson);

      if (!error) {
        this._renderRegisterFinal();
        return;
      }

      if (error.username) {
        this._onInvalid({ elmntKey: 'username', message: error.username });
        this._validation.username = true;
      }

    } catch (err) {
      console.log(err);
    }
  },


  _getElmnt() {
    return {
      name: {
        label: $$('.input > label')[0],
        input: $('#name-input'),
        error: $$('.error-message')[0],
      },
      username: {
        label: $$('.input > label')[1],
        input: $('#username-input'),
        error: $$('.error-message')[1],
      },
      buttonNext: $('.button-next'),
      registerForm: $('#register-form'),
    };
  },


  _autoFillInput() {
    if (this.props) {
      this._elmnt.name.input.value = this.props.name;
      this._elmnt.username.input.value = this.props.username;
      this._validation.name = true;
      this._validation.username = true;
    }
  },


  _renderRegisterFinal() {
    const elmnt = this._elmnt;
    const RegisterFinalHTML = RegisterFinal.render();
    const RegisterFinalElmnt = HTMLToElement(RegisterFinalHTML);

    elmnt.registerForm.replaceWith(RegisterFinalElmnt);
    RegisterFinal.props = {
      name: elmnt.name.input.value,
      username: elmnt.username.input.value,
    };
    RegisterFinal.afterRender();
  },


  _validationInit() {
    this._validation = {
      name: false,
      username: false,
    };
  },


  _onValid({ elmntKey, message = '' }) {
    const elmnt = Register._elmnt;
    elmnt[elmntKey].label.classList.remove('error');
    elmnt[elmntKey].input.classList.remove('error');
    elmnt[elmntKey].error.innerText = message;
    Register._validation[elmntKey] = true;
  },


  _onInvalid({ elmntKey, message = '' }) {
    const elmnt = Register._elmnt;
    elmnt[elmntKey].label.classList.add('error');
    elmnt[elmntKey].input.classList.add('error');
    elmnt[elmntKey].error.innerText = message;
    Register._validation[elmntKey] = false;
  },


  _onValidName() {
    Register._onValid({
      elmntKey: 'name',
    });
  },


  _onInvalidName() {
    Register._onInvalid({
      elmntKey: 'name',
      message: 'Hanya diizinkan huruf & spasi. Maks 100 Character',
    });
  },


  _onValidUsername() {
    Register._onValid({
      elmntKey: 'username',
    });
  },


  _onInvalidUsername() {
    Register._onInvalid({
      elmntKey: 'username',
      message: 'Hanya diizinkan huruf, angka, titik & garis bawah. Maks 32 character',
    });
  },
};

export default Register;