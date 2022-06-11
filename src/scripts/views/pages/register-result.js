import { $ } from '../../utils/querySelector-helper.js';
import RegisterResultStyle from '../../../styles/register-result.lazy.css';

const RegisterResult = {
  props: null,

  render() {
    return (`
      <section id="register-result">
          <header>
              <img src="./icons/transparent-white-icon.svg" alt="Icon Rexam" width="100" height="100">
              <p>Online Exam by Rexensoft</p>
          </header>

          <div class="result-box">
            <i></i>
            <p></p>
          </div>

          <div class="button-box">
              <a href="#/login" class="button-login">Login</a>
          </div>
      </section>
    `);
  },

  async afterRender() {
    RegisterResultStyle.use();
    const elmnt = this._getElmnt();
    const icon = {
      success: 'icon_success-25e921',
      failed: 'icon_failed-e81515',
    };

    if (this.props.status === 200) {
      elmnt.result.icon.className = icon.success;
      elmnt.result.message.innerText = 'Registration Successfully';
    } else {
      elmnt.result.icon.className = icon.failed;
      elmnt.result.message.innerText = 'Registration Failed';
    }
  },


  _getElmnt() {
    return {
      result: {
        icon: $('.result-box > i'),
        message: $('.result-box > p'),
      },
    };
  },
};

export default RegisterResult;