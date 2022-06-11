import Input from '../../utils/input-helper.js';
import CreateExam from './create-exam.js';
import CreateExam2Style from '../../../styles/create-exam-2.lazy.css';
import { $, $$ } from '../../utils/querySelector-helper.js';
import AppShell from '../../utils/appshell-initiator.js';
import Time from '../../utils/time-helper.js';
import PageRoutes from '../../routes/page-routes.js';
import CONFIG from '../../globals/config.js';
import Account from '../../globals/account.js';

const CreateExam2 = {
  props: null,
  _elmnt: null,
  _exam: {},
  _currenQuestion: 0,
  _questions: [],
  _prevOptionClicked: 0,
  _tempQuestion: {
    question: '',
    options: [],
    answer: null,
  },
  _validation: {
    question: false,
    option: false,
  },

  render() {
    return (`
      <section id="create-exam-2">
          <header>
              <h2>Nama Exam</h2>
              <img src="./images/create-exam-illustration.svg" alt="">
              <div class="timer" aria-label="Timer" >02 : 00 : 00</div>
          </header>

          <ul class="form-box">
              <li>
                  <div class="textarea question-box">
                      <label for="question-input">Soal</label>
                      <textarea id="question-input" spellcheck="false" placeholder="Ketik soal disini..."></textarea>
                  </div>
              </li>
              <li>
                  <div class="textarea answer-box">
                      <label for="option-input">Jawab</label>
                      <textarea id="option-input" spellcheck="false"></textarea>

                      <div class="option-box">
                          <button class="option clicked"></button>
                          <button class="option"></button>
                          <button class="option"></button>

                          <div class="option-menu-box">
                              <button class="remove-option" aria-label="Button Remove Option">
                                  <i class="icon_minus-circle-fff"></i>
                              </button>
                              <button class="add-option" aria-label="Button Add Option">
                                  <i class="icon_plus-circle-fff"></i>
                              </button>
                              <button class="make-correct-answer" aria-label="Button Make Correct Answer">
                                  <i class="icon_check-circle-fff"></i>
                              </button>
                          </div>
                      </div>
                  </div>
              </li>

              <li class="menu-box">
                  <button id="add-question">
                      <i class="icon_plus-circle-fff"></i>
                  </button>
                  <button id="list-questions">
                      <i class="icon_menu-circle-fff"></i>
                  </button>
                  <button id="save-exam">
                      <i class="icon_check-circle-fff"></i>
                  </button>
              </li>
          
              <li class="button-box">
                  <button class="button-back">Kembali</button>
              </li>
          </ul>

          <div class="message-box hide">
              <p>Soal Tidak Boleh Kosong</p>
              <button>Oke</button>
          </div>
      </section>
    `);
  },

  async afterRender() {
    AppShell.init();
    const elmnt = this._getElmnt();
    this._elmnt = elmnt;
    CreateExam2Style.use();
    this._autoFill();
    this._examDataInit();
    this._optionButtonsInit();
    this._saveExamButtonInit();
    this._addOptionButtonInit();
    this._addQuestionButtonInit();
    this._removeOptionButtonInit();
    this._makeCorrectAnswerButtonInit();

    Input.validation({
      input: elmnt.question.input,
      regex: /^.+$/gi,
      onValid: this._onValidQuestion,
      onInvalid: this._onInvalidQuestion,
    });

    console.log(this._exam);
  },


  _getElmnt() {
    return {
      question: {
        label: $$('.textarea > label')[0],
        input: $('#question-input'),
      },
      option: {
        buttons: $$('.option-box > .option'),
        input: $('#option-input'),
      },
      timer: $('.timer'),
      saveExam: $('#save-exam'),
      examName: $('header > h2'),
      addOption: $('.add-option'),
      buttonBack: $('.button-back'),
      addQuestion: $('#add-question'),
      removeOption: $('.remove-option'),
      listQuestions: $('#list-questions'),
      makeCorrectAnswer: $('.make-correct-answer'),
    };
  },


  _getTempQuestion() {
    return this._tempQuestion;
  },


  _autoFill() {
    if (this.props) {
      this._elmnt.examName.innerText = this.props.examName;
      this._elmnt.timer.innerText = Time.fromMinute(this.props.examDuration);
    }
  },


  _resetProperties() {
    this._elmnt = null;
    this._exam = {};
    this._currenQuestion = 0;
    this._questions = [];
    this._prevOptionClicked = 0;
    this._tempQuestion = {
      question: '',
      options: [],
      answer: null,
    };
  },


  _templateQuestion() {
    return {
      question: '',
      options: [],
      answer: null,
    };
  },


  _examDataInit() {
    this._exam = {
      email: Account.data.email,
      password: Account.data.password,
      examName: this.props.examName,
      examDuration: this.props.examDuration,
      examDescription: this.props.examDescription,
      examStatus: 1,
      questions: this._questions,
    };
  },


  _addQuestionButtonInit() {
    const elmnt = this._elmnt;

    elmnt.addQuestion.addEventListener('click', () => {
      this._addQuestionHandle();
    });
  },


  _addQuestionHandle() {
    const elmnt = this._elmnt;
    const { buttons } = this._getElmnt().option;
    const { question, options, answer } = this._getTempQuestion();
    if (!(question && options.length > 1 && answer !== null)) return false;

    buttons.forEach((item) => item.classList.remove('clicked', 'selected'));
    buttons[0].classList.add('clicked');
    this._questions.push(this._getTempQuestion());
    this._tempQuestion = this._templateQuestion();
    this._prevOptionClicked = 0;
    elmnt.question.input.value = '';
    elmnt.option.input.value = '';
    this._examDataInit();
    console.log(this._exam);
    return true;
  },


  _saveExamButtonInit() {
    const elmnt = this._elmnt;

    elmnt.saveExam.addEventListener('click', () => {
      if (this._addQuestionHandle()) {
        this._saveExamToServer();
      }
    });
  },


  async _saveExamToServer() {
    try {
      const res = await fetch(`${CONFIG.BASE_URL}create-exam`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this._exam),
      });
      const resJson = await res.json();

      if (resJson.status !== 200) return;

      console.log(resJson);
      this._resetProperties();
      Account.data.exams.push(resJson.data);
      PageRoutes.redirect('/my-exam');

    } catch (err) {
      console.log(err);
    }
  },


  _optionButtonsInit() {
    const elmnt = this._getElmnt();

    elmnt.option.buttons.forEach((option) => {
      option.addEventListener('click', (event) => {
        const { buttons } = this._getElmnt().option;
        const prevIndex = this._prevOptionClicked;
        const tempQues = this._tempQuestion;
        let currIndex;

        buttons.forEach((item, indx) => {
          item.classList.remove('clicked');
          if (item === option) currIndex = indx;
        });
        option.classList.add('clicked');

        tempQues.question = elmnt.question.input.value;
        tempQues.options[prevIndex] = elmnt.option.input.value;
        elmnt.option.input.value = tempQues.options[currIndex] || '';
        this._prevOptionClicked = currIndex;
        elmnt.option.input.focus();
        console.log(this._tempQuestion);
        event.stopImmediatePropagation();
      });
    });
  },


  _addOptionButtonInit() {
    const { addOption } = this._getElmnt();
    const optionButtonHTML = '<button class="option"></button>';

    addOption.addEventListener('click', () => {
      const { buttons } = this._getElmnt().option;
      if (buttons.length > 7) return;

      const lastOption = buttons[buttons.length - 1];
      lastOption.insertAdjacentHTML('afterend', optionButtonHTML);
      this._optionButtonsInit();
    });
  },


  _removeOptionButtonInit() {
    const { removeOption } = this._getElmnt();

    removeOption.addEventListener('click', () => {
      const { buttons } = this._getElmnt().option;
      let done = 0;
      if (buttons.length < 2) return;

      buttons.forEach((option, index) => {
        if (done) return;
        if (!option.classList.contains('clicked')) return;
        option.remove();

        const tempQues = this._tempQuestion;
        const indexRedirect = (index - 1 >= 0) ? index - 1 : index;
        tempQues.options.splice(index, 1);

        if (option.classList.contains('selected')) tempQues.answer = null;
        if (index < tempQues.answer) tempQues.answer -= 1;

        this._prevOptionClicked = indexRedirect;
        this._getElmnt().option.buttons[indexRedirect].classList.add('clicked');
        this._elmnt.option.input.value = tempQues.options[indexRedirect] || '';
        done = 1;
      });
    });
  },


  _makeCorrectAnswerButtonInit() {
    const { makeCorrectAnswer } = this._getElmnt();

    makeCorrectAnswer.addEventListener('click', () => {
      const { buttons } = this._getElmnt().option;

      buttons.forEach((option, index) => {
        option.classList.remove('selected');
        if (!option.classList.contains('clicked')) return;
        option.classList.add('selected');
        this._tempQuestion.answer = index;
      });
    });
  },


  _onValid({ elmntKey }) {
    const elmnt = CreateExam2._elmnt;
    elmnt[elmntKey].label.classList.remove('error');
    elmnt[elmntKey].input.classList.remove('error');
    CreateExam2._validation[elmntKey] = true;
  },


  _onInvalid({ elmntKey }) {
    const elmnt = CreateExam2._elmnt;
    elmnt[elmntKey].label.classList.add('error');
    elmnt[elmntKey].input.classList.add('error');
    CreateExam2._validation.examName = false;
    console.log('Harus diisi');
  },


  _onValidQuestion() {
    CreateExam2._onValid({
      elmntKey: 'question',
    });
  },


  _onInvalidQuestion() {
    CreateExam2._onInvalid({
      elmntKey: 'question',
    });
  },


  _onValidExamDuration() {
    CreateExam2._onValid({
      elmntKey: 'examDuration',
    });
  },


  _onInvalidExamDuration() {
    CreateExam2._onInvalid({
      elmntKey: 'examDuration',
    });
  },
};

export default CreateExam2;