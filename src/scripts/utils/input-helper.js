/* eslint-disable object-curly-newline */

const Input = {
  validation({ input, regex, conditionFunc = () => (true), onValid, onInvalid }) {
    input.addEventListener('input', () => {
      if (!input.value.trim().match(regex) || !conditionFunc()) onInvalid();
      else onValid();
    });
  },


  typeChanger({ button, input, type, onTypeChange }) {
    const { from, to } = type;

    button.addEventListener('click', () => {
      if (input.type === from) {
        input.setAttribute('type', to);
      } else {
        input.setAttribute('type', from);
      }
      onTypeChange();
    });
  },
};

export default Input;