import { $ } from '../../utils/querySelector-helper.js';

const NotFound = {
  render() {
    return (`
      <section id="error-box">
          <h1>404</h1>
          <p>Sepertinya kamu salah alamat</p>
          <a href="#/">Kembali</a>
      </section>
    `);
  },

  async afterRender() {
    $('#error-box > a').addEventListener('click', (event) => {
      window.history.back();
      event.preventDefault();
    });
  },
};

export default NotFound;