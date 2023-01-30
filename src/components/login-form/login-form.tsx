/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { SubmitHandler, useForm } from 'react-hook-form';
import { FetchStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { getLoginFetchStatus } from '../../store/user/selectors';

const formFields = {
  email: 'Email',
  password: 'Password',
} as const;

const formFieldsRegEx = {
  email:
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)/,
  password: /[a-zA-Z][0-9]|[0-9][a-zA-Z]/,
};

const formFieldsErrorNotifications = {
  email: 'Please, enter a correct Email!',
  password:
    'Impossible to validate password input, because it should contain at least one number and letter!',
};

type FormValues = {
  email: string;
  password: string;
};

type FormFieldKey = keyof typeof formFields;

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { register, handleSubmit, formState: { isValid } } = useForm<FormValues>();

  const fetchStatus = useAppSelector(getLoginFetchStatus);
  const isLoading = fetchStatus === FetchStatus.Pending;

  const formFieldKeys = Object.keys(formFields) as FormFieldKey[];

  const onSubmit: SubmitHandler<FormValues> = (values) =>
    dispatch(loginAction({ ...values }));

  return (
    <form
      className='login-form'
      action='https://echo.htmlacademy.ru/'
      method='post'
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='login-form__inner-wrapper'>
        <h1 className='title title--size-s login-form__title'>Вход</h1>
        <div className='lofin-form__inputs'>
          {formFieldKeys.map((key) => (
            <div key={key} className='custom-input login-form__input'>
              <label className='custom-input__label' htmlFor={key}>
                {formFields[key]}
              </label>
              <input
                type={key}
                id={key}
                placeholder={formFields[key]}
                {...register(`${key}`, {
                  required: true,
                  pattern: {
                    value: formFieldsRegEx[key],
                    message: formFieldsErrorNotifications[key],
                  },
                })}
              />
            </div>
          ))}
        </div>
        <button
          className='btn btn--accent btn--general login-form__submit'
          type='submit'
          disabled={isLoading || !isValid}
        >
          Войти
        </button>
      </div>
      <label className='custom-checkbox login-form__checkbox'>
        <input
          type='checkbox'
          id='id-order-agreement'
          name='user-agreement'
          required
        />
        <span className='custom-checkbox__icon'>
          <svg width='20' height='17' aria-hidden='true'>
            <use xlinkHref='#icon-tick' />
          </svg>
        </span>
        <span className='custom-checkbox__label'>
          Я&nbsp;согласен с{' '}
          <a className='link link--active-silver link--underlined' href='/#'>
            правилами обработки персональных данных
          </a>
          &nbsp;и пользовательским соглашением
        </span>
      </label>
    </form>
  );
}

export default LoginForm;
