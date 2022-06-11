import AppShell from '../../utils/appshell-initiator.js';
import { $, $$ } from '../../utils/querySelector-helper.js';
import Time from '../../utils/time-helper.js';

const Dashboard = {
  props: {
    name: 'user',
    totalMinutes: null,
  },
  _elmnt: null,
  _rendered: 0,

  render() {
    return `
      <section id="dashboard">
          <header>
              <h2>Dashboard</h2>
              <img src="./images/dashboard-illustration.svg" alt="">
          </header>

          <div class="datetime-box">
              <time>
                <span>01/03/21</span>
                <span>08: 30</span>
              </time>
              <h3>Monday</h3>
          </div>
          <div class="exam-finished-box">
              <p>0</p>
              <h3>Exam Finished</h3>
          </div>
          <div class="exam-created-box">
              <p>1000</p>
              <h3>Exam Created</h3>
          </div>
          <div class="total-point-box">
              <p>0</p>
              <h3>Coming Soon</h3>
          </div>

          <a href="#/join-exam" class="join-exam-box">
              <div class="icon-box">
                  <i class="icon_join-exam-fff"></i>
              </div>
              <h3>Join Exam</h3>
          </a>
          <a href="#/my-exam" class="my-exam-box">
              <div class="icon-box">
                  <i class="icon_my-exam-fff"></i>
              </div>
              <h3>My Exam</h3>
          </a>
      </section>
    `;
  },

  async afterRender() {
    AppShell.props = this.props;
    AppShell.init();
    this._elmnt = this._getElmnt();
    this._rendered += 1;
    this._datetimeInit();
    this._examCreatedInit();
  },

  _getElmnt() {
    return {
      datetime: {
        date: $$('.datetime-box > time > span')[0],
        time: $$('.datetime-box > time > span')[1],
        day: $('.datetime-box > h3'),
      },
      examFinished: $('.exam-finished-box > p'),
      examCreated: $('.exam-created-box > p'),
      examTotalPoint: $('.exam-total-point-box > p'),
    };
  },


  _examCreatedInit() {
    const elmnt = this._elmnt;
    elmnt.examCreated.innerText = this.props.exams.length;
  },


  _datetimeInit() {
    const elmnt = this._elmnt;
    const { datetime } = this.props;
    const dateObj = new Date(datetime);
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    const totalMinutes = this.props.totalMinutes || (hour * 60) + minute;
    this.props.totalMinutes = totalMinutes;

    const date = datetime.slice(0, 10).replace(/-/g, '/');
    const time = Time.fromMinute(totalMinutes).slice(0, 7);
    const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];

    elmnt.datetime.date.innerText = date;
    elmnt.datetime.time.innerHTML = time;
    elmnt.datetime.day.innerText = days[new Date().getDay()];

    if (this._rendered === 1) this._refreshTimeInterval(dateObj);
  },


  _refreshTimeInterval(dateObj) {
    const second = dateObj.getSeconds();

    setTimeout(() => {
      this.props.totalMinutes += 1;
      this._refreshTime();

      setInterval(() => {
        this.props.totalMinutes += 1;
        this._refreshTime();
      }, 60000);
    }, (60 - second) * 1000);
  },


  _refreshTime() {
    const elmnt = this._elmnt;
    const { totalMinutes } = this.props;
    const time = Time.fromMinute(totalMinutes).slice(0, 7);
    elmnt.datetime.time.innerHTML = time;
  },
};

export default Dashboard;