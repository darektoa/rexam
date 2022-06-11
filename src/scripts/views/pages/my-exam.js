/* eslint-disable object-curly-newline */
import Account from '../../globals/account.js';
import AppShell from '../../utils/appshell-initiator.js';
import { $, $$ } from '../../utils/querySelector-helper.js';

const MyExam = {
  render() {
    return (`
      <section id="my-exam">
          <header>
              <h2>My Exam</h2>
              <img src="./images/my-exam-illustration.svg" alt="">
          </header>

          <a href="#/create-exam" class="create-exam-box">
              <div class="icon-box">
                  <i class="icon_create-exam-fff"></i>
              </div>
              <h3>Create Exam</h3>
          </a>
      </section>
    `);
  },


  async afterRender() {
    AppShell.init();
    this._myExamInit();
    const elmnt = this._getElmnt();

    elmnt.exam.title.forEach((item) => {
      item.addEventListener('click', (event) => event.preventDefault());
    });
  },


  _getElmnt() {
    return {
      myExam: $('#my-exam'),
      exam: {
        link: $$('.exam-box'),
        title: $$('.exam-box > h3'),
        totalQuestions: $$('.exam-box li:nth-child(1)'),
        createdAt: $$('.exam-box li:nth-child(2)'),
        code: $$('.exam-box li:nth-child(3)'),
      },
    };
  },


  _myExamInit() {
    const { exams } = Account.data;
    const { myExam } = this._getElmnt();

    exams.forEach((dataExam, index) => {
      myExam.innerHTML += this._templateExamBox();
      this._fillDataExam(dataExam, index);
    });
  },


  _fillDataExam(dataExam, index) {
    const { link, title, totalQuestions, createdAt, code } = this._getElmnt().exam;
    const {
      exam_name: examName,
      exam_duration: examDuration,
      created_at: examCreatedAt,
      exam_code: examCode,
    } = dataExam;

    link[index].href = `#/my-exam/${examCode}`;
    title[index].insertAdjacentText('afterbegin', examName);
    totalQuestions[index].innerText = `${examDuration} Minutes`;
    createdAt[index].innerText = examCreatedAt.slice(0, 10);
    code[index].innerText = examCode;
  },


  _templateExamBox() {
    return (`
      <a href="#/my-exam/id" class="exam-box">
          <ul>
              <li></li>
              <li></li>
              <li></li>
          </ul>
          <h3>
              <i class="icon_my-exam-fff"></i>
          </h3>
      </a>
    `);
  },
};

export default MyExam;