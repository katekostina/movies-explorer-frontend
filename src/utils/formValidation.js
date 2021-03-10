const validator = require('email-validator');

const nameValidation = (name) => {
  if (name.trim() === '') {
    return 'Имя это обязательное поле';
  }
};

const emailValidation = (email) => {
  if (email.trim() === '') {
    return 'Введите адрес электронной почты.';
  }
  if (validator.validate(email)) {
    return 'Введите корректный адрес';
  }
};

const passwordValidation = (password) => {
  if (password.trim().length <= 7) {
    return 'Пароль должен содержать не меньше восьми символов';
  }
};

const validate = {
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
};

export default validate;
