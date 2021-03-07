import FormHeader from '../FormHeader/FormHeader';
import Form from '../Form/Form';
import Input from '../Input/Input';
import SubmitButton from '../SubmitButton/SubmitButton';
import SignNav from '../SignNav/SignNav';
import { useState } from 'react';
import './Register.css';

function Register({ validate }) {
  const [values, setValues] = useState({});
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
    <section className='register'>
      <FormHeader text='Добро пожаловать!' />
      <Form>
        <div>
          <Input
            name='name'
            label='Имя'
            type='text'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.name}
            placeholder='Самый сладкий пирожок'
          />
          <Input
            name='email'
            label='E-mail'
            type='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.email}
            placeholder='pirozhok@world.io'
          />
          <Input
            name='password'
            label='Пароль'
            type='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.password}
            placeholder='Придумайте пароль покрепче.'
          />
        </div>
        <SubmitButton label='Зарегистрироваться' />
      </Form>
      <SignNav label='Уже зарегистрированы?' link='Войти' to='/signin' />
    </section>
  );
}

export default Register;
