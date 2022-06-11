import AppShell from '../../utils/appshell-initiator.js';
import HTMLToElement from '../../utils/HTMLToElement-helper.js';
import Input from '../../utils/input-helper.js';
import CreateExam2 from './create-exam-2.js';
import { $, $$ } from '../../utils/querySelector-helper.js';

const CreateExam = {
  props: null,
  _elmnt: null,
  _validation: {},

  render() {
    return (`
      <section id="create-exam">
          <header>
              <h2>Create Exam</h2>
              <img src="./images/create-exam-illustration.svg" alt="">
          </header>

          <ul class="form-box">
              <li>
                  <div class="input">
                      <label for="exam-name-input">Nama Exam</label>
                      <input id="exam-name-input" type="text" spellcheck="false">
                  </div>
                  <p class="error-message"></p>
              </li>
              <li>
                  <div class="input">
                      <label for="exam-duration-input">Durasi Exam</label>
                      <input id="exam-duration-input" type="text" spellcheck="false">
                      <span>Menit</span>
                  </div>
                  <p class="error-message"></p>
              </li>
              <li>
                  <div class="textarea">
                      <label for="exam-description-input">Deskripsi Exam</label>
                      <textarea id="exam-description-input" placeholder="(optional)" spellcheck="false"></textarea>
                  </div>
                  <p class="error-message"></p>
              </li>
              <li>
                  <button class="button-next">Next</button>
              </li>
          </ul>
      </section>
    `);
  },

  async afterRender() {
    AppShell.init();
    const elmnt = this._getElmnt();
    this._elmnt = elmnt;
    this._validationInit();

    Input.validation({
      input: elmnt.examName.input,
      regex: /^.{1,40}$/gi,
      onValid: this._onValidExamName,
      onInvalid: this._onInvalidExamName,
    });

    Input.validation({
      input: elmnt.examDuration.input,
      regex: /^([1-9][0-9]{0,2}|1[0-3][0-9]{2}|1440)$/g,
      onValid: this._onValidExamDuration,
      onInvalid: this._onInvalidExamDuration,
    });

    elmnt.buttonNext.addEventListener('click', () => {
      const validation = this._validation;
      if (!validation.examName) this._onInvalidExamName();
      if (!validation.examDuration) this._onInvalidExamDuration();
      if (!(validation.examName && validation.examDuration)) return;

      const createExam2HTML = CreateExam2.render();
      const createExam2Elmnt = HTMLToElement(createExam2HTML);
      elmnt.createExam.replaceWith(createExam2Elmnt);
      CreateExam2.props = {
        examName: elmnt.examName.input.value,
        examDuration: elmnt.examDuration.input.value,
        examDescription: elmnt.examDescription.input.value,
      };
      CreateExam2.afterRender();
    });
  },


  _getElmnt() {
    return {
      examName: {
        label: $$('.input > label')[0],
        input: $('#exam-name-input'),
        error: $$('.error-message')[0],
      },
      examDuration: {
        label: $$('.input > label')[1],
        input: $('#exam-duration-input'),
        error: $$('.error-message')[1],
      },
      examDescription: {
        label: $$('.textarea > label')[0],
        input: $('#exam-description-input'),
        error: $$('.error-message')[2],
      },
      buttonNext: $('.button-next'),
      createExam: $('#create-exam'),
    };
  },


  _validationInit() {
    this._validation = {
      examName: false,
      examDuration: false,
    };
  },


  _onValid({ elmntKey, message = '' }) {
    const elmnt = CreateExam._elmnt;
    elmnt[elmntKey].label.classList.remove('error');
    elmnt[elmntKey].input.classList.remove('error');
    elmnt[elmntKey].error.innerText = message;
    CreateExam._validation[elmntKey] = true;
  },


  _onInvalid({ elmntKey, message = '' }) {
    const elmnt = CreateExam._elmnt;
    elmnt[elmntKey].label.classList.add('error');
    elmnt[elmntKey].input.classList.add('error');
    elmnt[elmntKey].error.innerText = message;
    CreateExam._validation[elmntKey] = false;
  },


  _onValidExamName() {
    CreateExam._onValid({
      elmntKey: 'examName',
    });
  },


  _onInvalidExamName() {
    CreateExam._onInvalid({
      elmntKey: 'examName',
      message: 'Maksimal hanya 40 karakter',
    });
  },


  _onValidExamDuration() {
    CreateExam._onValid({
      elmntKey: 'examDuration',
    });
  },


  _onInvalidExamDuration() {
    CreateExam._onInvalid({
      elmntKey: 'examDuration',
      message: 'Hanya angka & maksimal 1440 menit',
    });
  },
};

export default CreateExam;