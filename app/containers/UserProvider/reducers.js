import { fromJS } from 'immutable';
import {
  USER_AUTH,
  USER_AUTH_FAIL,
  USER_AUTH_SUCCESS,
  USER_CHECK_TOKEN,
  USER_LOGOUT,
} from './constants';

const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

export const initialState = fromJS({
  user: {
    token: userFromLocalStorage ? userFromLocalStorage.token : '',
  },
  isAuthorized: false,
  authFail: false,
  inProgress: false,
});

function UserProviderReducer(state = initialState, action) {
  switch (action.type) {
    case USER_AUTH_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.user));
      return state
        .set('inProgress', false)
        .set('authFail', false)
        .set('isAuthorized', true)
        .set('user', fromJS(action.user));
    case USER_AUTH_FAIL:
      return state
        .set('inProgress', false)
        .set('authFail', true)
        .set('isAuthorized', false);
    case USER_AUTH:
      return state
        .set('isAuthorized', false)
        .set('inProgress', true)
        .set('authFail', false);
    case USER_CHECK_TOKEN:
      return state
        .set('isAuthorized', false)
        .set('inProgress', true)
        .set('authFail', false);
    case USER_LOGOUT:
      localStorage.clear();
      return state
        .set('isAuthorized', false)
        .set('inProgress', false)
        .set('authFail', false);
    default:
      return state;
  }
}

export default UserProviderReducer;
