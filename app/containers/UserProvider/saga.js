import { call, put, takeEvery } from 'redux-saga/effects';
import {
  USER_AUTH,
  USER_AUTH_FAIL,
  USER_AUTH_SUCCESS,
  USER_CHECK_TOKEN,
} from '../UserProvider/constants';
import { authorize, checkTokenApi } from './api';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* authUserSaga(action) {
  try {
    const user = yield call(authorize, action.credentials);
    yield put({ type: USER_AUTH_SUCCESS, user: user.data });
  } catch (e) {
    yield put({ type: USER_AUTH_FAIL, message: e.message });
  }
}

function* checkTokenSaga(action) {
  try {
    const user = yield call(checkTokenApi, action.token);
    yield put({ type: USER_AUTH_SUCCESS, user: user.data });
  } catch (e) {
    yield put({ type: USER_AUTH_FAIL, message: e.message });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* userSaga() {
  yield takeEvery(USER_AUTH, authUserSaga);
  yield takeEvery(USER_CHECK_TOKEN, checkTokenSaga);
}

export default userSaga;
