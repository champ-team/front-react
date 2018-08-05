import { USER_AUTH, USER_CHECK_TOKEN, USER_LOGOUT } from './constants';

export function authorize(email, password) {
  return {
    type: USER_AUTH,
    credentials: {
      email,
      password,
    },
  };
}

export function checkToken(token) {
  return {
    type: USER_CHECK_TOKEN,
    token,
  };
}

export function logout() {
  return {
    type: USER_LOGOUT,
  };
}
