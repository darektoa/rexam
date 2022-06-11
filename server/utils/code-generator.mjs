/* eslint-disable no-loop-func */
const CodeGenerator = {
  _char: 'ABCDEFGHIJKLMNOPQRESTUVWXYZ0123456789',

  generate(length = 6, excepts = []) {
    let code = this._generatingCode(length);
    let done = false;

    if (excepts.length === 0) return code;

    while (!done) {
      const result = excepts.filter((item) => item === code);
      if (result.length === 0) {
        done = true;
        break;
      }
      code = this._generatingCode(length);
    }

    return code;
  },


  _generatingCode(length) {
    let code = '';
    for (let i = 0; i < length; i++) {
      const index = this._getIndex();
      code += this._char[index];
    }
    return code;
  },


  _getIndex() {
    const max = this._char.length - 1;
    return Math.round(Math.random() * max);
  },
};

export default CodeGenerator;