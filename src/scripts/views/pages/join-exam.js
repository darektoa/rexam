import AppShell from '../../utils/appshell-initiator.js';

const JoinExam = {
  render() {
    return (`
      <section id="join-exam">
          <header>
              <h2>Join Exam</h2>
              <img src="./images/join-exam-illustration.svg" alt="">
          </header>

          <div class="form-box">
              <div class="input">
                  <label for="code-input">Input Code</label>
                  <input id="code-input" type="text" spellcheck="false">
              </div>
              <p class="error-message"></p>
              <button class="button-join">Join</button>
          </div>
      </section>
    `);
  },

  afterRender() {
    AppShell.init();
  },
};

export default JoinExam;