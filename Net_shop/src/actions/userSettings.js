import Api from '../utils/api';
import * as types from '../constants/auth';
import * as typesUsers from '../constants/users';

const setCurrentUser = data => (
  { type: types.SET_CURRENT_USER, payload: data }
);

const setEmptyUser = () => (
  { type: typesUsers.DELETE_USER }
);

export const updateUser = data => (dispatch) => {
  const body = {
    firstName: data.firstName,
    lastName: data.lastName,
    birthDay: data.birthDay,
    email: data.email,
  };

  return Api.put(
    `users/update/${data.id}`,
    body,
    data.token,
    (response) => { dispatch(setCurrentUser(response)); data.history.push('/'); },
    error => console.log(error),
  );
};

export const deleteUser = data => dispatch => Api.post(
  `users/delete/${data.id}`,
  data,
  data.token,
  () => { dispatch(setEmptyUser()); data.history.push('/'); },
  error => console.log(error),
);
