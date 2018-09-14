import * as types from '../constants/auth';
import Api from '../utils/api';

export const setUserToken = token => (
  { type: types.SET_USER_TOKEN, payload: token }
);

const removeToken = token => (
  { type: types.REMOVE_TOKEN, payload: token }
);

const setCurrentUser = data => (
  { type: types.SET_CURRENT_USER, payload: data }
);

export const tryLogin = data => (dispatch) => {
  const body = {
    email: data.email,
    password: data.password,
  };

  return Api.post(
    'auth/login',
    body,
    null,
    (response) => { dispatch(setUserToken(response.token)); data.history.push('/'); },
    error => console.log(error),
  );
};

export const getCurrentUser = userToken => (dispatch) => {
  Api.get(
    'auth/currentUser',
    '',
    userToken,
    data => dispatch(setCurrentUser(data)),
    error => console.log(error),
  );
};

export const logout = data => (dispatch) => {
  Api.get(
    'auth/logout',
    '',
    data.token,
    (response) => { dispatch(removeToken(response.token)); data.history.push('/'); },
    error => console.log(error),
  );
};
