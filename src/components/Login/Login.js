import FormHeader from '../FormHeader/FormHeader';
import Input from '../Input/Input';
import SubmitButton from '../SubmitButton/SubmitButton';
import Form from '../Form/Form';
import SignNav from '../SignNav/SignNav';
import { useState, useEffect } from 'react';
import './Login.css';

function Login({ initialValues, validate, signIn }) {
  const [values, setValues] = useState(initialValues);
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

  function handleSignIn(e) {
    e.preventDefault();
    const { email, password } = values;
    signIn(email, password);
  }

  return (
    <section className='login'>
      <FormHeader text='Рады видеть!' />
      <Form onSubmit={handleSignIn}>
        <div>
          <Input
            name='email'
            label='E-mail'
            type='email'
            autoComplete='username'
            value={values.email || ''}
            onChange={handleChange}
            errors={errors.email}
            placeholder='name@some.io'
          />
          <Input
            name='password'
            label='Пароль'
            type='password'
            autoComplete='current-password'
            value={values.password || ''}
            onChange={handleChange}
            errors={errors.password}
            placeholder='пароль из не менее чем восьми символов'
          />
        </div>
        <SubmitButton submitPossible={submitPossible} label='Войти' />
      </Form>
      <SignNav
        label='Ещё не зарегистрированы?'
        link='Регистрация'
        to='/signup'
      />
    </section>
  );
}

export default Login;
