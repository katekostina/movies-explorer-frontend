import FormHeader from '../FormHeader/FormHeader';
import Form from '../Form/Form';
import Input from '../Input/Input';
import SubmitButton from '../SubmitButton/SubmitButton';
import SignNav from '../SignNav/SignNav';
import { useState, useEffect } from 'react';
import './Register.css';

function Register({ validate, signUp }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitPossible, setSubmitPossible] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    const { [name]: removedError, ...rest } = errors;
    const error = validate[name](value);
    setErrors({
      ...rest,
      ...(error && { [name]: values[name] && error }),
    });
  }

  function handleSignUp(e) {
    e.preventDefault();
    const { email, password, name } = values;
    signUp(email, password, name);
  }

  return (
    <section className='register'>
      <FormHeader text='Добро пожаловать!' />
      <Form onSubmit={handleSignUp}>
        <div>
          <Input
            name='name'
            label='Имя'
            type='text'
            autoComplete='username'
            value={values.name || ''}
            onChange={handleChange}
            errors={errors.name}
            placeholder='Самый сладкий кренделёк'
          />
          <Input
            name='email'
            label='E-mail'
            type='email'
            autoComplete='email'
            value={values.email || ''}
            onChange={handleChange}
            errors={errors.email}
            placeholder='krendel@world.io'
          />
          <Input
            name='password'
            label='Пароль'
            type='password'
            autoComplete='new-password'
            value={values.password || ''}
            onChange={handleChange}
            errors={errors.password}
            placeholder='Придумайте пароль покрепче'
          />
        </div>
        <SubmitButton
          submitPossible={submitPossible}
          label='Зарегистрироваться'
        />
      </Form>
      <SignNav label='Уже зарегистрированы?' link='Войти' to='/signin' />
    </section>
  );
}

export default Register;
