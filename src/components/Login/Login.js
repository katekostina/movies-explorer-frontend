import FormHeader from '../FormHeader/FormHeader';
import Input from '../Input/Input';
import SubmitButton from '../SubmitButton/SubmitButton';
import Form from '../Form/Form';
import SignNav from '../SignNav/SignNav';
import { useState } from 'react';
import './Login.css';

function Login({ initialValues, validate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setTouched({
      ...touched,
      [name]: true,
    });
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    const { [name]: removedError, ...rest } = errors;
    const error = validate[name](value);
    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error }),
    });
  }

  return (
    <section className='login'>
      <FormHeader text='Рады видеть!' />
      <Form>
        <div>
          <Input
            name='email'
            label='E-mail'
            type='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.email}
            placeholder='name@some.io'
          />
          <Input
            name='password'
            label='Пароль'
            type='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.password}
            placeholder='пароль из не менее чем восьми символов'
          />
        </div>
        <SubmitButton label='Войти' />
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
