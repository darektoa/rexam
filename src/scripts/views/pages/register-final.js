import { $, $$ } from '../../utils/querySelector-helper.js';
import Input from '../../utils/input-helper.js';
import HTMLToElement from '../../utils/HTMLToElement-helper.js';
import Register from './register.js';
import CONFIG from '../../globals/config.js';
import RegisterResult from './register-result.js';

const RegisterFinal = {
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
                      <label for="email-input">Email</label>
                      <input id="email-input" type="email" spellcheck="false">
                  </div>
                  <p class="error-message"></p>
              </li>
              <li>
                  <div class="input">
                      <label for="password-input">Password</label>
                      <input id="password-input" type="password" spellcheck="false">
                      <button class="toggle-show-password" arial-label="Show Password">
                        <i class="icon_eye-36b889"></i>
                      </button>
                  </div>
                  <p class="error-message"></p>
              </li>
              <li>
                  <div class="input">
                      <label for="confirm-password-input">Ulangi Password</label>
                      <input id="confirm-password-input" type="password" spellcheck="false">
                      <button class="toggle-show-password" aria-label="Show Confirm Password">
                        <i class="icon_eye-36b889"></i>
                      </button>
                  </div>
                  <p class="error-message"></p>
              </li>
          </ul>

          <div class="button-box">
              <button class="button-back">Back</button>
              <button type="submit" class="button-register">Register</button>
          </div>
      </section>
    `);
  },

  async afterRender() {
    const elmnt = this._getElmnt();
    this._elmnt = elmnt;
    this._validationInit();

    Input.validation({
      input: elmnt.email.input,
      regex: /^[a-z0-9\._-]+@\w+\.[a-z0-9-]/gi,
      onValid: this._onValidEmail,
      onInvalid: this._onInvalidEmail,
    });

    Input.validation({
      input: elmnt.password.input,
      regex: /^.{8,}$/,
      onValid: this._onValidPassword,
      onInvalid: this._onInvalidPassword,
    });

    Input.validation({
      input: elmnt.password.input,
      conditionFunc: () => (elmnt.confirmPassword.input.value === elmnt.password.input.value),
      onValid: this._onValidConfirmPassword,
      onInvalid: this._onInvalidConfirmPassword,
    });

    Input.validation({
      input: elmnt.confirmPassword.input,
      conditionFunc: () => (elmnt.confirmPassword.input.value === elmnt.password.input.value),
      onValid: this._onValidConfirmPassword,
      onInvalid: this._onInvalidConfirmPassword,
    });

    Input.typeChanger({
      button: elmnt.password.toggleShow,
      input: elmnt.password.input,
      type: { from: 'password', to: 'text' },
      onTypeChange: this._onTypeChangePassword,
    });

    Input.typeChanger({
      button: elmnt.confirmPassword.toggleShow,
      input: elmnt.confirmPassword.input,
      type: { from: 'password', to: 'text' },
      onTypeChange: this._onTypeChangeConfirmPassword,
    });

    elmnt.button.back.addEventListener('click', () => {
      const RegisterHTML = Register.render();
      const RegisterElmnt = HTMLToElement(RegisterHTML);
      elmnt.registerForm.replaceWith(RegisterElmnt);
      Register.props = {
        name: this.props.name,
        username: this.props.username,
      };
      Register.afterRender();
    });

    elmnt.button.register.addEventListener('click', () => {
      const validation = this._validation;
      if (!validation.email) this._onInvalidEmail();
      if (!validation.password) this._onInvalidPassword();
      if (!(validation.email && validation.password)) return;

      this._registerAccount({
        username: this.props.username,
        name: this.props.name,
        email: elmnt.email.input.value,
        password: elmnt.password.input.value,
      });
    });

    console.log(this.props);
  },


  async _registerAccount({ username, name, email, password }) {
    try {
      const res = await fetch(`${CONFIG.BASE_URL}register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          name,
          email,
          password,
        }),
      });
      const resJson = await res.json();
      const { error } = resJson.message;
      console.log(resJson);

      if (!error) {
        this._renderRegisterResult(resJson.status);
        return;
      }

      if (error.email) {
        this._onInvalid({ elmntKey: 'email', message: error.email });
        this._validation.email = true;
      }
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
        toggleShow: $$('.toggle-show-password')[0],
      },
      confirmPassword: {
        label: $$('.input > label')[2],
        input: $('#confirm-password-input'),
        error: $$('.error-message')[2],
        toggleShow: $$('.toggle-show-password')[1],
      },
      button: {
        back: $('.button-back'),
        register: $('.button-register'),
      },
      registerForm: $('#register-form'),
    };
  },


  _renderRegisterResult(status) {
    const elmnt = this._elmnt;
    const RegisterResultHTML = RegisterResult.render();
    const RegisterResultElmnt = HTMLToElement(RegisterResultHTML);

    elmnt.registerForm.replaceWith(RegisterResultElmnt);
    RegisterResult.props = { status };
    RegisterResult.afterRender();
  },


  _validationInit() {
    this._validation = {
      email: false,
      password: false,
      confirmPassword: false,
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
    const elmnt = RegisterFinal._elmnt;
    elmnt[elmntKey].label.classList.remove('error');
    elmnt[elmntKey].input.classList.remove('error');
    elmnt[elmntKey].error.innerText = message;
    RegisterFinal._validation[elmntKey] = true;
  },


  _onInvalid({ elmntKey, message = '' }) {
    const elmnt = RegisterFinal._elmnt;
    elmnt[elmntKey].label.classList.add('error');
    elmnt[elmntKey].input.classList.add('error');
    elmnt[elmntKey].error.innerText = message;
    RegisterFinal._validation[elmntKey] = false;
  },


  _onTypeChangePassword() {
    const elmnt = RegisterFinal._elmnt;
    RegisterFinal._onTypeChange(elmnt.password);
  },


  _onTypeChangeConfirmPassword() {
    const elmnt = RegisterFinal._elmnt;
    RegisterFinal._onTypeChange(elmnt.confirmPassword);
  },


  _onValidEmail() {
    RegisterFinal._onValid({
      elmntKey: 'email',
    });
  },


  _onInvalidEmail() {
    RegisterFinal._onInvalid({
      elmntKey: 'email',
      message: 'Masukan alamat email yg benar',
    });
  },


  _onValidPassword() {
    RegisterFinal._onValid({
      elmntKey: 'password',
    });
  },


  _onInvalidPassword() {
    RegisterFinal._onInvalid({
      elmntKey: 'password',
      message: 'Password Minimal berisi 8 character',
    });
  },


  _onValidConfirmPassword() {
    RegisterFinal._onValid({
      elmntKey: 'confirmPassword',
    });
  },


  _onInvalidConfirmPassword() {
    RegisterFinal._onInvalid({
      elmntKey: 'confirmPassword',
      message: 'Isi harus sesuai password diatas',
    });
  },
};

export default RegisterFinal;