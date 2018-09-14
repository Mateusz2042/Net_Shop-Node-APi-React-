import Api from '../utils/api';

export const registerUser = data => () => {
  const body = {
    firstName: data.firstName,
    lastName: data.lastName,
    birthDay: data.birthDay,
    email: data.email,
    password: data.password,
  };

  return Api.post(
    'auth/register',
    body,
    null,
    () => data.history.push('/'),
    error => console.log(error),
  );
};
