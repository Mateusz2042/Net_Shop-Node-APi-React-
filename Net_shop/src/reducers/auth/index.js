import cookie from 'react-cookies';
import { SET_USER_TOKEN, SET_CURRENT_USER, REMOVE_TOKEN } from '../../constants/auth';
import { DELETE_USER } from '../../constants/users';

const initialState = {
  token: '',
  currentUser: {},
};

const actions = {
  [SET_USER_TOKEN]: (state, { payload }) => {
    const data = {
      ...state,
      token: payload,
    };
    cookie.save('userToken', payload);
    window.location.reload();

    return { ...data };
  },
  [SET_CURRENT_USER]: (state, { payload }) => {
    const data = {
      ...state,
      currentUser: payload,
    };

    return { ...data };
  },
  [REMOVE_TOKEN]: (state) => {
    const data = {
      ...state,
    };
    cookie.remove('userToken');
    window.location.reload();

    return { ...data };
  },
  [DELETE_USER]: (state) => {
    debugger;
    const data = {
      ...state,
      currentUser: {},
    };
    cookie.remove('userToken');
    window.location.reload();

    return { ...data };
  },
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
