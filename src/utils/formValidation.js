const nameValidation = (name) => {
  if (name.trim() === '') {
    return 'Имя это обязательное поле';
  }
  return null;
};

const emailValidation = (email) => {
  if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return null;
  }
  if (email.trim() === '') {
    return 'Введите адрес электронной почты.';
  }
  return 'Введите корректный адрес';
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
