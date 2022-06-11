import AppShell from '../../utils/appshell-initiator';
import { $, $$ } from '../../utils/querySelector-helper';

const ExamId = {
  render() {
    return (`
      <section id="exam-id">
          <header>
              <h2>Nama Exam</h2>
              <img src="./images/my-exam-illustration.svg" alt="">
              <div class="timer" aria-label="Timer" >02 : 00 : 00</div>
          </header>

          <ul class="form-box">
              <li>
                  <div class="textarea question-box">
                      <label for="question-input">Soal</label>
                      <p></p>
                  </div>
              </li>
              <li>
                  <div class="textarea answer-box">
                      <label for="option-input">Jawab</label>
                      <p></p>

                      <div class="option-box">
                          <button class="option clicked"></button>
                          <button class="option"></button>
                          <button class="option"></button>

                          <div class="option-menu-box">
                              <button class="make-correct-answer">
                                  <i class="icon_check-circle-fff"></i>
                              </button>
                          </div>
                      </div>
                  </div>
              </li>

              <li class="menu-box">
                  <button class="button-next">
                      <i class="icon_arrow-circle-fff"></i>
                  </button>
                  <button class="button-list-questions">
                      <i class="icon_menu-circle-fff"></i>
                  </button>
                  <button class="button-finish">
                      <i class="icon_check-circle-fff"></i>
                  </button>
              </li>
          </ul>
      </section>
    `);
  },


  async afterRender() {
    AppShell.init();
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
      menu: {
        next: $('.menu-box > .button-next'),
        listQuestions: $('.menu-box > .button-list-questions'),
        finish: $('.menu-box > .button-finish'),
      },
      timer: $('.timer'),
      examName: $('header > h2'),
    };
  },
};

export default ExamId;